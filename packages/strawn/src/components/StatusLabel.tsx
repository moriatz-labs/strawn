import type { CSS } from "../stitches";
import { Box } from "./Box";
import { Spinner } from "./Spinner";
import { TextStyle } from "./TextStyle";

type StatusLabelProps = {
  label: string;
  tone?: "neutral" | "info" | "success" | "warning" | "error";
  loading?: boolean;
  css?: CSS;
};

const statusColors = {
  neutral: "var(--muted-foreground)",
  info: "var(--info)",
  success: "var(--success)",
  warning: "var(--warning)",
  error: "var(--destructive)",
} as const;

export function StatusLabel({ label, tone = "neutral", loading = false, css }: StatusLabelProps) {
  const color = statusColors[tone];

  return (
    <Box aria-busy={loading || undefined} as="span" css={{ alignItems: "center", color: "$foreground", display: "inline-flex", gap: "$2", minWidth: 0, ...css }}>
      {loading ? (
        <Box
          aria-hidden="true"
          as="span"
          data-status-spinner=""
          data-tone={tone}
          css={{ color, display: "inline-flex", flexShrink: 0, transform: "translateY(-1px)" }}
        >
          <Spinner css={{ borderWidth: "1.5px", height: "0.625rem", width: "0.625rem" }} />
        </Box>
      ) : (
        <Box
          aria-hidden="true"
          as="span"
          data-status-dot=""
          data-tone={tone}
          css={{
            aspectRatio: "1 / 1",
            backgroundColor: color,
            borderRadius: "50%",
            flexShrink: 0,
            height: "0.625rem",
            transform: "translateY(-1px)",
            width: "0.625rem",
          }}
        />
      )}
      <TextStyle as="span" textStyle="caption" emphasis="medium" css={{ color: "inherit" }}>
        {label}
      </TextStyle>
    </Box>
  );
}
