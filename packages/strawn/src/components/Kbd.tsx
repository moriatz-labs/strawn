import { styled } from "../stitches";

export const Kbd = styled("kbd", {
  alignItems: "center",
  backgroundColor: "$surfaceInset",
  border: "1px solid $border",
  borderBottomColor: "$borderStrong",
  borderRadius: "$xs",
  boxShadow: "inset 0 -1px 0 color-mix(in srgb, var(--foreground) 8%, transparent)",
  color: "$mutedForeground",
  display: "inline-flex",
  fontFamily: "$mono",
  fontSize: "$xs",
  fontWeight: "$medium",
  justifyContent: "center",
  lineHeight: 1,
  minHeight: "1.5rem",
  minWidth: "1.5rem",
  paddingInline: "$2",
  whiteSpace: "nowrap",
});
