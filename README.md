# Strawn

Strawn is Moriatz Labs’ original variable typeface and the shared typographic voice across Moriatz products. Its letters are constructed from tapered vectors inspired by toothpicks: pointed at both ends, dense through the middle, and recognisable from interface labels to oversized headlines.

[View the Strawn specimen](https://strawn.moriatz.com/font)

## Version 0.7

- Variable weight axis: `100–700`
- Default: `500 Dense`
- Named weights: Fine, Signature, Dense, and Structural
- Interoperability aliases: Regular at 400 and Bold at 700
- Coverage: GF Latin Core, 319 encoded characters
- Features: kerning, mark positioning, mark-to-mark positioning, and canonical composition
- Formats: variable WOFF2, variable TTF, and four overlap-free static TTFs
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

The public specimen is served from `/font`. Production is verified and deployed to [strawn.moriatz.com/font](https://strawn.moriatz.com/font) through GitHub Actions.
