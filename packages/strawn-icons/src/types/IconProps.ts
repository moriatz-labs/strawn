import type { ComponentPropsWithoutRef } from "react";

export type IconProps = Omit<ComponentPropsWithoutRef<"svg">, "color"> & {
  color?: string;
  size?: number | string;
  title?: string;
};
