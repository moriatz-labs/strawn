import { existsSync, readFileSync, readdirSync, unlinkSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const check = process.argv.includes("--check");
const root = process.cwd();
const componentsDir = resolve(root, "packages/strawn-icons/src/components");
const lucideIconsDir = resolve(root, "packages/strawn-icons/node_modules/lucide-static/icons");

const groups = {
  Actions: [
    ["Plus", "plus", "add create"], ["Minus", "minus", "subtract remove"], ["Check", "check", "confirm done"],
    ["Close", "x", "dismiss cancel"], ["Pencil", "pencil", "edit write"], ["Trash", "trash-2", "delete remove"],
    ["Copy", "copy", "duplicate clipboard"], ["Download", "download", "save export"], ["Upload", "upload", "import publish"],
    ["Save", "save", "disk store"], ["Share", "share-2", "send distribute"], ["Refresh", "refresh-cw", "reload sync"],
    ["Search", "search", "find magnify"], ["Filter", "funnel", "filter refine"], ["SlidersHorizontal", "sliders-horizontal", "adjust controls"],
    ["Ellipsis", "ellipsis", "more overflow"], ["EllipsisVertical", "ellipsis-vertical", "more overflow menu"],
    ["ExternalLink", "external-link", "open launch"], ["Link", "link", "url chain"], ["Unlink", "unlink", "disconnect break"],
  ],
  Navigation: [
    ["ArrowUp", "arrow-up", "north previous"], ["ArrowDown", "arrow-down", "south next"], ["ArrowLeft", "arrow-left", "back previous"],
    ["ArrowRight", "arrow-right", "forward next"], ["ChevronUp", "chevron-up", "collapse"], ["ChevronDown", "chevron-down", "expand"],
    ["ChevronLeft", "chevron-left", "back previous"], ["ChevronRight", "chevron-right", "forward next"],
    ["ChevronsLeft", "chevrons-left", "first rewind"], ["ChevronsRight", "chevrons-right", "last fast forward"],
    ["Menu", "menu", "navigation hamburger"], ["Home", "house", "dashboard"], ["PanelLeft", "panel-left", "sidebar"],
    ["LogIn", "log-in", "sign in enter"], ["LogOut", "log-out", "sign out exit"], ["Maximize", "maximize-2", "fullscreen expand"],
  ],
  Status: [
    ["Info", "info", "information"], ["CircleHelp", "circle-help", "question support"], ["CircleAlert", "circle-alert", "warning attention"],
    ["TriangleAlert", "triangle-alert", "warning danger"], ["CircleCheck", "circle-check", "success complete"], ["CircleX", "circle-x", "error failed"],
    ["BadgeCheck", "badge-check", "verified approved"], ["Ban", "ban", "blocked prohibited"], ["Loader", "loader-circle", "loading progress"],
    ["Eye", "eye", "view visible"], ["EyeOff", "eye-off", "hidden invisible"], ["Lock", "lock", "secure private"],
    ["Unlock", "lock-open", "unsecure public"], ["Shield", "shield", "security protect"], ["ShieldCheck", "shield-check", "secure verified"],
    ["Bell", "bell", "notification alert"], ["BellOff", "bell-off", "mute notification"],
  ],
  "Files and content": [
    ["File", "file", "document"], ["FileText", "file-text", "document text"], ["Files", "files", "documents duplicate"],
    ["Folder", "folder", "directory"], ["FolderOpen", "folder-open", "directory browse"], ["Image", "image", "photo picture"],
    ["Images", "images", "gallery photos"], ["Paperclip", "paperclip", "attachment"], ["Clipboard", "clipboard", "paste"],
    ["ClipboardCheck", "clipboard-check", "task complete"], ["BookOpen", "book-open", "documentation read"], ["Bookmark", "bookmark", "save favorite"],
    ["Tag", "tag", "label category"], ["Archive", "archive", "store box"], ["Inbox", "inbox", "mail tray"],
    ["Calendar", "calendar", "date schedule"], ["Clock", "clock", "time"], ["History", "history", "recent restore"],
  ],
  "People and communication": [
    ["User", "user", "person account"], ["Users", "users", "people team group"], ["UserPlus", "user-plus", "invite add person"],
    ["UserMinus", "user-minus", "remove person"], ["Mail", "mail", "email envelope"], ["Send", "send", "message submit"],
    ["MessageCircle", "message-circle", "chat comment"], ["MessagesSquare", "messages-square", "conversation chat"], ["Phone", "phone", "call"],
    ["Video", "video", "camera meeting"], ["Mic", "mic", "microphone audio"], ["MicOff", "mic-off", "mute microphone"],
    ["AtSign", "at-sign", "mention email"], ["Contact", "contact", "address book"], ["Globe", "globe", "world web language"],
    ["MapPin", "map-pin", "location place"],
  ],
  "Commerce and data": [
    ["ShoppingCart", "shopping-cart", "commerce buy"], ["CreditCard", "credit-card", "payment billing"], ["WalletCards", "wallet-cards", "payment money"],
    ["Receipt", "receipt", "invoice bill"], ["BadgeDollarSign", "badge-dollar-sign", "price payment"], ["DollarSign", "dollar-sign", "currency money"],
    ["TrendingUp", "trending-up", "growth increase"], ["TrendingDown", "trending-down", "decline decrease"], ["ChartBar", "chart-bar", "analytics graph"],
    ["ChartPie", "chart-pie", "analytics graph"], ["Database", "database", "storage data"], ["Table", "table-2", "rows columns data"],
    ["List", "list", "rows items"], ["Grid", "grid-2x2", "tiles layout"], ["Package", "package", "box product"], ["Truck", "truck", "delivery shipping"],
  ],
  "System and media": [
    ["Settings", "settings", "preferences cog"], ["Monitor", "monitor", "desktop display"], ["Smartphone", "smartphone", "mobile phone"],
    ["Wifi", "wifi", "network connection"], ["WifiOff", "wifi-off", "offline disconnected"], ["Cloud", "cloud", "hosting storage"],
    ["Play", "play", "start media"], ["Pause", "pause", "stop media"], ["Volume2", "volume-2", "sound audio"],
    ["VolumeX", "volume-x", "mute sound"], ["Sun", "sun", "light theme"], ["Moon", "moon", "dark theme"],
    ["Palette", "palette", "color design"], ["Zap", "zap", "lightning energy fast"],
  ],
};

const definitions = Object.entries(groups).flatMap(([category, icons]) => icons.map(([name, source, keywords]) => ({ name: `${name}Icon`, source, category, keywords: keywords.split(" ") })));
const brands = [
  { name: "GitHubIcon", category: "Brands", keywords: ["brand", "code", "repository"] },
  { name: "DevpostIcon", category: "Brands", keywords: ["brand", "hackathon"] },
];

if (definitions.length + brands.length !== 119) throw new Error(`Expected 119 icons, found ${definitions.length + brands.length}`);

function escapeAttribute(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll('"', "&quot;");
}

function renderNodes(source) {
  const path = resolve(lucideIconsDir, `${source}.svg`);
  if (!existsSync(path)) throw new Error(`Missing Lucide source: ${source}`);
  const svg = readFileSync(path, "utf8");
  return [...svg.matchAll(/<(path|circle|rect|line|polyline|polygon|ellipse)\b([^>]*)\/>/g)].map(([, tag, rawAttributes]) => {
    const attributes = [...rawAttributes.matchAll(/([\w-]+)="([^"]*)"/g)].map(([, key, value]) => {
      const reactKey = key.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
      return `${reactKey}="${escapeAttribute(value)}"`;
    });
    return `<${tag}${attributes.length ? ` ${attributes.join(" ")}` : ""} />`;
  });
}

