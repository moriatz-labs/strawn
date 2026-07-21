import { styled } from "../stitches";

export const ControlFrame = styled("div", {
    alignItems: "center",
    backgroundColor: "$background",
    border: "1px solid $border",
    borderRadius: "$md",
    boxShadow: "inset 0 1px 0 color-mix(in srgb, var(--foreground) 3%, transparent)",
    color: "$foreground",
    display: "flex",
    gap: "$2",
    minHeight: "2.75rem",
    paddingInline: "$3",
    transition: "border-color $base, box-shadow $base",
    "&:focus-within": {
        borderColor: "$ring",
        boxShadow: "0 0 0 3px color-mix(in srgb, var(--ring) 24%, transparent)",
    },
    variants: {
        invalid: {
            true: {
                borderColor: "$destructive",
            },
        },
    },
});
