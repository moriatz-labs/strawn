import type { ComponentPropsWithoutRef } from "react";
import type { CSS } from "../stitches";
import { Box } from "./Box";

type AspectRatioProps = ComponentPropsWithoutRef<"div"> & {
  ratio?: number | string;
  css?: CSS;
};

export function AspectRatio({ ratio = "16 / 9", css, style, ...props }: AspectRatioProps) {
  return <Box style={{ ...style, aspectRatio: ratio }} css={{ minWidth: 0, overflow: "hidden", ...css }} {...props} />;
}
