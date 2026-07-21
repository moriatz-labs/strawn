import { forwardRef } from "react";
import type { HeadingProps } from "../types/primitives";
import { StyledHeading } from "./StyledHeading";

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(function Heading(
  { color, css, size = "h2", ...props },
  ref,
) {
  return (
    <StyledHeading
      ref={ref}
      as={size}
      size={size}
      css={{
        color,
        ...css,
      }}
      {...props}
    />
  );
});
