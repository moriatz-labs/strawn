import { useRef, useState, type ChangeEvent, type DragEvent } from "react";
import { CircleAlertIcon, DownloadIcon } from "strawn-icons";
import type { CsvImportDialogProps } from "../types/CsvImportDialogProps";
import { validateCsvFile } from "../helpers/validateCsvFile";
import { Alert } from "./Alert";
import { CsvImportDropZone } from "./CsvImportDropZone";
import { Dialog } from "./Dialog";
import { Stack } from "./Stack";
import { TextStyle } from "./TextStyle";

const defaultMaxSizeBytes = 1024 * 1024;

export function CsvImportDialog({
  trigger,
  title = "Import CSV",
  description = "Choose a CSV file to continue.",
  chooseFileLabel = "Choose CSV file",
  closeLabel = "Close import dialog",
  accept = ".csv,text/csv,application/vnd.ms-excel",
  maxSizeBytes = defaultMaxSizeBytes,
  open,
  defaultOpen,
  onOpenChange,
  onFileSelect,
  css,
}: CsvImportDialogProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLButtonElement>(null);
  const [internalOpen, setInternalOpen] = useState(defaultOpen ?? false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);
  const dialogOpen = open ?? internalOpen;

  const reset = () => {
    setError(null);
    setIsDragging(false);
    setIsSelecting(false);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (open === undefined) setInternalOpen(nextOpen);
    if (!nextOpen) reset();
    onOpenChange?.(nextOpen);
  };

  const selectFile = async (file: File) => {
    const validationError = validateCsvFile(file, maxSizeBytes);
    setError(validationError);
    if (validationError) return;

    setIsSelecting(true);
    try {
      await onFileSelect(file);
      handleOpenChange(false);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "We couldn't use this file. Try again.");
      setIsSelecting(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) void selectFile(file);
  };

  const handleDrop = (event: DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    if (file) void selectFile(file);
  };

  return (
    <Dialog
      trigger={trigger}
      title={title}
      description={description}
      initialFocusRef={dropZoneRef}
      open={dialogOpen}
      onOpenChange={handleOpenChange}
      closeLabel={closeLabel}
      css={{ maxWidth: "32rem", ...css }}
    >
      <Stack gap="$4">
        <input
          ref={inputRef}
          aria-label={chooseFileLabel}
          accept={accept}
          onChange={handleInputChange}
          tabIndex={-1}
          type="file"
          style={{ display: "none" }}
        />
        <CsvImportDropZone
          ref={dropZoneRef}
          aria-label={chooseFileLabel}
          data-dragging={isDragging || undefined}
          disabled={isSelecting}
          onClick={() => inputRef.current?.click()}
          onDragEnter={(event) => {
            event.preventDefault();
            setIsDragging(true);
          }}
          onDragOver={(event) => event.preventDefault()}
          onDragLeave={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setIsDragging(false);
          }}
          onDrop={handleDrop}
          type="button"
        >
          <DownloadIcon aria-hidden="true" size={30} style={{ transform: "translateY(-2px)" }} />
          <TextStyle as="span" emphasis="regular" textStyle="bodyLg" tone="muted">
            Drop a CSV or click to browse
          </TextStyle>
        </CsvImportDropZone>
        {error ? (
          <Alert tone="error" icon={<CircleAlertIcon aria-hidden="true" size={18} />}>
            {error}
          </Alert>
        ) : null}
      </Stack>
    </Dialog>
  );
}
