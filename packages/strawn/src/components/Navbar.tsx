import { styled } from "../stitches";

/**
 * Generic navigation primitives. Compose them with application routing links,
 * a brand, and optional actions; Strawn intentionally owns no product routes.
 */
export const Navbar = styled("nav", {
  alignItems: "center",
  backgroundColor: "$surfaceRaised",
  border: "1px solid $border",
  borderRadius: "$pill",
  boxShadow: "$elevated",
  display: "grid",
  gap: "$2",
  gridTemplateColumns: "minmax(0, 1fr) auto minmax(0, 1fr)",
  minHeight: "$controlComfortable",
  padding: "$2 $4",
  "@media (max-width: 48rem)": {
    gridTemplateColumns: "1fr auto",
  },
});

export const NavbarBrand = styled("div", {
  justifySelf: "start",
  minWidth: 0,
});

export const NavbarLinks = styled("div", {
  alignItems: "center",
  display: "flex",
  flexWrap: "wrap",
  gap: "$1",
  justifyContent: "center",
  "@media (max-width: 48rem)": {
    gridColumn: "1 / -1",
    gridRow: 2,
    justifyContent: "flex-start",
  },
});

export const NavbarLink = styled("a", {
  alignItems: "center",
  borderRadius: "$pill",
  color: "$mutedForeground",
  display: "inline-flex",
  fontFamily: "$ui",
  fontSize: "$sm",
  fontWeight: "$medium",
  justifyContent: "center",
  minHeight: "$hitTarget",
  paddingInline: "$3",
  textDecoration: "none",
  transition: "background-color $fast, color $fast",
  "&:hover, &[aria-current=page]": {
    backgroundColor: "$accent",
    color: "$accentForeground",
  },
  "&:focus-visible": {
    outline: "2px solid $ring",
    outlineOffset: 2,
  },
});

export const NavbarActions = styled("div", {
  alignItems: "center",
  display: "flex",
  gap: "$2",
  justifySelf: "end",
  "@media (max-width: 48rem)": {
    gridColumn: 2,
    gridRow: 1,
  },
});

export const NavbarAction = styled("a", {
  alignItems: "center",
  backgroundColor: "$surface",
  border: "1px solid $borderStrong",
  borderRadius: "$pill",
  color: "$foreground",
  display: "inline-flex",
  fontFamily: "$ui",
  fontSize: "$xs",
  fontWeight: "$medium",
  gap: "$1",
  justifyContent: "center",
  minHeight: "$hitTarget",
  paddingInline: "$3",
  textDecoration: "none",
  transition: "background-color $fast, border-color $fast",
  "&:hover": {
    backgroundColor: "$accent",
    borderColor: "$primary",
  },
  "&:focus-visible": {
    outline: "2px solid $ring",
    outlineOffset: 2,
  },
});
