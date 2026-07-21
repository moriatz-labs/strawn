import { buttonSizeStyles, buttonToneStyles } from "../constants/primitives";
import { styled } from "../stitches";

export const StyledButton = styled("button", {
    position: "relative",
    appearance: "none",
    border: "1px solid transparent",
    borderRadius: "$pill",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "$2",
    fontFamily: "$ui",
    fontWeight: "$medium",
    lineHeight: 1,
    cursor: "pointer",
    textDecoration: "none",
    transition: "border-color $base, color $base, transform $fast, box-shadow $base",
    userSelect: "none",
    "&::before": {
        backgroundColor: "$primary",
        borderRadius: "inherit",
        content: '""',
        inset: 0,
        opacity: 0,
        pointerEvents: "none",
        position: "absolute",
        transition: "opacity $fast",
    },
    "& [data-button-icon]": {
        alignItems: "center",
        display: "inline-flex",
        transition: "transform $fast",
    },
    '&[data-loading="true"] [data-button-content="true"]': { opacity: 0 },
    "&:active:not(:disabled)": {
        transform: "scale(var(--motion-scale-press))",
        "&::before": { opacity: 0.12 },
    },
    "@media (hover: hover) and (pointer: fine)": {
        "&:hover:not(:disabled)": {
            transform: "translateY(-1px)",
            "&::before": { opacity: 0.08 },
            "& [data-button-icon='right']": { transform: "translateX(6px)" },
        },
    },
    "@media (pointer: coarse)": {
        minHeight: "2.75rem",
    },
    "@media (prefers-reduced-motion: reduce)": {
        transform: "none !important",
        "& [data-button-icon]": { transform: "none !important", transition: "none" },
    },
    "&:focus-visible": {
        outline: "2px solid $ring",
        outlineOffset: 2,
    },
    "&:disabled": {
        cursor: "not-allowed",
        opacity: "var(--effect-disabled-opacity)",
    },
    variants: {
        variant: {
            solid: {
                backgroundColor: "var(--button-tone-surface, var(--accent))",
                backgroundImage: "none",
                borderColor: "transparent",
                color: "var(--button-tone-text, var(--accent-foreground))",
                boxShadow: "none",
                "&:hover:not(:disabled)": {
                    backgroundColor: "var(--button-tone-hover, var(--accent))",
                    borderColor: "transparent",
                    boxShadow: "none",
                },
            },
            outline: {
                backgroundColor: "$background",
                borderColor: "var(--button-tone-surface, var(--foreground))",
                color: "var(--button-tone-surface, var(--foreground))",
                boxShadow: "inset 0 1px 0 color-mix(in srgb, var(--foreground) 4%, transparent)",
                "&:hover:not(:disabled)": {
                    backgroundColor: "var(--button-tone-muted, var(--muted))",
                    boxShadow: "$soft",
                },
            },
            ghost: {
                backgroundColor: "transparent",
                color: "var(--button-tone-surface, var(--foreground))",
                "&:hover:not(:disabled)": {
                    backgroundColor: "var(--button-tone-muted, var(--muted))",
                },
            },
        },
        tone: buttonToneStyles,
        size: buttonSizeStyles,
    },
    defaultVariants: {
        variant: "solid",
        size: "md",
    },
});
