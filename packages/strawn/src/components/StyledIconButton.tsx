import { iconButtonSizeStyles } from "../constants/primitives";
import { styled } from "../stitches";
import { StyledButton } from "./StyledButton";

export const StyledIconButton = styled(StyledButton, {
    borderRadius: "$sm",
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
                backgroundColor: "var(--button-tone-surface, var(--primary))",
                backgroundImage: "none",
                borderColor: "transparent",
                color: "var(--button-tone-text, var(--primary-foreground))",
                "&:hover:not(:disabled)": {
                    backgroundColor: "var(--button-tone-hover, color-mix(in srgb, var(--primary) 88%, var(--background)))",
                    backgroundImage: "none",
                    borderColor: "transparent",
                    boxShadow: "none",
                },
            },
            outline: {
                borderColor: "$borderStrong",
                boxShadow: "none",
                "&:hover:not(:disabled)": {
                    borderColor: "$foreground",
                },
            },
        },
        size: iconButtonSizeStyles,
    },
});
