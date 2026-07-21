import * as DialogPrimitive from "@radix-ui/react-dialog";
import { styled } from "../stitches";

export const DialogContent = styled(DialogPrimitive.Content, {
    backgroundColor: "$card",
    border: "1px solid $border",
    borderRadius: "$lg",
    boxShadow: "$elevated",
    color: "$foreground",
    left: "50%",
    maxHeight: "min(85vh, 44rem)",
    maxWidth: "min(32rem, calc(100vw - 2rem))",
    overflowY: "auto",
    padding: "$6",
    position: "fixed",
    top: "50%",
    opacity: 1,
    transform: "translate(-50%, -50%) scale(1)",
    transition: "opacity var(--motion-duration-base) var(--motion-ease-enter), transform var(--motion-duration-base) var(--motion-ease-enter)",
    width: "100%",
    zIndex: 90,
    '&[data-state="closed"]': {
        opacity: 0,
        transform: "translate(-50%, -50%) scale(0.98)",
        transitionDuration: "var(--motion-duration-fast)",
        transitionTimingFunction: "var(--motion-ease-exit)",
    },
    "@starting-style": { opacity: 0, transform: "translate(-50%, -50%) scale(0.96)" },
    "@media (prefers-reduced-motion: reduce)": {
        transform: "translate(-50%, -50%)",
        transition: "opacity var(--motion-duration-fast) var(--motion-ease-standard)",
        '&[data-state="closed"]': { transform: "translate(-50%, -50%)" },
    },
});
