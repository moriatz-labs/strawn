import * as PopoverPrimitive from "@radix-ui/react-popover";
import type { PopoverProps } from "../types/primitives";
import { StyledPopoverContent } from "./StyledPopoverContent";

export function Popover({ trigger, children, label, open, defaultOpen, onOpenChange, css }: PopoverProps) {
    return (<PopoverPrimitive.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      <PopoverPrimitive.Trigger asChild>{trigger}</PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <StyledPopoverContent sideOffset={8} collisionPadding={16} aria-label={label} css={css}>
          {children}
        </StyledPopoverContent>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>);
}
