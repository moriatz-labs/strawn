import * as DialogPrimitive from "@radix-ui/react-dialog";
import { styled } from "../stitches";

export const DialogOverlay = styled(DialogPrimitive.Overlay, {
    backgroundColor: "color-mix(in srgb, var(--foreground) 32%, transparent)",
    inset: 0,
    position: "fixed",
    zIndex: 80,
    opacity: 1,
    transition: "opacity var(--motion-duration-base) var(--motion-ease-enter)",
    '&[data-state="closed"]': { opacity: 0, transitionDuration: "var(--motion-duration-fast)" },
    "@starting-style": { opacity: 0 },
});
