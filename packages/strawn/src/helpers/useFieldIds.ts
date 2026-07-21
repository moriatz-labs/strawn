import { useId } from "react";

export function useFieldIds(id: string | undefined) {
    const fallbackId = useId();
    const inputId = id ?? fallbackId;
    return {
        inputId,
        descriptionId: `${inputId}-description`,
        errorId: `${inputId}-error`,
    };
}
