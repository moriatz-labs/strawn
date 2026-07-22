import { forwardRef } from "react";
import type { IconBaseProps } from "../types/IconBaseProps.js";

export const IconBase = forwardRef<SVGSVGElement, IconBaseProps>(function IconBase(
  {
    children,
    color = "currentColor",
    size = 24,
    title,
    variant = "stroke",
    focusable = "false",
    role,
    "aria-hidden": ariaHidden,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    ...props
  },
  ref,
) {
  const accessible = Boolean(title || role || ariaLabel || ariaLabelledBy);

  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={variant === "fill" ? color : "none"}
      stroke={variant === "stroke" ? color : "none"}
      strokeWidth={variant === "stroke" ? 2 : undefined}
      strokeLinecap={variant === "stroke" ? "round" : undefined}
      strokeLinejoin={variant === "stroke" ? "round" : undefined}
      focusable={focusable}
      role={role ?? (title ? "img" : undefined)}
      aria-hidden={ariaHidden ?? (accessible ? undefined : true)}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
});
