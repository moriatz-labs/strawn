import * as DialogPrimitive from "@radix-ui/react-dialog";
import { styled } from "../stitches";

export const DialogDescription = styled(DialogPrimitive.Description, {
    color: "$mutedForeground",
    fontFamily: "$body",
    lineHeight: "$base",
    margin: "$2 0 0",
});
