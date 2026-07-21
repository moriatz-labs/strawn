import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const reviewPath = resolve(import.meta.dirname, "..", "packages", "strawn-icons", "BRAND_ICON_REVIEW.md");
const review = readFileSync(reviewPath, "utf8");

if (!/^Status: Approved$/m.test(review)) {
  console.error("Release blocked: approve packages/strawn-icons/BRAND_ICON_REVIEW.md after reviewing LinkedIn redistribution terms.");
  process.exit(1);
}

console.log("Brand icon release review is approved.");
