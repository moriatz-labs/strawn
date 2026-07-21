import * as DialogPrimitive from "@radix-ui/react-dialog";
import { CloseIcon } from "strawn-icons";
import type { DialogProps } from "../types/primitives";
import { Box } from "./Box";
import { DialogContent } from "./DialogContent";
import { DialogDescription } from "./DialogDescription";
import { DialogOverlay } from "./DialogOverlay";
import { DialogTitle } from "./DialogTitle";
import { Flex } from "./Flex";
import { IconButton } from "./IconButton";

export function Dialog({ trigger, title, description, children, footer, headerAlign = "start", hideHeaderText = false, initialFocusRef, open, defaultOpen, onOpenChange, closeLabel, css }: DialogProps) {
    return (<DialogPrimitive.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogOverlay />
        <DialogContent
          css={css}
          onOpenAutoFocus={(event) => {
            if (!initialFocusRef?.current) return;
            event.preventDefault();
            initialFocusRef.current.focus();
          }}
        >
          <Flex alignItems="center" gap="$3" justifyContent={hideHeaderText ? "flex-end" : "space-between"}>
            <Box css={hideHeaderText ? {
              border: 0,
              clip: "rect(0, 0, 0, 0)",
              clipPath: "inset(50%)",
              height: 1,
              margin: -1,
              overflow: "hidden",
              padding: 0,
              position: "absolute",
              whiteSpace: "nowrap",
              width: 1,
            } : { flex: 1, textAlign: headerAlign }}>
              <DialogTitle>{title}</DialogTitle>
              {description ? <DialogDescription>{description}</DialogDescription> : null}
            </Box>
            {closeLabel ? (
              <DialogPrimitive.Close asChild>
                <IconButton
                  label={closeLabel}
                  icon={<CloseIcon aria-hidden="true" size={18} />}
                  size="md"
                  variant="ghost"
                  css={hideHeaderText ? { marginRight: "-$3", marginTop: "-$3" } : undefined}
                />
              </DialogPrimitive.Close>
            ) : null}
          </Flex>
          <Box css={{ marginTop: hideHeaderText ? "$2" : "$5" }}>{children}</Box>
          {footer ? (<Flex gap="$3" justifyContent="flex-end" wrap="wrap" css={{ marginTop: "$6" }}>
              {footer}
            </Flex>) : null}
        </DialogContent>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>);
}
