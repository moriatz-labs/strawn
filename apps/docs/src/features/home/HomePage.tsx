import { useNavigate } from "react-router-dom";
import { Button } from "strawn";
import { ArrowRightIcon } from "strawn-icons";

const frontendExamples = [
  {
    name: "Vite + React",
    file: "src/main.tsx",
    detail: "Load the font once in the application entry point, then import only the icon components used by the bundle.",
    code: `import "moriatz-sans";
import { SearchIcon } from "strawn-icons";

export function SearchButton() {
  return <button><SearchIcon aria-hidden="true" /> Search</button>;
}`,
  },
  {
    name: "Next.js App Router",
    file: "app/layout.tsx",
    detail: "Import the font stylesheet from the root layout. Icons are ordinary typed React components and can render inside server or client components.",
    code: `import "moriatz-sans";
import { GitHubIcon } from "strawn-icons";

export default function Layout({ children }) {
  return <html><body>{children}<GitHubIcon /></body></html>;
}`,
  },
  {
    name: "Remix",
    file: "app/root.tsx",
    detail: "Register the font at the root and use currentColor icons anywhere in the React route tree. Set size with a prop or inherited CSS.",
    code: `import "moriatz-sans";
import { DownloadIcon } from "strawn-icons";

export default function App() {
  return <main><DownloadIcon size={20} /> Download</main>;
}`,
  },
] as const;

export function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <section className="hero" aria-labelledby="home-title">
        <div className="hero-copy">
          <span className="home-eyebrow">Moriatz frontend assets</span>
          <h1 id="home-title">One font. One React icon library.</h1>
          <p>
            Strawn is the home of Moriatz Sans and <code>strawn-icons</code>. It does not provide application components,
            themes, layouts, or product UI.
          </p>
          <div className="home-actions">
            <Button onClick={() => navigate("/font")} rightIcon={<ArrowRightIcon aria-hidden="true" />}>Inspect the font</Button>
            <Button onClick={() => navigate("/icons")} variant="outline">Browse React icons</Button>
          </div>
        </div>
        <div className="home-definition" aria-label="What Strawn provides">
          <article>
            <span className="home-asset-mark" aria-hidden="true">Aa</span>
            <div>
              <code>moriatz-sans</code>
              <h2>Variable web font</h2>
              <p>A WOFF2 family with a continuous 100–700 weight axis. Import its stylesheet once and use <code>Moriatz Sans Variable</code> in CSS.</p>
            </div>
          </article>
          <article>
            <span className="home-asset-mark" aria-hidden="true">↗</span>
            <div>
              <code>strawn-icons</code>
              <h2>React SVG components</h2>
              <p>Typed, tree-shakeable named exports. Every icon inherits <code>currentColor</code> and accepts standard SVG and accessibility props.</p>
            </div>
          </article>
        </div>
      </section>

      <section className="integration-section" aria-labelledby="integration-title">
        <header>
          <span className="home-eyebrow">Three React setups</span>
          <h2 id="integration-title">The exact integration point.</h2>
          <p>Install both packages with <code>bun add moriatz-sans strawn-icons</code>. The only global step is loading the font stylesheet.</p>
        </header>
        <div className="integration-list">
          {frontendExamples.map((example, index) => (
            <article className="integration-example" key={example.name}>
              <div className="integration-copy">
                <span>0{index + 1}</span>
                <div>
                  <h3>{example.name}</h3>
                  <code>{example.file}</code>
                  <p>{example.detail}</p>
                </div>
              </div>
              <pre className="code-block"><code>{example.code}</code></pre>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
