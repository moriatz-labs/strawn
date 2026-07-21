import { styled } from "../stitches";

export const ScrollArea = styled("div", {
  minHeight: 0,
  minWidth: 0,
  overscrollBehavior: "contain",
  scrollbarColor: "var(--border-strong) transparent",
  scrollbarGutter: "stable",
  variants: {
    direction: {
      vertical: { overflowX: "hidden", overflowY: "auto" },
      horizontal: { overflowX: "auto", overflowY: "hidden" },
      both: { overflow: "auto" },
    },
  },
  defaultVariants: { direction: "vertical" },
});
