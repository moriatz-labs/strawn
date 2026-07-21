import * as SwitchPrimitive from "@radix-ui/react-switch";
import { styled } from "../stitches";

export const SwitchRoot = styled(SwitchPrimitive.Root, {
    alignItems: "center",
    appearance: "none",
    backgroundColor: "$muted",
    border: "1px solid $border",
    borderRadius: "$pill",
    boxShadow: "inset 0 1px 0 color-mix(in srgb, var(--foreground) 3%, transparent)",
    cursor: "pointer",
    display: "inline-flex",
    flexShrink: 0,
    height: "1.5rem",
    padding: "0 $1",
    transition: "background-color $base, border-color $base, box-shadow $base",
    width: "2.75rem",
    position: "relative",
    "&::before": {
        content: "",
        inset: "-0.625rem 0",
        position: "absolute",
    },
    "&:focus-visible": {
        outline: "2px solid $ring",
        outlineOffset: 2,
    },
    '&[data-state="checked"]': {
        backgroundColor: "var(--switch-accent-color, var(--accent))",
        borderColor: "var(--switch-accent-color, var(--accent))",
    },
    "&:disabled": {
        cursor: "not-allowed",
        opacity: 0.55,
    },
});
