import { styled } from "../stitches";

export const CardContent = styled("div", {
  color: "$cardForeground",
  display: "grid",
  gap: "$4",
  lineHeight: "$base",
  minWidth: 0,
  padding: "$3 $6 $6",
  "& > :first-child": { marginTop: 0 },
  "& > :last-child": { marginBottom: 0 },
});
