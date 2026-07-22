import { CloseIcon } from "strawn-icons";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import type { DrawerProps } from "../types/primitives";
import { Box } from "./Box";
import { DrawerContent } from "./DrawerContent";
import { DrawerOverlay } from "./DrawerOverlay";
import { Flex } from "./Flex";
import { IconButton } from "./IconButton";
import { ScrollArea } from "./ScrollArea";
import { TextStyle } from "./TextStyle";

export function Drawer({ trigger, title, description, children, footer, side = "end", closeLabel = "Close", css }: DrawerProps) {
  return (
    <DialogPrimitive.Root>
      <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DrawerOverlay />
        <DrawerContent side={side} css={css}>
          <Flex alignItems="flex-start" justifyContent="space-between" gap="$4" css={{ padding: "$5 $5 $4" }}>
            <Box>
              <DialogPrimitive.Title asChild><TextStyle as="h2" textStyle="headingSm">{title}</TextStyle></DialogPrimitive.Title>
              {description ? <DialogPrimitive.Description asChild><TextStyle as="p" textStyle="bodySm" tone="muted" css={{ marginTop: "$2" }}>{description}</TextStyle></DialogPrimitive.Description> : null}
            </Box>
            <DialogPrimitive.Close asChild>
              <IconButton label={closeLabel} icon={<CloseIcon aria-hidden="true" size={18} />} variant="ghost" size="sm" />
            </DialogPrimitive.Close>
          </Flex>
          <ScrollArea css={{ flex: 1, padding: "$2 $5 $5" }}>{children}</ScrollArea>
          {footer ? <Box css={{ borderTop: "1px solid $border", padding: "$4 $5 max($4, env(safe-area-inset-bottom, 0px))" }}>{footer}</Box> : null}
        </DrawerContent>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
