import { styled } from "../stitches";

export const Separator = styled("div", {
  backgroundColor: "$border",
  flexShrink: 0,
  variants: {
    orientation: {
      horizontal: { height: "1px", width: "100%" },
      vertical: { alignSelf: "stretch", minHeight: "1rem", width: "1px" },
    },
    emphasis: {
      subtle: { backgroundColor: "$border" },
      strong: { backgroundColor: "$mutedForeground" },
    },
  },
  defaultVariants: { orientation: "horizontal", emphasis: "subtle" },
});
