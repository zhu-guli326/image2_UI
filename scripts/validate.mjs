#!/usr/bin/env node
// Cross-platform release gate: required files, tests, npm package contents,
// and Python syntax. Replaces the former Windows-only validate.ps1.

import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const isWindows = process.platform === "win32";

function fail(message) {
  console.error(`Skill validation failed: ${message}`);
  process.exit(1);
}

function run(command, args, options = {}) {
  const result = spawnSync(command, args, { cwd: root, stdio: "inherit", shell: isWindows, ...options });
  if (result.error) return { ok: false, missing: result.error.code === "ENOENT" };
  return { ok: result.status === 0, missing: false };
}

// Every path listed in package.json "files" must exist, plus SKILL.md links.
const pkg = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
const required = new Set(["package.json", ...pkg.files]);
const skill = fs.readFileSync(path.join(root, "SKILL.md"), "utf8");
for (const match of skill.matchAll(/\]\((references\/[^)#\s]+)\)/g)) required.add(match[1]);
for (const entry of required) {
  if (!fs.existsSync(path.join(root, entry))) fail(`missing required file: ${entry}`);
}

if (!run(process.execPath, ["--test"]).ok) fail("node --test failed");
if (!run(isWindows ? "npm.cmd" : "npm", ["pack", "--dry-run"]).ok) fail("npm pack --dry-run failed");

const pycache = fs.mkdtempSync(path.join(os.tmpdir(), "image2-ui-pycache-"));
try {
  const env = { ...process.env, PYTHONPYCACHEPREFIX: pycache };
  const candidates = process.env.PYTHON
    ? [[process.env.PYTHON, []]]
    : [["python3", []], ["python", []], ["py", ["-3"]]];
  let compiled = false;
  for (const [command, prefix] of candidates) {
    const result = run(command, [...prefix, "-m", "py_compile", "scripts/image2_asset.py"], { env });
    if (result.missing) continue;
    if (!result.ok) fail(`Python syntax validation failed (${command})`);
    compiled = true;
    break;
  }
  if (!compiled) fail("Python 3.10 or newer is required");
} finally {
  fs.rmSync(pycache, { recursive: true, force: true });
}

console.log("Skill validation passed.");
