import type { CSS } from "../stitches";
import { Box } from "./Box";
import { VisuallyHidden } from "./VisuallyHidden";

type StatusDotProps = {
  label: string;
  tone?: "neutral" | "info" | "success" | "warning" | "error";
  css?: CSS;
};

const statusColors = {
  neutral: "var(--muted-foreground)",
  info: "var(--info)",
  success: "var(--success)",
  warning: "var(--warning)",
  error: "var(--destructive)",
} as const;

export function StatusDot({ label, tone = "neutral", css }: StatusDotProps) {
  return (
    <Box as="span" css={{ alignItems: "center", display: "inline-flex", ...css }}>
      <Box
        aria-hidden="true"
        as="span"
        css={{
          backgroundColor: statusColors[tone],
          border: "2px solid var(--surface)",
          borderRadius: "$pill",
          boxShadow: `0 0 0 1px color-mix(in srgb, ${statusColors[tone]} 28%, transparent)`,
          height: "$3",
          width: "$3",
        }}
      />
      <VisuallyHidden>{label}</VisuallyHidden>
    </Box>
  );
}
