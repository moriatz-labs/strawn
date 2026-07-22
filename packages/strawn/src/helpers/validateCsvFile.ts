import { formatFileSize } from "./formatFileSize";

export function validateCsvFile(file: File, maxSizeBytes: number) {
  if (!file.name.toLowerCase().endsWith(".csv")) {
    return "Choose a file with a .csv extension.";
  }

  if (file.size > maxSizeBytes) {
    return `Choose a CSV smaller than ${formatFileSize(maxSizeBytes)}.`;
  }

  return null;
}
