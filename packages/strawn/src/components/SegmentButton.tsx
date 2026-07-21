import { styled } from "../stitches";

export const SegmentButton = styled("button", {
    alignItems: "center",
    appearance: "none",
    backgroundColor: "transparent",
    border: 0,
    borderRadius: "$sm",
    color: "$mutedForeground",
    cursor: "pointer",
    display: "inline-flex",
    fontFamily: "$ui",
    fontSize: "$sm",
    fontWeight: "$medium",
    gap: "$2",
    minHeight: "2.25rem",
    padding: "$2 $3",
    transition: "background-color $base, color $base, box-shadow $base, transform $fast",
    "&:active:not(:disabled)": { transform: "scale(0.97)" },
    "@media (prefers-reduced-motion: reduce)": { transform: "none !important" },
    "&:focus-visible": {
        outline: "2px solid $ring",
        outlineOffset: 2,
    },
    "&:disabled": {
        cursor: "not-allowed",
        opacity: 0.55,
    },
    variants: {
        active: {
            true: {
                backgroundColor: "$background",
                boxShadow: "$soft",
                color: "$foreground",
            },
        },
    },
});
