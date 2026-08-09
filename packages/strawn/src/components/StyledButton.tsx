import { buttonSizeStyles, buttonToneStyles } from "../constants/primitives";
import { styled } from "../stitches";

export const StyledButton = styled("button", {
    position: "relative",
    appearance: "none",
    border: "1px solid transparent",
    borderRadius: "$sm",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "$2",
    fontFamily: "$ui",
    fontWeight: "$medium",
    lineHeight: 1,
    cursor: "pointer",
    textDecoration: "none",
    transition: "background-color $fast, border-color $fast, color $fast, box-shadow $fast",
    userSelect: "none",
    "&::before": {
        backgroundColor: "$primary",
        borderRadius: "inherit",
        content: '""',
        inset: 0,
        opacity: 0,
        pointerEvents: "none",
        position: "absolute",
        transition: "opacity $immediate",
    },
    "& [data-button-icon]": {
        alignItems: "center",
        display: "inline-flex",
    },
    '&[data-loading="true"] [data-button-content="true"]': { opacity: 0 },
    "&:active:not(:disabled)": {
        "&::before": { opacity: 0.12 },
    },
    "@media (hover: hover) and (pointer: fine)": {
        "&:hover:not(:disabled)": {
            "&::before": { opacity: 0.08 },
        },
    },
    "@media (pointer: coarse)": {
        minHeight: "2.75rem",
    },
    "@media (prefers-reduced-motion: reduce)": {
        transitionDuration: "var(--motion-duration-immediate)",
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
                backgroundColor: "var(--button-tone-surface, var(--primary))",
                backgroundImage: "none",
                borderColor: "transparent",
                color: "var(--button-tone-text, var(--primary-foreground))",
                boxShadow: "none",
                "&:hover:not(:disabled)": {
                    backgroundColor: "var(--button-tone-hover, color-mix(in srgb, var(--primary) 88%, var(--background)))",
                    borderColor: "transparent",
                    boxShadow: "none",
                },
            },
            outline: {
                backgroundColor: "$surface",
                borderColor: "$borderStrong",
                color: "var(--button-tone-surface, var(--foreground))",
                boxShadow: "none",
                "&:hover:not(:disabled)": {
                    backgroundColor: "var(--button-tone-muted, var(--muted))",
                    borderColor: "$foreground",
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
