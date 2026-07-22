import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Button, CsvImportDialog, ThemeProvider } from "strawn";

function renderDialog(dialog: React.ReactNode) {
  return render(<ThemeProvider>{dialog}</ThemeProvider>);
}

describe("CsvImportDialog", () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("opens with a visible header and focuses the compact drop zone", async () => {
    const user = userEvent.setup();
    const inputClick = vi.spyOn(HTMLInputElement.prototype, "click");
    renderDialog(
      <CsvImportDialog trigger={<Button>Import records</Button>} onFileSelect={() => undefined} />,
    );

    await user.click(screen.getByRole("button", { name: "Import records" }));
    expect(screen.getByRole("heading", { level: 2, name: "Import CSV" })).toBeTruthy();
    expect(screen.getByText("Choose a CSV file to continue.")).toBeTruthy();

    const dropZone = screen.getByRole("button", { name: "Choose CSV file" });
    expect(document.activeElement).toBe(dropZone);
    expect(dropZone.textContent).toContain("Drop a CSV or click to browse");

    await user.click(dropZone);
    expect(inputClick).toHaveBeenCalledOnce();
    expect(document.activeElement).not.toBe(screen.getByRole("button", { name: "Close import dialog" }));
    expect(screen.queryByText("Download template")).toBeNull();
    expect(screen.queryByText(/Up to 1 MB/)).toBeNull();
  });

  it("rejects files that are not CSVs with a text error", () => {
    renderDialog(
      <CsvImportDialog defaultOpen trigger={<Button>Open</Button>} onFileSelect={() => undefined} />,
    );

    const input = screen.getByLabelText("Choose CSV file", { selector: "input" }) as HTMLInputElement;
    fireEvent.change(input, { target: { files: [new File(["not csv"], "records.txt", { type: "text/plain" })] } });

    expect(screen.getByRole("alert").textContent).toContain(".csv extension");
    expect(screen.getByRole("dialog", { name: "Import CSV" })).toBeTruthy();
  });

  it("hands off a valid file and closes immediately", async () => {
    const user = userEvent.setup();
    const onFileSelect = vi.fn().mockResolvedValue(undefined);
    renderDialog(
      <CsvImportDialog defaultOpen trigger={<Button>Open</Button>} onFileSelect={onFileSelect} />,
    );

    const file = new File(["name,birthday\nAda,1815-12-10"], "records.csv", { type: "text/csv" });
    await user.upload(screen.getByLabelText("Choose CSV file", { selector: "input" }), file);

    expect(onFileSelect).toHaveBeenCalledWith(file);
    await waitFor(() => expect(screen.queryByRole("dialog", { name: "Import CSV" })).toBeNull());
  });

  it("keeps the dialog open and surfaces consumer rejection", async () => {
    const user = userEvent.setup();
    renderDialog(
      <CsvImportDialog
        defaultOpen
        trigger={<Button>Open</Button>}
        onFileSelect={() => Promise.reject(new Error("This CSV could not be parsed."))}
      />,
    );

    const file = new File(["invalid"], "records.csv", { type: "text/csv" });
    await user.upload(screen.getByLabelText("Choose CSV file", { selector: "input" }), file);

    await waitFor(() => expect(screen.getByRole("alert").textContent).toContain("This CSV could not be parsed."));
    expect(screen.getByRole("dialog", { name: "Import CSV" })).toBeTruthy();
    expect((screen.getByRole("button", { name: "Choose CSV file" }) as HTMLButtonElement).disabled).toBe(false);
  });

  it("supports dropping a valid file", async () => {
    const onFileSelect = vi.fn().mockResolvedValue(undefined);
    renderDialog(
      <CsvImportDialog defaultOpen trigger={<Button>Open</Button>} onFileSelect={onFileSelect} />,
    );

    const file = new File(["name\nAda"], "records.csv", { type: "text/csv" });
    fireEvent.drop(screen.getByRole("button", { name: "Choose CSV file" }), {
      dataTransfer: { files: [file] },
    });

    await waitFor(() => expect(onFileSelect).toHaveBeenCalledWith(file));
  });

  it("has no serious or critical accessibility violations", async () => {
    renderDialog(
      <main>
        <CsvImportDialog defaultOpen trigger={<Button>Open</Button>} onFileSelect={() => undefined} />
      </main>,
    );

    const results = await axe.run(document.body);
    expect(results.violations.filter((violation) => violation.impact === "serious" || violation.impact === "critical")).toEqual([]);
  });
});
