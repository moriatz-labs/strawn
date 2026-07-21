

export function describedBy(descriptionId: string, errorId: string, hasDescription: boolean, hasError: boolean) {
    return [hasDescription ? descriptionId : null, hasError ? errorId : null].filter(Boolean).join(" ") || undefined;
}
