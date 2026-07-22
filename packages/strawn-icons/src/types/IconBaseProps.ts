import type { ReactNode } from "react";
import type { IconProps } from "./IconProps.js";

export type IconBaseProps = IconProps & {
  children: ReactNode;
  variant?: "fill" | "stroke";
};
