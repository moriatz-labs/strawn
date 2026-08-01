import { styled } from "../stitches";

export const BadgeRoot = styled("span", {
    alignItems: "center",
    border: "1px solid $border",
    borderRadius: "$pill",
    display: "inline-flex",
    fontFamily: "$ui",
    fontSize: "$xs",
    fontWeight: "$medium",
    gap: "$2",
    lineHeight: "$ui",
    minHeight: "1.5rem",
    padding: "$1 $2",
    verticalAlign: "middle",
    variants: { disabled: { true: { opacity: 0.55 } } },
});
