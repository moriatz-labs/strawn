import { styled } from "../stitches";

export const StyledHeading = styled("h2", {
  fontFamily: "$heading",
  fontWeight: "$semibold",
  lineHeight: "$snug",
  letterSpacing: "$display",
  color: "$foreground",
  textWrap: "balance",
  variants: {
    size: {
      h1: {
        fontSize: "$4xl",
        letterSpacing: "$display",
        lineHeight: "$tight",
      },
      h2: {
        fontSize: "$3xl",
        letterSpacing: "$display",
        lineHeight: "$tight",
      },
      h3: {
        fontSize: "$2xl",
      },
      h6: {
        fontSize: "$xl",
      },
    },
  },
  defaultVariants: {
    size: "h2",
  },
});
