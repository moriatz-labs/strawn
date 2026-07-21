import * as ToastPrimitive from "@radix-ui/react-toast";
import { styled } from "../stitches";

export const ToastTitle = styled(ToastPrimitive.Title, {
    fontFamily: "$ui",
    fontSize: "$sm",
    fontWeight: "$semibold",
});
