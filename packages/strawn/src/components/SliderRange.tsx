import * as SliderPrimitive from "@radix-ui/react-slider";
import { styled } from "../stitches";

export const SliderRange = styled(SliderPrimitive.Range, {
    backgroundColor: "$primary",
    height: "100%",
    position: "absolute",
});
