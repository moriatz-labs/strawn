import * as PopoverPrimitive from "@radix-ui/react-popover";
import { styled } from "../stitches";

export const StyledPopoverContent = styled(PopoverPrimitive.Content, {
    backgroundColor: "$card",
    border: "1px solid $border",
    borderRadius: "$lg",
    boxShadow: "$elevated",
    color: "$foreground",
    maxWidth: "min(22rem, calc(100vw - 2rem))",
    padding: "$5",
    zIndex: 70,
    transformOrigin: "var(--radix-popover-content-transform-origin)",
    opacity: 1,
    transform: "scale(1)",
    transition: "opacity $enter, transform $enter",
    "@starting-style": { opacity: 0, transform: "scale(0.97)" },
    '&[data-state="closed"]': { opacity: 0, transform: "scale(0.99)", transition: "opacity $exit, transform $exit" },
    "@media (prefers-reduced-motion: reduce)": {
        transform: "none",
        transitionProperty: "opacity",
        '&[data-state="closed"]': { transform: "none" },
    },
});
