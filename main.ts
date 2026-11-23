import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The One-Line Laugh — a single funny line, one sentence, 1–200 chars,
// written to /output/entry.txt. The kit grades the file content, so the
// line must stay under the 200-char limit.
const line = "My phone autocorrected 'I'm broke' to 'I'm broken' and honestly, for once, the keyboard understood the assignment.";

// Hard guard: fail loudly instead of submitting an over-long line.
if (line.length > 200) {
  throw new Error(`Entry line is ${line.length} chars, over the 200-char limit.`);
}
if (line.length < 1) {
  throw new Error("Entry line must not be empty.");
}
// The entry must be exactly one sentence: a single terminal punctuation
// mark at the very end, and no sentence-ending punctuation inside.
const terminalMarks = line.match(/[.!?]/g) ?? [];
if (terminalMarks.length !== 1 || !/[.!?]$/.test(line)) {
  throw new Error("Entry line must be exactly one sentence.");
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), line + "\n", "utf8");
console.log("Wrote entry.txt, chars:", line.length);
