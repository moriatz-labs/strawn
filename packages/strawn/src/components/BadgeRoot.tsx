import { styled } from "../stitches";

export const BadgeRoot = styled("span", {
    alignItems: "center",
    border: "1px solid $border",
    borderRadius: "$pill",
    display: "inline-flex",
    backdropFilter: "blur(14px)",
    boxShadow: "0 8px 24px color-mix(in srgb, var(--foreground) 6%, transparent), inset 0 1px 0 color-mix(in srgb, var(--background) 82%, transparent)",
    fontFamily: "$heading",
    fontSize: "$xs",
    fontWeight: "$medium",
    gap: "$2",
    lineHeight: "$snug",
    minHeight: "2.25rem",
    padding: "$2 $5",
    textTransform: "uppercase",
    verticalAlign: "middle",
    variants: { disabled: { true: { opacity: 0.55 } } },
});
