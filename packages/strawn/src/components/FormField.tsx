import type { FormFieldProps } from "../types/primitives";
import { FieldDescription } from "./FieldDescription";
import { FieldError } from "./FieldError";
import { FieldLabel } from "./FieldLabel";
import { FieldRoot } from "./FieldRoot";
import { describedBy } from "../helpers/describedBy";
import { useFieldIds } from "../helpers/useFieldIds";

export function FormField({ id, label, description, error, required, children, css }: FormFieldProps) {
    const { inputId, descriptionId, errorId } = useFieldIds(id);
    const hasDescription = Boolean(description);
    const hasError = Boolean(error);
    return (<FieldRoot css={css}>
      <FieldLabel htmlFor={inputId}>{label}{required ? " *" : null}</FieldLabel>
      {children({
            id: inputId,
            describedBy: describedBy(descriptionId, errorId, hasDescription, hasError),
            invalid: hasError || undefined,
            required,
        })}
      {description ? <FieldDescription id={descriptionId}>{description}</FieldDescription> : null}
      {error ? <FieldError id={errorId} role="alert">{error}</FieldError> : null}
    </FieldRoot>);
}
