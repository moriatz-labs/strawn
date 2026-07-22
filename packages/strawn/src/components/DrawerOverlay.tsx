import * as DialogPrimitive from "@radix-ui/react-dialog";
import { styled } from "../stitches";

export const DrawerOverlay = styled(DialogPrimitive.Overlay, {
  backgroundColor: "var(--effect-scrim)",
  inset: 0,
  opacity: 1,
  position: "fixed",
  transition: "opacity $enter",
  zIndex: "$overlay",
  '&[data-state="closed"]': { opacity: 0, transition: "opacity $exit" },
  "@starting-style": { opacity: 0 },
});
