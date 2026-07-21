import type { ComponentPropsWithoutRef } from "react";
import type { CSS } from "../stitches";

export type CardProps = ComponentPropsWithoutRef<"article"> & {
  asChild?: boolean;
  interactive?: boolean;
  css?: CSS;
};

export type CardMediaProps = ComponentPropsWithoutRef<"div"> & { css?: CSS };
export type CardHeaderProps = ComponentPropsWithoutRef<"header"> & { css?: CSS };
export type CardContentProps = ComponentPropsWithoutRef<"div"> & { css?: CSS };
export type CardActionsProps = ComponentPropsWithoutRef<"footer"> & { css?: CSS };
