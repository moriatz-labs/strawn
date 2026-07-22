import * as DialogPrimitive from "@radix-ui/react-dialog";
import { styled } from "../stitches";

export const DrawerContent = styled(DialogPrimitive.Content, {
  backgroundColor: "$surfaceRaised",
  boxShadow: "$elevated",
  display: "flex",
  flexDirection: "column",
  maxHeight: "100dvh",
  overflow: "hidden",
  position: "fixed",
  transition: "transform var(--motion-duration-base) var(--motion-ease-drawer), opacity var(--motion-duration-fast) var(--motion-ease-enter)",
  zIndex: "$modal",
  variants: {
    side: {
      start: {
        borderRadius: "0 $xl $xl 0",
        bottom: 0,
        left: 0,
        maxWidth: "min(28rem, calc(100vw - 1rem))",
        top: 0,
        width: "100%",
        '&[data-state="closed"]': { opacity: 0, transform: "translateX(-100%)" },
        "@starting-style": { opacity: 0, transform: "translateX(-100%)" },
      },
      end: {
        borderRadius: "$xl 0 0 $xl",
        bottom: 0,
        maxWidth: "min(28rem, calc(100vw - 1rem))",
        right: 0,
        top: 0,
        width: "100%",
        '&[data-state="closed"]': { opacity: 0, transform: "translateX(100%)" },
        "@starting-style": { opacity: 0, transform: "translateX(100%)" },
      },
      bottom: {
        borderRadius: "$xl $xl 0 0",
        bottom: 0,
        left: 0,
        maxHeight: "min(85dvh, 48rem)",
        right: 0,
        '&[data-state="closed"]': { opacity: 0, transform: "translateY(100%)" },
        "@starting-style": { opacity: 0, transform: "translateY(100%)" },
      },
    },
  },
  defaultVariants: { side: "end" },
  "@media (prefers-reduced-motion: reduce)": {
    transition: "opacity $fast",
    transform: "none !important",
  },
});
