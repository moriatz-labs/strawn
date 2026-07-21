import { iconButtonSizeStyles } from "../constants/primitives";
import { styled } from "../stitches";
import { StyledButton } from "./StyledButton";

export const StyledIconButton = styled(StyledButton, {
    borderRadius: "$pill",
    padding: 0,
    position: "relative",
    boxShadow: "none",
    overflow: "hidden",
    "@media (pointer: coarse)": {
        minHeight: "2.75rem",
        minWidth: "2.75rem",
    },
    "& svg": {
        flexShrink: 0,
        position: "relative",
        zIndex: 1,
    },
    variants: {
        variant: {
            solid: {
                backgroundColor: "var(--button-tone-surface, var(--accent))",
                backgroundImage: "none",
                borderColor: "transparent",
                color: "var(--button-tone-text, var(--accent-foreground))",
                "&:hover:not(:disabled)": {
                    backgroundColor: "var(--button-tone-hover, var(--accent))",
                    backgroundImage: "none",
                    borderColor: "transparent",
                    boxShadow: "none",
                },
            },
            outline: {
                borderColor: "color-mix(in srgb, var(--foreground) 28%, var(--border))",
                boxShadow: "inset 0 1px 0 color-mix(in srgb, var(--foreground) 3%, transparent)",
                "&:hover:not(:disabled)": {
                    borderColor: "color-mix(in srgb, var(--foreground) 40%, var(--border))",
                    boxShadow: "$soft",
                },
            },
        },
        size: iconButtonSizeStyles,
    },
});
