import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { styled } from "../stitches";

export const CheckboxRoot = styled(CheckboxPrimitive.Root, {
    alignItems: "center",
    appearance: "none",
    backgroundColor: "$background",
    border: "1px solid $border",
    borderRadius: "$xs",
    boxShadow: "inset 0 1px 0 color-mix(in srgb, var(--foreground) 3%, transparent)",
    cursor: "pointer",
    display: "inline-flex",
    flexShrink: 0,
    height: "1.125rem",
    justifyContent: "center",
    padding: 0,
    transition: "background-color $base, border-color $base, box-shadow $base, transform $fast",
    width: "1.125rem",
    "&:active:not(:disabled)": { transform: "scale(0.9)" },
    "@media (prefers-reduced-motion: reduce)": { transform: "none !important" },
    "&:focus-visible": {
        outline: "2px solid $ring",
        outlineOffset: 2,
    },
    '&[data-state="checked"], &[data-state="indeterminate"]': {
        backgroundColor: "$primary",
        borderColor: "$primary",
    },
    "&:disabled": {
        cursor: "not-allowed",
        opacity: 0.55,
    },
});
