import type { ProgressProps } from "../types/primitives";
import { FieldLabel } from "./FieldLabel";
import { Flex } from "./Flex";
import { ProgressFill } from "./ProgressFill";
import { ProgressTrack } from "./ProgressTrack";
import { Stack } from "./Stack";
import { TextStyle } from "./TextStyle";

export function Progress({ label, value = 0, max = 100, indeterminate = false, size = "md", css }: ProgressProps) {
    const boundedValue = Math.min(Math.max(value, 0), max);
    const percent = max > 0 ? Math.round((boundedValue / max) * 100) : 0;
    return (<Stack gap="$2" css={css}>
      <Flex alignItems="center" justifyContent="space-between" gap="$3">
        <FieldLabel as="span">{label}</FieldLabel>
        <TextStyle as="span" textStyle="caption" tone="muted" numeric="tabular">{indeterminate ? "Loading" : `${percent}%`}</TextStyle>
      </Flex>
      <ProgressTrack role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={max} aria-valuenow={indeterminate ? undefined : boundedValue} size={size}>
        <ProgressFill indeterminate={indeterminate} css={indeterminate ? undefined : { transform: `scaleX(${percent / 100})` }}/>
      </ProgressTrack>
    </Stack>);
}
