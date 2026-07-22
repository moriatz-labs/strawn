import type { ToastVariant } from "../types/primitives";

export const toastVariantStyles: Record<ToastVariant, {
    borderColor: string;
}> = {
    info: { borderColor: "color-mix(in srgb, var(--info) 42%, var(--border))" },
    success: { borderColor: "color-mix(in srgb, var(--success) 45%, var(--border))" },
    error: { borderColor: "color-mix(in srgb, var(--destructive) 55%, var(--border))" },
};