function renderComponent(definition) {
  const iconNodes = renderNodes(definition.source);
  if (!iconNodes.length) throw new Error(`Lucide source has no SVG nodes: ${definition.source}`);
  return `// Generated by scripts/generate-icons.mjs. Do not edit.\nimport { forwardRef } from "react";\nimport { IconBase } from "./IconBase.js";\nimport type { IconProps } from "../types/IconProps.js";\n\nexport const ${definition.name} = forwardRef<SVGSVGElement, IconProps>(function ${definition.name}(props, ref) {\n  return (\n    <IconBase ref={ref} {...props}>\n      ${iconNodes.join("\n      ")}\n    </IconBase>\n  );\n});\n`;
}

function writeOrCheck(path, content) {
  if (check) {
    if (!existsSync(path) || readFileSync(path, "utf8") !== content) throw new Error(`Generated icon output is stale: ${path}`);
    return;
  }
  writeFileSync(path, content);
}

for (const definition of definitions) writeOrCheck(resolve(componentsDir, `${definition.name}.tsx`), renderComponent(definition));

const expectedGeneratedFiles = new Set(definitions.map(({ name }) => `${name}.tsx`));
for (const file of readdirSync(componentsDir).filter((name) => name.endsWith("Icon.tsx"))) {
  const path = resolve(componentsDir, file);
  const generated = readFileSync(path, "utf8").startsWith("// Generated by scripts/generate-icons.mjs.");
  if (!generated || expectedGeneratedFiles.has(file)) continue;
  if (check) throw new Error(`Unexpected generated icon output: ${path}`);
  unlinkSync(path);
}

const exports = ["export type { IconProps } from \"./types/IconProps.js\";", ...definitions.map(({ name }) => `export { ${name} } from "./components/${name}.js";`), ...brands.map(({ name }) => `export { ${name} } from "./components/${name}.js";`)].join("\n") + "\n";
writeOrCheck(resolve(root, "packages/strawn-icons/src/index.ts"), exports);

const all = [...definitions, ...brands];
const items = all.map(({ name, category, keywords }) => `  { name: "${name}", category: "${category}", keywords: ${JSON.stringify(keywords)}, icon: ${name} },`).join("\n");
const catalogImports = all.map(({ name }) => `import { ${name} } from "./components/${name}.js";`).join("\n");
const catalog = `import type { ComponentType } from "react";\nimport type { IconProps } from "./types/IconProps.js";\n${catalogImports}\n\nexport type IconCatalogItem = {\n  name: string;\n  category: string;\n  keywords: readonly string[];\n  icon: ComponentType<IconProps>;\n};\n\nexport const iconCatalog = [\n${items}\n] as const satisfies readonly IconCatalogItem[];\n\nexport const iconCategories = ["All", ${Object.keys(groups).map((category) => `"${category}"`).join(", ")}, "Brands"] as const;\n`;
writeOrCheck(resolve(root, "packages/strawn-icons/src/catalog.ts"), catalog);

if (!check) console.log(`Generated ${all.length} icon components and catalog metadata.`);
