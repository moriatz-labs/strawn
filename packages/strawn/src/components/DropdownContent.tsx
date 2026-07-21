import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { styled } from "../stitches";

export const DropdownContent = styled(DropdownMenuPrimitive.Content, {
    backgroundColor: "$card",
    border: "1px solid $border",
    borderRadius: "$lg",
    boxShadow: "$elevated",
    color: "$foreground",
    minWidth: "12rem",
    padding: "$2",
    zIndex: 70,
    transformOrigin: "var(--radix-dropdown-menu-content-transform-origin)",
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
