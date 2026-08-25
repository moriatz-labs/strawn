import * as THREE from "three";
import type { FontScenePreset } from "./fontData";

export type HeroScenePhase = "orbit" | "anticipation" | "drawing" | "follow-through" | "settled";

export type FontSceneFrame = {
  time: number;
  progress: number;
  phase: HeroScenePhase;
  tip?: { x: number; y: number };
  pointer?: { x: number; y: number };
};

export type FontSceneController = {
  render: (frame: FontSceneFrame) => void;
  resize: () => void;
  setPreset: (preset: FontScenePreset) => void;
  dispose: () => void;
};

const presets: Record<FontScenePreset, { cameraZ: number; penScale: number; rotation: [number, number, number] }> = {
  "hero-writing": { cameraZ: 10, penScale: 0.72, rotation: [0.18, -0.18, -0.18] },
  "ink-chamber": { cameraZ: 6.4, penScale: 1.2, rotation: [0.26, 0.9, 1.15] },
  "contact-point": { cameraZ: 6.8, penScale: 1.08, rotation: [0.12, -0.32, -0.12] },
  "ink-current": { cameraZ: 5.3, penScale: 1.48, rotation: [0.7, 0.18, 1.42] },
};

export function createFontScene(canvas: HTMLCanvasElement, initialPreset: FontScenePreset): FontSceneController {
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
  const pen = new THREE.Group();
  scene.add(pen);

  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xfafaf5,
    metalness: 0,
    roughness: 0.08,
    transmission: 0.9,
    thickness: 0.32,
    transparent: true,
    opacity: 0.72,
    ior: 1.48,
  });
  const inkMaterial = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 } },
    vertexShader: `
      uniform float uTime;
      varying vec3 vNormal;
      varying float vWave;
      void main() {
        vec3 transformed = position;
        float wave = sin((position.y * 3.1) + (uTime * 2.2)) * 0.012;
        transformed.x += wave * (1.0 - abs(position.y) / 2.2);
        transformed.z -= wave * 0.7;
        vWave = wave;
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vNormal;
      varying float vWave;
      void main() {
        float edge = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.0);
        vec3 ink = mix(vec3(0.005), vec3(0.09), edge + abs(vWave) * 4.0);
        gl_FragColor = vec4(ink, 0.98);
      }
    `,
  });

  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 4.3, 8, 1, true), glassMaterial);
  const upperGlass = new THREE.Mesh(new THREE.ConeGeometry(0.24, 0.72, 8, 1, true), glassMaterial);
  upperGlass.position.y = 2.51;
  const lowerGlass = new THREE.Mesh(new THREE.ConeGeometry(0.24, 0.82, 8, 1, true), glassMaterial);
  lowerGlass.rotation.z = Math.PI;
  lowerGlass.position.y = -2.56;

  const inkCore = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 4.08, 8, 12), inkMaterial);
  const upperInk = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.55, 8), inkMaterial);
  upperInk.position.y = 2.31;
  const lowerInk = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.64, 8), inkMaterial);
  lowerInk.rotation.z = Math.PI;
  lowerInk.position.y = -2.36;

  pen.add(inkCore, upperInk, lowerInk, shaft, upperGlass, lowerGlass);

  const shadow = new THREE.Mesh(
    new THREE.CircleGeometry(0.46, 32),
    new THREE.MeshBasicMaterial({ color: 0x050505, transparent: true, opacity: 0.16, depthWrite: false }),
  );
  shadow.scale.set(1.9, 0.32, 1);
  shadow.position.z = -0.08;
  scene.add(shadow);

  scene.add(new THREE.HemisphereLight(0xfafaf5, 0x11110f, 1.5));
  const key = new THREE.DirectionalLight(0xffffff, 5.2);
  key.position.set(-4, 6, 8);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xd8d8d1, 3.8);
  rim.position.set(5, -2, 4);
  scene.add(rim);

  const pointerTarget = new THREE.Vector2();
  const currentPointer = new THREE.Vector2();
  const worldPoint = new THREE.Vector3();
  const projected = new THREE.Vector3();
  const direction = new THREE.Vector3();
  const tipOffset = new THREE.Vector3(0, -2.97, 0);
  let preset = initialPreset;

  const resize = () => {
    const { width, height } = canvas.getBoundingClientRect();
    if (width <= 0 || height <= 0) return;
    const dprLimit = width < 768 ? 1.25 : 1.5;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, dprLimit));
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };

  const screenToPlane = (x: number, y: number) => {
    projected.set(x * 2 - 1, 1 - y * 2, 0.5).unproject(camera);
    direction.copy(projected).sub(camera.position).normalize();
    const distance = -camera.position.z / direction.z;
    return worldPoint.copy(camera.position).add(direction.multiplyScalar(distance));
  };

  const setPreset = (nextPreset: FontScenePreset) => {
    preset = nextPreset;
  };

  const render = ({ time, progress, phase, tip, pointer }: FontSceneFrame) => {
    const settings = presets[preset];
    camera.position.set(0, 0, settings.cameraZ);
    camera.lookAt(0, 0, 0);
    pen.scale.setScalar(settings.penScale);
    pointerTarget.set(pointer?.x ?? 0, pointer?.y ?? 0);
    currentPointer.lerp(pointerTarget, 0.1);
    pen.rotation.set(
      settings.rotation[0] + currentPointer.y * 0.07,
      settings.rotation[1] + currentPointer.x * 0.07,
      settings.rotation[2],
    );
    inkCore.scale.set(1, 1, 1);

    if (preset === "hero-writing") {
      if (phase === "orbit") {
        const angle = -0.35 + progress * Math.PI * 1.34;
        pen.position.set(Math.cos(angle) * 3.2, Math.sin(angle) * 1.7 + 0.5, 1.2 - progress * 0.7);
        pen.rotation.z = angle - 1.4;
      } else if (tip) {
        const contact = screenToPlane(tip.x, tip.y);
        const offset = tipOffset.clone().multiplyScalar(settings.penScale).applyEuler(pen.rotation);
        pen.position.copy(contact).sub(offset);
        if (phase === "anticipation") pen.position.z += (1 - progress) * 1.2;
        if (phase === "follow-through") pen.position.x += progress * 2.1;
        shadow.position.set(contact.x, contact.y, -0.08);
      }
    } else if (preset === "ink-chamber") {
      pen.position.set(0.2, 0, 0.3);
      pen.rotation.y += Math.sin(time * 0.00045) * 0.08;
    } else if (preset === "contact-point") {
      pen.position.set(0.7, 2.25 - progress * 0.28, 0.45);
      shadow.position.set(0.18, -1.68, -0.08);
    } else {
      pen.position.set(0, 0, 0.8);
      pen.rotation.y += time * 0.00012;
      inkCore.scale.y = 0.97 + Math.sin(time * 0.0012) * 0.025;
    }

    inkMaterial.uniforms.uTime.value = time / 1000;
    renderer.render(scene, camera);
  };

  const dispose = () => {
    renderer.dispose();
    scene.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) return;
      object.geometry.dispose();
      const materials = Array.isArray(object.material) ? object.material : [object.material];
      materials.forEach((material) => material.dispose());
    });
  };

  resize();
  return { render, resize, setPreset, dispose };
}
