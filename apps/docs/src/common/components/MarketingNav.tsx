import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";

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
    <header className="marketing-nav-shell">
      <div className="marketing-nav-container">
        <div className="marketing-nav-surface">
          <div className="marketing-nav-brand">{brand}</div>
          <nav className="marketing-nav-links" aria-label="Documentation">
            {items.map((item) => (
              <NavLink key={item.to} to={item.to}>{item.label}</NavLink>
            ))}
          </nav>
          <div className="marketing-nav-actions">
            {action ? (
              <a
                className="marketing-nav-action"
                href={action.href}
                target={action.external ? "_blank" : undefined}
                rel={action.external ? "noreferrer" : undefined}
              >
                {action.icon}
                {action.label}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
