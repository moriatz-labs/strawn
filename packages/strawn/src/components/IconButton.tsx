import { type ElementType } from "react";
import type { IconButtonProps } from "../types/primitives";
import { Box } from "./Box";
import { StyledIconButton } from "./StyledIconButton";

export function IconButton({ icon, label, ...props }: IconButtonProps) {
    const IconButtonComponent = StyledIconButton as unknown as ElementType;
    return (<IconButtonComponent aria-label={label} {...props}>
      {icon}
      <Box as="span" css={{
            position: "absolute",
            width: 1,
            height: 1,
            padding: 0,
            margin: -1,
            overflow: "hidden",
            clip: "rect(0, 0, 0, 0)",
            clipPath: "inset(50%)",
            whiteSpace: "nowrap",
            border: 0,
        }}>
        {label}
      </Box>
    </IconButtonComponent>);
}
