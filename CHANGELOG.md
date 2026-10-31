# Changelog

## 0.2.0

- Slimmed `SKILL.md` from ~590 to ~360 lines: component-library naming and candidates, Figma connection rules, and the brand-aware workflow moved to `references/component-library-options.md`, `references/figma-delivery.md`, and `references/brand-aware-workflow.md`. The question flow and OnDesign guidance are unchanged.
- Rewrote the English sections of `SKILL.md` in Chinese so the skill has one primary language; removed the "group related choices into one form" rule that contradicted one-question-at-a-time asking.
- Indexed every reference document in `SKILL.md` with when to read it; nine references were previously never linked.
- Added `references/host-adapters.md`: Codex / Claude Code capability mapping, Claude Code install paths, and a manual render-and-compare verification path when the `image2-ui` CLI is unavailable.
- Added `--agent claude-code` (or `IMAGE2_AGENT=claude-code`) so the Runtime can drive implementation and fix work through `claude -p`; Codex remains the default.
- Fixed `agents/openai.yaml` default prompt to offer the three workflow modes instead of generic coding intents.
- Replaced the Windows-only `validate.ps1` (which also required a missing `hero.png`) with cross-platform `npm run validate`; CI uses it.
- Renamed `scripts/ui_harness_guard_v2.mjs` to `scripts/ui_harness_guard_suite.mjs` to reflect that it combines the base guard with the other guards.
- Removed the committed `.npm-cache-check/` npm cache and ignored it.

- Replaced the README demo set with four cases from the ONDesign style library (FuFu Bakery, Plate Play, Today, FitHub) and pointed the gallery links at ondesign.tech.
- Moved the gallery pages, catalog, demos, screenshots, and media to the standalone `ui_case` repository.
- Reduced the npm package to the installable Skill, CLI tooling, references, and README artwork.
- Added a full-repository demo validation command and documented visual warning baseline.
- Added an executable multi-agent orchestrator with dependency-aware parallel phases, isolated handoff artifacts, JSONL logs, and sequential fallback mode.
- Added a dedicated analysis-only code-reviewer phase before accessibility and QA.
- Added persisted workflow and role state machines, transition history, atomic manifests, and the `image2-ui state` inspector.
- Added the durable UI Harness Runtime with `run`, `resume`, and `inspect`, bounded Verify/Fix execution, crash reconciliation, and a stable Tool Registry.
- Added contributor, licensing, package metadata, and release automation documentation.

## 0.1.0

- Added the image-to-UI skill, repeatable image2 asset wrapper, output audit, compare, and loop commands.
- Added bundled clickable demos, case-study references, and production quality gates.
