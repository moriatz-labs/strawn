import * as SliderPrimitive from "@radix-ui/react-slider";
import { styled } from "../stitches";

export const SliderTrack = styled(SliderPrimitive.Track, {
    backgroundColor: "color-mix(in srgb, var(--foreground) 16%, transparent)",
    borderRadius: "$pill",
    flexGrow: 1,
    height: "0.625rem",
    overflow: "hidden",
    position: "relative",
});
