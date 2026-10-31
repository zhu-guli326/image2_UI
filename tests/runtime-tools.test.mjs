import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { buildClaudeCodeArgs, buildCodexArgs, createLegacyToolRegistry, resolveAgentProvider } from "../runtime/tools/legacy-cli.mjs";
import { ToolRegistry } from "../runtime/tools/registry.mjs";

test("ToolRegistry provides stable metadata and rejects duplicate names", async () => {
  let context;
  const registry = new ToolRegistry().register({
    name: "test.echo",
    version: "7",
    timeoutMs: 42,
    async invoke(input, ctx) {
      context = ctx;
      return { ok: true, data: input };
    },
  });

  assert.deepEqual(await registry.invoke("test.echo", { value: 1 }), { ok: true, data: { value: 1 } });
  assert.deepEqual(context.tool, { name: "test.echo", version: "7" });
  assert.equal(context.timeoutMs, 42);
  assert.deepEqual(await registry.probe("test.echo"), { available: true });
  assert.throws(() => registry.register({ name: "test.echo", invoke() {} }), /already registered/);
});

test("legacy Agent arguments support non-Git output directories", () => {
  const args = buildCodexArgs({ target: "output", prompt: "build", access: "write" }, "test-model");
  assert.ok(args.includes("--skip-git-repo-check"));
  assert.deepEqual(args.slice(args.indexOf("--ask-for-approval"), args.indexOf("--ask-for-approval") + 2), ["--ask-for-approval", "never"]);
  assert.ok(args.includes("workspace-write"));
  assert.ok(args.includes("test-model"));
});

test("missing legacy Agent commands are classified as recoverable capabilities", async () => {
  const tools = createLegacyToolRegistry({ agentCommand: "definitely-not-a-real-image2-ui-command" });
  await assert.rejects(
    tools.invoke("agent.execute", { target: process.cwd(), prompt: "test", access: "write" }),
    (error) => error.code === "capability-unavailable" && error.blocked === true,
  );
});

test("agent provider resolves from flag, env-style value, or command name", () => {
  assert.equal(resolveAgentProvider({}), "codex");
  assert.equal(resolveAgentProvider({ agent: "claude-code" }), "claude-code");
  assert.equal(resolveAgentProvider({ agentCommand: "/usr/local/bin/claude" }), "claude-code");
  assert.equal(resolveAgentProvider({ agentCommand: "codex" }), "codex");
  assert.throws(() => resolveAgentProvider({ agent: "unknown-agent" }), /Unknown agent provider/);
});

test("Claude Code arguments keep the prompt before variadic tool flags", () => {
  const write = buildClaudeCodeArgs({ target: "output", prompt: "build", access: "write" }, "test-model", {});
  assert.deepEqual(write.slice(0, 2), ["-p", "build"]);
  assert.ok(write.includes("--no-session-persistence"));
  assert.equal(write[write.indexOf("--permission-mode") + 1], "acceptEdits");
  assert.equal(write[write.indexOf("--output-format") + 1], "json");
  assert.ok(write.includes("test-model"));
  assert.ok(!write.includes("--allowedTools"));

  const read = buildClaudeCodeArgs({ target: "output", prompt: "review", access: "read" }, null, {});
  assert.equal(read[read.indexOf("--permission-mode") + 1], "dontAsk");
  assert.equal(read[read.indexOf("--allowedTools") + 1], "Read,Grep,Glob");

  const custom = buildClaudeCodeArgs({ prompt: "x", access: "write" }, null, {
    IMAGE2_CLAUDE_PERMISSION_MODE: "auto",
    IMAGE2_CLAUDE_ALLOWED_TOOLS: "Bash(npm run build)",
  });
  assert.equal(custom[custom.indexOf("--permission-mode") + 1], "auto");
  assert.equal(custom[custom.indexOf("--allowedTools") + 1], "Bash(npm run build)");
});

test("Claude Code agent writes its final message to the scheduler handoff file", { skip: process.platform === "win32" }, async () => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "image2-claude-agent-"));
  const fake = path.join(dir, "claude");
  const payload = { type: "result", is_error: false, result: "## Agent Handoff\n- Status: complete" };
  await fs.writeFile(fake, `#!${process.execPath}\nprocess.stdout.write(${JSON.stringify(JSON.stringify(payload))});\n`, { mode: 0o755 });
  const outputFile = path.join(dir, "roles", "qa", "final-message.md");
  const tools = createLegacyToolRegistry({ agentCommand: fake });
  const result = await tools.invoke("agent.execute", { target: dir, prompt: "test", access: "write", outputFile });
  assert.equal(result.ok, true);
  assert.equal(await fs.readFile(outputFile, "utf8"), "## Agent Handoff\n- Status: complete");
});
