import { Link } from "react-router-dom";
import { Navbar, NavbarAction, NavbarActions, NavbarBrand, NavbarLink, NavbarLinks, Stack, TextStyle } from "strawn";
import { GitHubIcon } from "strawn-icons";

const navbarVariants = [
  {
    slug: "capsule",
    title: "Original capsule",
    eyebrow: "Closest to the old Strawn nav",
    description: "A single floating glass volume with a soft graphite edge and quiet lift.",
  },
  {
    slug: "prism",
    title: "Prismatic bevel",
    eyebrow: "Sharper refraction",
    description: "A brighter top plane and ink-dark lower edge make the bar feel precision-cut.",
  },
  {
    slug: "stacked",
    title: "Stacked lens",
    eyebrow: "Most dimensional",
    description: "Two offset translucent plates create depth without making the controls heavier.",
  },
  {
    slug: "soft",
    title: "Soft extrusion",
    eyebrow: "Quietest option",
    description: "A white raised form with restrained inset highlights and almost no visible tint.",
  },
  {
    slug: "orbital",
    title: "Split orbital dock",
    eyebrow: "Most distinctive",
    description: "Brand, navigation, and action become three related floating glass objects.",
  },
] as const;

type NavbarVariant = (typeof navbarVariants)[number];

function GlassNavSpecimen({ variant }: { variant: NavbarVariant }) {
  return (
    <article className="navbar-specimen">
      <header className="navbar-specimen-heading">
        <span className="navbar-specimen-number" aria-hidden="true">
          {String(navbarVariants.indexOf(variant) + 1).padStart(2, "0")}
        </span>
        <div>
          <TextStyle as="span" textStyle="eyebrow" tone="accent">{variant.eyebrow}</TextStyle>
          <TextStyle as="h2" textStyle="headingMd">{variant.title}</TextStyle>
          <TextStyle as="p" textStyle="body" tone="muted">{variant.description}</TextStyle>
        </div>
      </header>

      <div className={`navbar-specimen-stage navbar-specimen-stage--${variant.slug}`}>
        <Navbar className={`glass-nav glass-nav--${variant.slug}`} aria-label={`${variant.title} preview`}>
          <NavbarBrand className="glass-nav-brand">
            <NavbarLink as={Link} className="glass-nav-brand-link" to="/" aria-label={`Strawn home, ${variant.title} preview`}>
              <span className="glass-nav-mark" aria-hidden="true" />
              <span aria-hidden="true">Strawn</span>
            </NavbarLink>
          </NavbarBrand>
          <NavbarLinks className="glass-nav-links">
            <NavbarLink as={Link} to="/components">Components</NavbarLink>
            <NavbarLink as={Link} to="/icons">Icons</NavbarLink>
            <NavbarLink as={Link} to="/theming">Theming</NavbarLink>
          </NavbarLinks>
          <NavbarActions className="glass-nav-actions">
            <NavbarAction
              className="glass-nav-action"
              href="https://github.com/moriatz-labs/strawn"
              target="_blank"
              rel="noreferrer"
              aria-label={`GitHub, ${variant.title} preview`}
            >
              <GitHubIcon aria-hidden="true" size={13} />
              <span className="glass-nav-action-label">GitHub</span>
            </NavbarAction>
          </NavbarActions>
        </Navbar>
      </div>
    </article>
  );
}

export function NavbarLabPage() {
  return (
    <Stack className="navbar-lab-page" gap="$12">
      <header className="page-heading navbar-lab-heading">
        <TextStyle as="span" textStyle="eyebrow" tone="accent">Navigation study · five directions</TextStyle>
        <TextStyle as="h1" textStyle="headingLg">Glass, with structure.</TextStyle>
        <TextStyle as="p" textStyle="bodyLg" tone="muted">
          Five white-first interpretations of the old floating Strawn navbar. The GitHub control stays compact in every version so depth—not button bulk—sets the hierarchy.
        </TextStyle>
      </header>

      <div className="navbar-lab-list">
        {navbarVariants.map((variant) => <GlassNavSpecimen key={variant.slug} variant={variant} />)}
      </div>
    </Stack>
  );
}
