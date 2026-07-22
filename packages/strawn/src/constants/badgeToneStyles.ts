import type { BadgeTone } from "../types/primitives";

export const badgeToneStyles: Record<BadgeTone, {
    backgroundColor: string;
    backgroundImage: string;
    borderColor: string;
    color: string;
}> = {
    neutral: { backgroundColor: "var(--muted)", backgroundImage: "none", borderColor: "var(--border)", color: "var(--foreground)" },
    info: { backgroundColor: "var(--info-muted)", backgroundImage: "none", borderColor: "color-mix(in srgb, var(--info) 22%, var(--border))", color: "var(--info-muted-foreground)" },
    success: { backgroundColor: "var(--success-muted)", backgroundImage: "none", borderColor: "color-mix(in srgb, var(--success) 22%, var(--border))", color: "var(--success-muted-foreground)" },
    warning: { backgroundColor: "var(--warning-muted)", backgroundImage: "none", borderColor: "color-mix(in srgb, var(--warning) 22%, var(--border))", color: "var(--warning-muted-foreground)" },
    error: { backgroundColor: "var(--destructive-muted)", backgroundImage: "none", borderColor: "color-mix(in srgb, var(--destructive) 22%, var(--border))", color: "var(--destructive-muted-foreground)" },
};
