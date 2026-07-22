import * as ToastPrimitive from "@radix-ui/react-toast";
import { styled } from "../stitches";

export const ToastRoot = styled(ToastPrimitive.Root, {
    backgroundColor: "$card",
    border: "1px solid $border",
    borderRadius: "$lg",
    boxShadow: "$elevated",
    color: "$foreground",
    display: "grid",
    gap: "$1",
    padding: "$4",
    width: "min(24rem, calc(100vw - 2rem))",
    opacity: 1,
    transform: "translateX(0%)",
    transition: "opacity $enter, transform $enter",
    "@starting-style": { opacity: 0, transform: "translateX(100%)" },
    '&[data-state="closed"]': { opacity: 0, transform: "translateX(100%)", transition: "opacity $exit, transform $exit" },
    "@media (prefers-reduced-motion: reduce)": {
        transform: "none",
        transitionProperty: "opacity",
        '&[data-state="closed"]': { transform: "none" },
    },
});
