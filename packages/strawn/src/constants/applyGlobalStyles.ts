import { globalCss } from "../stitches";
import { defaultThemeVariables } from "../theme";

export const applyGlobalStyles = globalCss({
  ":root": defaultThemeVariables,
  "@keyframes strawn-spin": {
    to: { transform: "rotate(360deg)" },
  },
  "@keyframes strawn-progress": {
    "0%": { transform: "translateX(-100%) scaleX(0.35)" },
    "50%": { transform: "translateX(90%) scaleX(0.35)" },
    "100%": { transform: "translateX(260%) scaleX(0.35)" },
  },
  "@keyframes strawn-skeleton": {
    "100%": { transform: "translateX(100%)" },
  },
  "*": {
    boxSizing: "border-box",
    borderColor: "$border",
  },
  "html, body, #root": {
    minHeight: "100%",
  },
  html: {
    scrollBehavior: "smooth",
    colorScheme: "light dark",
    scrollPaddingTop: "$4",
  },
  body: {
    margin: 0,
    backgroundColor: "$background",
    color: "$foreground",
    fontFamily: "$ui",
    fontSize: "$md",
    lineHeight: "$base",
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
  },
  "h1, h2, h3, h4, h5, h6, p": { margin: 0 },
  "h1, h2, h3, h4, h5, h6": { textWrap: "balance" },
  "p, li, figcaption, blockquote": { textWrap: "pretty" },
  "code, kbd, pre, samp": { fontFamily: "$mono" },
  a: { color: "inherit" },
  "button, input, textarea, select": { font: "inherit" },
  "img, svg, video, canvas, audio, iframe, embed, object": { display: "block" },
  img: {
    outline: "1px solid var(--effect-image-outline)",
    outlineOffset: "-1px",
  },
  ":target, :focus": {
    scrollMarginTop: "$4",
    scrollMarginBottom: "$16",
  },
  ":focus-visible": {
    outline: "2px solid $ring",
    outlineOffset: "2px",
  },
  "::selection": {
    backgroundColor: "$primary",
    color: "$primaryForeground",
  },
  "[data-motion-preference='none'] *, [data-motion-preference='none'] *::before, [data-motion-preference='none'] *::after": {
    animationDuration: "0.01ms !important",
    animationIterationCount: "1 !important",
    scrollBehavior: "auto !important",
    transitionDuration: "0.01ms !important",
  },
  "[data-motion-preference='reduced'] *, [data-motion-preference='reduced'] *::before, [data-motion-preference='reduced'] *::after": {
    animationDuration: "0.01ms !important",
    animationIterationCount: "1 !important",
    scrollBehavior: "auto !important",
    transitionDuration: "80ms !important",
  },
  "@media (prefers-reduced-motion: reduce)": {
    html: { scrollBehavior: "auto" },
    "[data-motion-preference='system'] *, [data-motion-preference='system'] *::before, [data-motion-preference='system'] *::after": {
      animationDuration: "0.01ms !important",
      animationIterationCount: "1 !important",
      scrollBehavior: "auto !important",
      transitionDuration: "0.01ms !important",
    },
  },
  "@media (forced-colors: active)": {
    ":focus-visible": { outlineColor: "Highlight" },
    "button, input, select, textarea": { forcedColorAdjust: "auto" },
  },
});
