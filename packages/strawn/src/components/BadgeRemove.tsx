import { styled } from "../stitches";

export const BadgeRemove = styled("button", {
    appearance: "none",
    background: "transparent",
    border: 0,
    borderRadius: "$pill",
    color: "inherit",
    cursor: "pointer",
    font: "inherit",
    lineHeight: 1,
    marginRight: "-0.25rem",
    padding: "$1",
    "&:focus-visible": { outline: "2px solid $ring", outlineOffset: 1 },
});
