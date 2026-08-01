import * as ToastPrimitive from "@radix-ui/react-toast";
import { styled } from "../stitches";

export const ToastViewport = styled(ToastPrimitive.Viewport, {
    bottom: "$5",
    display: "grid",
    gap: "$3",
    listStyle: "none",
    margin: 0,
    padding: 0,
    position: "fixed",
    right: "$5",
    zIndex: "$toast",
});
