import * as ToastPrimitive from "@radix-ui/react-toast";
import { styled } from "../stitches";

export const ToastDescription = styled(ToastPrimitive.Description, {
    color: "$mutedForeground",
    fontFamily: "$body",
    fontSize: "$sm",
    lineHeight: "$snug",
});
