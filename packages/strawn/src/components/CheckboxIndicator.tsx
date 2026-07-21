import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { styled } from "../stitches";

export const CheckboxIndicator = styled(CheckboxPrimitive.Indicator, {
    alignItems: "center",
    color: "$primaryForeground",
    display: "inline-flex",
    height: "100%",
    justifyContent: "center",
    transform: "scale(1)",
    transition: "opacity $fast, transform $base",
    width: "100%",
    "&::after": {
        borderBottom: "0.12rem solid currentColor",
        borderRight: "0.12rem solid currentColor",
        content: '""',
        height: "0.5rem",
        marginTop: "-0.05rem",
        transform: "rotate(45deg)",
        width: "0.28rem",
    },
    "@starting-style": { opacity: 0, transform: "scale(0.7)" },
    "@media (prefers-reduced-motion: reduce)": { transform: "none", transitionProperty: "opacity" },
});
