import type { AlertTone } from "../types/primitives";

export const alertToneStyles: Record<AlertTone, {
    borderColor: string;
    backgroundColor: string;
}> = {
    info: { borderColor: "color-mix(in srgb, var(--info) 38%, var(--border))", backgroundColor: "var(--info-muted)" },
    success: { borderColor: "color-mix(in srgb, var(--success) 38%, var(--border))", backgroundColor: "var(--success-muted)" },
    warning: { borderColor: "color-mix(in srgb, var(--warning) 38%, var(--border))", backgroundColor: "var(--warning-muted)" },
    error: { borderColor: "color-mix(in srgb, var(--destructive) 38%, var(--border))", backgroundColor: "var(--destructive-muted)" },
};
