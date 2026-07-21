import type { TextareaProps } from "../types/primitives";
import { describedBy } from "../helpers/describedBy";
import { useFieldIds } from "../helpers/useFieldIds";
import { BareTextarea } from "./BareTextarea";
import { ControlFrame } from "./ControlFrame";
import { FieldDescription } from "./FieldDescription";
import { FieldError } from "./FieldError";
import { FieldLabel } from "./FieldLabel";
import { FieldRoot } from "./FieldRoot";

export function Textarea({ id, label, hideLabel = false, description, error, disabled, required, css, ...props }: TextareaProps) {
  const { inputId, descriptionId, errorId } = useFieldIds(id);
  const hasError = Boolean(error);
  const hasDescription = Boolean(description);
  return (
    <FieldRoot css={css}>
      <FieldLabel htmlFor={inputId} css={hideLabel ? { border: 0, clip: "rect(0 0 0 0)", height: "1px", margin: "-1px", overflow: "hidden", padding: 0, position: "absolute", whiteSpace: "nowrap", width: "1px" } : undefined}>{label}{required ? " *" : null}</FieldLabel>
      <ControlFrame invalid={hasError} aria-disabled={disabled} css={{ alignItems: "flex-start" }}>
        <BareTextarea
          id={inputId}
          disabled={disabled}
          required={required}
          aria-invalid={hasError || undefined}
          aria-describedby={describedBy(descriptionId, errorId, hasDescription, hasError)}
          {...props}
        />
      </ControlFrame>
      {description ? <FieldDescription id={descriptionId}>{description}</FieldDescription> : null}
      {error ? <FieldError id={errorId} role="alert">{error}</FieldError> : null}
    </FieldRoot>
  );
}
