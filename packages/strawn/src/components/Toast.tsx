import type { ToastProps } from "../types/primitives";
import { ToastDescription } from "./ToastDescription";
import { ToastRoot } from "./ToastRoot";
import { ToastTitle } from "./ToastTitle";
import { toastVariantStyles } from "../constants/toastVariantStyles";

export function Toast({ title, description, variant = "info", onOpenChange }: ToastProps) {
    const variantStyle = toastVariantStyles[variant];
    return (<ToastRoot open onOpenChange={onOpenChange} css={{ borderColor: variantStyle.borderColor }}>
      <ToastTitle>{title}</ToastTitle>
      {description ? <ToastDescription>{description}</ToastDescription> : null}
    </ToastRoot>);
}
