import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { StyledTooltipArrow } from "./StyledTooltipArrow";
import { StyledTooltipContent } from "./StyledTooltipContent";

export function TooltipContent({ sideOffset = 8, children, ...props }: React.ComponentProps<typeof TooltipPrimitive.Content>) {
    return (<TooltipPrimitive.Portal>
      <StyledTooltipContent data-slot="tooltip-content" sideOffset={sideOffset} {...props}>
        {children}
        <StyledTooltipArrow width={10} height={5}/>
      </StyledTooltipContent>
    </TooltipPrimitive.Portal>);
}
