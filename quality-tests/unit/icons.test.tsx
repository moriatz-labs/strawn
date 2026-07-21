import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CopyIcon, type IconProps } from "strawn-icons";
import { iconCatalog } from "../../packages/strawn-icons/src/catalog";

describe("strawn-icons", () => {
  it("renders every export as a decorative current-color SVG", () => {
    expect(iconCatalog).toHaveLength(120);
    for (const { icon: Icon } of iconCatalog) {
      const { container, unmount } = render(<Icon />);
      const svg = container.querySelector("svg");
      expect(svg).not.toBeNull();
      expect(svg?.getAttribute("viewBox")).toBe("0 0 24 24");
      expect(svg?.getAttribute("width")).toBe("24");
      expect(svg?.getAttribute("height")).toBe("24");
      expect(svg?.getAttribute("aria-hidden")).toBe("true");
      expect(svg?.getAttribute("focusable")).toBe("false");
      expect(svg?.getAttribute("stroke") === "currentColor" || svg?.getAttribute("fill") === "currentColor").toBe(true);
      unmount();
    }
  });

  it("forwards sizing, color, SVG attributes, refs, and accessible titles", () => {
    const ref = createRef<SVGSVGElement>();
    const props: IconProps = { size: 18, color: "rebeccapurple", title: "Copy document", "data-testid": "icon" };
    render(<CopyIcon ref={ref} {...props} />);

    const icon = screen.getByRole("img", { name: "Copy document" });
    expect(icon.getAttribute("width")).toBe("18");
    expect(icon.getAttribute("height")).toBe("18");
    expect(icon.getAttribute("stroke")).toBe("rebeccapurple");
    expect(icon.getAttribute("aria-hidden")).toBeNull();
    expect(icon.getAttribute("data-testid")).toBe("icon");
    expect(ref.current).toBe(icon);
  });
});
