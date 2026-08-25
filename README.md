# Strawn

Strawn is Moriatz's original variable typeface. This repository contains the font and its public specimen.

Every character is constructed from tapered geometric strokes inspired by toothpicks: pointed at the ends, dense through the middle, and recognizable at both interface and display sizes.

Strawn is the shared typographic voice across Moriatz products. It is used for navigation, controls, body copy, data, and large brand moments so every product speaks with the same visual rhythm.

[View the Strawn specimen](https://strawn.moriatz.com/font)

## Font

- Variable weight axis: `100–700`
- Default weight: `500 Dense`
- Formats: variable WOFF2, variable TTF, and Regular TTF
- Coverage: Basic Latin, numerals, and display punctuation
- License: SIL Open Font License 1.1

```css
@font-face {
  font-family: "Strawn";
  src: url("./Strawn-Variable.woff2") format("woff2-variations");
  font-display: swap;
  font-style: normal;
  font-weight: 100 700;
}
```

## Website development

```sh
bun install
bun run docs:dev
bun run quality
```

The public specimen is served from `/font`. Production releases are verified and deployed to [strawn.moriatz.com/font](https://strawn.moriatz.com/font) through GitHub Actions.
