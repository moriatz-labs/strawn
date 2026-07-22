import * as SliderPrimitive from "@radix-ui/react-slider";
import { styled } from "../stitches";

export const SliderRoot = styled(SliderPrimitive.Root, {
    alignItems: "center",
    display: "flex",
    height: "2.75rem",
    position: "relative",
    touchAction: "none",
    userSelect: "none",
    width: "100%",
    '&[data-disabled]': {
        opacity: 0.55,
    },
});
