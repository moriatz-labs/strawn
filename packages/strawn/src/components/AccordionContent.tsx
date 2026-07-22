import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { styled } from "../stitches";

export const AccordionContent = styled(AccordionPrimitive.Content, {
    color: "$mutedForeground",
    fontFamily: "$body",
    fontSize: "$sm",
    lineHeight: "$base",
    overflow: "hidden",
    opacity: 1,
    transform: "translateY(0)",
    transition: "opacity var(--motion-duration-fast) var(--motion-ease-standard), transform var(--motion-duration-base) var(--motion-ease-enter)",
    '&[data-state="closed"]': { opacity: 0, transform: "translateY(-4px)" },
    "@starting-style": { opacity: 0, transform: "translateY(-4px)" },
    "@media (prefers-reduced-motion: reduce)": {
        transform: "none",
        transition: "opacity var(--motion-duration-fast) var(--motion-ease-standard)",
        '&[data-state="closed"]': { transform: "none" },
    },
});
