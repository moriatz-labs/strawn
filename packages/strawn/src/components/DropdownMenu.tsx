import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import type { DropdownMenuProps } from "../types/primitives";
import { DropdownContent } from "./DropdownContent";
import { DropdownItem } from "./DropdownItem";
import { DropdownSeparator } from "./DropdownSeparator";

export function DropdownMenu({ trigger, items, label, css }: DropdownMenuProps) {
    return (<DropdownMenuPrimitive.Root>
      <DropdownMenuPrimitive.Trigger asChild>{trigger}</DropdownMenuPrimitive.Trigger>
      <DropdownMenuPrimitive.Portal>
        <DropdownContent sideOffset={8} collisionPadding={16} aria-label={label} css={css}>
          {items.map((item, index) => {
            if (item.type === "separator") {
                return <DropdownSeparator key={`separator-${index}`}/>;
            }
            return (<DropdownItem key={`${item.label}-${index}`} disabled={item.disabled} destructive={item.destructive} onSelect={item.onSelect}>
                {item.label}
              </DropdownItem>);
        })}
        </DropdownContent>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>);
}
