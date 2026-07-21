import { useState } from "react";
import { Button, Card, CardContent, CsvImportDialog, Stack, TextStyle } from "strawn";

export function CsvImportDialogPage() {
  const [fileName, setFileName] = useState<string | null>(null);
  return (
    <Stack gap="$8">
      <header className="page-heading">
        <TextStyle as="span" textStyle="eyebrow" tone="accent">Component</TextStyle>
        <TextStyle as="h1" textStyle="headingLg">CSV Import Dialog</TextStyle>
        <TextStyle as="p" textStyle="bodyLg" tone="muted">A focused upload dialog with click, keyboard, and drag-and-drop support.</TextStyle>
      </header>
      <Card>
        <CardContent className="playground">
          <CsvImportDialog
            trigger={<Button>Import CSV</Button>}
            onFileSelect={(file) => setFileName(file.name)}
          />
          <TextStyle as="p" tone="muted" aria-live="polite">
            {fileName ? `Selected ${fileName}` : "Choose the trigger to inspect the dialog."}
          </TextStyle>
        </CardContent>
      </Card>
      <pre className="code-block"><code>{`import { Button, CsvImportDialog } from "strawn";\n\n<CsvImportDialog\n  trigger={<Button>Import CSV</Button>}\n  onFileSelect={handleFile}\n/>`}</code></pre>
    </Stack>
  );
}
