import type { TextFieldProps } from "../types/primitives";
import { BareInput } from "./BareInput";
import { ControlFrame } from "./ControlFrame";
import { FieldDescription } from "./FieldDescription";
import { FieldError } from "./FieldError";
import { FieldLabel } from "./FieldLabel";
import { FieldRoot } from "./FieldRoot";
import { describedBy } from "../helpers/describedBy";
import { useFieldIds } from "../helpers/useFieldIds";

export function TextField({ id, label, description, error, disabled, required, css, ...props }: TextFieldProps) {
    const { inputId, descriptionId, errorId } = useFieldIds(id);
    const hasError = Boolean(error);
    const hasDescription = Boolean(description);
    return (<FieldRoot css={css}>
      <FieldLabel htmlFor={inputId}>
        {label}
        {required ? " *" : null}
      </FieldLabel>
      <ControlFrame invalid={hasError} aria-disabled={disabled}>
        <BareInput id={inputId} disabled={disabled} required={required} aria-invalid={hasError || undefined} aria-describedby={describedBy(descriptionId, errorId, hasDescription, hasError)} {...props}/>
      </ControlFrame>
      {description ? <FieldDescription id={descriptionId}>{description}</FieldDescription> : null}
      {error ? <FieldError id={errorId} role="alert">{error}</FieldError> : null}
    </FieldRoot>);
}
