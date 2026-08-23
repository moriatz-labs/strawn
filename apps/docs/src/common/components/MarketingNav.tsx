import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, NavbarAction, NavbarActions, NavbarBrand, NavbarLink, NavbarLinks } from "strawn";

type MarketingNavItem = {
  label: string;
  to: string;
};

type MarketingNavAction = {
  label: string;
  href: string;
  external?: boolean;
  icon?: ReactNode;
};

type MarketingNavProps = {
  brand: ReactNode;
  items: MarketingNavItem[];
  action?: MarketingNavAction;
};

export function MarketingNav({ brand, items, action }: MarketingNavProps) {
  return (
    <header>
      <Navbar className="docs-marketing-nav" aria-label="Documentation" css={{ margin: "$3 auto", maxWidth: "$container", width: "calc(100% - $space$8)", position: "sticky", top: "$3", zIndex: "$header" }}>
        <NavbarBrand>{brand}</NavbarBrand>
        <NavbarLinks className="docs-marketing-nav-links">
          {items.map((item) => (
            <NavbarLink key={item.to} as={NavLink} to={item.to}>{item.label}</NavbarLink>
          ))}
        </NavbarLinks>
        <NavbarActions className="docs-marketing-nav-actions">
          {action ? (
            <NavbarAction href={action.href} target={action.external ? "_blank" : undefined} rel={action.external ? "noreferrer" : undefined}>
              {action.icon}
              {action.label}
            </NavbarAction>
          ) : null}
        </NavbarActions>
      </Navbar>
    </header>
  );
}
