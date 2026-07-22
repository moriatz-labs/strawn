import * as SwitchPrimitive from "@radix-ui/react-switch";
import { styled } from "../stitches";

export const SwitchThumb = styled(SwitchPrimitive.Thumb, {
    backgroundColor: "$mutedForeground",
    borderRadius: "$pill",
    boxShadow: "$soft",
    display: "block",
    height: "1rem",
    transform: "translateX(0)",
    transition: "transform var(--motion-duration-base) var(--motion-ease-enter), box-shadow var(--motion-duration-fast) var(--motion-ease-standard)",
    width: "1rem",
    '&[data-state="checked"]': {
        backgroundColor: "$background",
        transform: "translateX(1.2rem)",
    },
    "@media (prefers-reduced-motion: reduce)": { transition: "none" },
});
