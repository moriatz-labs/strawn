import { useEffect, type ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it } from "vitest";
import {
  Accordion,
  Alert,
  AspectRatio,
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  CheckboxGroup,
  Container,
  Dialog,
  Drawer,
  DropdownMenu,
  Flex,
  FormField,
  Grid,
  Heading,
  IconButton,
  Kbd,
  Popover,
  Progress,
  ScrollArea,
  SearchField,
  SegmentedControl,
  Select,
  Separator,
  Skeleton,
  Slider,
  Stack,
  StatusDot,
  StatusLabel,
  Surface,
  Switch,
  Tabs,
  Text,
  Textarea,
  TextField,
  TextStyle,
  ThemeProvider,
  ToastProvider,
  Toolbar,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  VisuallyHidden,
  useToast,
} from "strawn";

function renderSystem(children: ReactNode) {
  return render(<ThemeProvider>{children}</ThemeProvider>);
}

function seriousViolations(container: Element) {
  return axe.run(container).then((results) =>
    results.violations.filter((violation) => violation.impact === "serious" || violation.impact === "critical"),
  );
}

describe("retained component catalog", () => {
  it("renders every non-overlay component without serious accessibility violations", async () => {
    const { container } = renderSystem(
      <main>
        <Container>
          <Stack gap="$4">
            <Surface>
              <Flex gap="$2"><Box>Box</Box><Text>Text</Text></Flex>
              <Grid columns="1fr 1fr"><TextStyle textStyle="label">Label</TextStyle><Heading>Heading</Heading></Grid>
              <AspectRatio ratio={16 / 9}><Box>Ratio</Box></AspectRatio>
              <ScrollArea css={{ maxHeight: "8rem" }}><Text>Scrollable content</Text></ScrollArea>
              <Separator />
              <Toolbar><Button>Save</Button><IconButton label="Settings" icon={<span aria-hidden="true">S</span>} /></Toolbar>
              <Kbd>⌘K</Kbd><VisuallyHidden>Hidden context</VisuallyHidden>
              <StatusDot label="Online" /><StatusLabel label="Ready" />
            </Surface>
            <TextField label="Name" />
            <Textarea label="Notes" />
            <SearchField label="Search" />
            <Select label="Role" defaultValue="reader" options={[{ label: "Reader", value: "reader" }]} />
            <CheckboxGroup label="Topics" value={[]} onValueChange={() => undefined} options={[{ label: "Design", value: "design" }]} />
            <Switch label="Notifications" />
            <Slider label="Volume" defaultValue={[50]} />
            <SegmentedControl label="View" value="list" onValueChange={() => undefined} options={[{ label: "List", value: "list" }, { label: "Grid", value: "grid" }]} />
            <FormField label="Reference" description="A public identifier">
              {({ id, describedBy, invalid, required }) => <input id={id} aria-describedby={describedBy} aria-invalid={invalid} required={required} />}
            </FormField>
            <Accordion defaultValue="details" items={[{ title: "Details", value: "details", content: "Accordion content" }]} />
            <Tabs defaultValue="overview" items={[{ label: "Overview", value: "overview", content: "Tab content" }]} />
            <Card>
              <CardMedia><img alt="Abstract study" src="/study.png" /></CardMedia>
              <CardHeader>Card header</CardHeader><CardContent>Card content</CardContent><CardActions><Button>Open</Button></CardActions>
            </Card>
            <Avatar name="Moriatz Labs" />
            <Badge onRemove={() => undefined}>Beta</Badge>
            <Alert title="Notice" action={<Button>Review</Button>}>Alert content</Alert>
            <Progress label="Import progress" value={40} />
            <Skeleton />
          </Stack>
        </Container>
      </main>,
    );

    expect(await seriousViolations(container)).toEqual([]);
  });

  it("covers dialog, drawer, popover, and menu overlays", async () => {
    const user = userEvent.setup();

    const dialog = renderSystem(<Dialog trigger={<Button>Open dialog</Button>} title="Dialog title" defaultOpen>Dialog body</Dialog>);
    expect(await seriousViolations(document.body)).toEqual([]);
    dialog.unmount();

    const drawer = renderSystem(<Drawer trigger={<Button>Open drawer</Button>} title="Drawer title">Drawer body</Drawer>);
    await user.click(screen.getByRole("button", { name: "Open drawer" }));
    expect(await seriousViolations(document.body)).toEqual([]);
    drawer.unmount();

    const popover = renderSystem(<Popover trigger={<Button>Open popover</Button>} label="Actions" defaultOpen>Popover body</Popover>);
    expect(await seriousViolations(document.body)).toEqual([]);
    popover.unmount();

    const menu = renderSystem(<DropdownMenu trigger={<Button>Open menu</Button>} label="Actions" items={[{ label: "Rename" }]} />);
    await user.click(screen.getByRole("button", { name: "Open menu" }));
    expect(await seriousViolations(document.body)).toEqual([]);
    menu.unmount();
  });

  it("covers tooltip and toast providers", async () => {
    const tooltip = renderSystem(
      <TooltipProvider>
        <Tooltip defaultOpen>
          <TooltipTrigger asChild><Button>Tooltip trigger</Button></TooltipTrigger>
          <TooltipContent>Helpful context</TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    );
    expect(await seriousViolations(document.body)).toEqual([]);
    tooltip.unmount();

    function ToastEmitter() {
      const { showToast } = useToast();
      useEffect(() => {
        showToast({ title: "Saved", description: "Your changes are ready.", variant: "success" });
      }, [showToast]);
      return null;
    }

    renderSystem(<ToastProvider><ToastEmitter /></ToastProvider>);
    expect(await screen.findByText("Saved")).toBeTruthy();
    expect(await seriousViolations(document.body)).toEqual([]);
  });
});
