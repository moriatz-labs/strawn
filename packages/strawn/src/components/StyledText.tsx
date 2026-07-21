import { styled } from "../stitches";

export const StyledText = styled("p", {
  fontFamily: "$ui",
  lineHeight: "$base",
  color: "$foreground",
  textWrap: "pretty",
  variants: {
    size: {
      xs: { fontSize: "$xs" },
      sm: { fontSize: "$sm" },
      md: { fontSize: "$md" },
      lg: { fontSize: "$lg" },
      xl: { fontSize: "$xl" },
    },
  },
  defaultVariants: {
    size: "md",
  },
});
