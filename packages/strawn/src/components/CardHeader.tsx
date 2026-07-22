import { styled } from "../stitches";

export const CardHeader = styled("header", {
  display: "grid",
  gap: "$2",
  padding: "$6 $6 $3",
  "& > :is(h1, h2, h3, h4, h5, h6)": {
    color: "$cardForeground",
    fontFamily: "$heading",
    fontSize: "$xl",
    fontWeight: "$regular",
    lineHeight: "$snug",
    margin: 0,
  },
  "& > p": { color: "$mutedForeground", fontFamily: "$body", lineHeight: "$base", margin: 0 },
});
