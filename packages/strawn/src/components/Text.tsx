import { forwardRef } from "react";
import type { TextProps } from "../types/primitives";
import { StyledText } from "./StyledText";

export const Text = forwardRef<HTMLParagraphElement, TextProps>(function Text(
  { color, css, size = "md", ...props },
  ref,
) {
  return (
    <StyledText
      ref={ref}
      size={size}
      css={{
        color,
        ...css,
      }}
      {...props}
    />
  );
});
