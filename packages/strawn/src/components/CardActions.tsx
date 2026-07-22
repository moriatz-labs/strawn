import { styled } from "../stitches";

export const CardActions = styled("footer", {
  alignItems: "center",
  display: "flex",
  flexWrap: "wrap",
  gap: "$2",
  marginTop: "auto",
  padding: "$3 $6 $6",
  "@media (pointer: coarse)": { "& :is(a, button)": { minHeight: "2.75rem" } },
});
