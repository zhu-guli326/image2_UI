# 宿主适配：Codex、Claude Code 与其它 Agent

本技能遵循 [Agent Skills](https://agentskills.io) 目录结构，可以在 Codex、Claude Code 以及其它支持 `SKILL.md` 的宿主中使用。SKILL.md 里写的“结构化选择工具”“项目说明文件”“宿主浏览器”等，统一按本表落到各宿主的实际能力上。

## 能力对照

| 技能里的说法 | Codex | Claude Code | 其它宿主 / 都没有时 |
| --- | --- | --- | --- |
| 结构化选择工具 | `request_user_input` / `request_user_input_async` | `AskUserQuestion`（每题 2–4 个选项，自动附带“其它”输入；推荐项在标签末尾加 `(Recommended)`） | 简短编号选项，一行一个 |
| 项目说明文件 | `AGENTS.md` | `CLAUDE.md`（以及 `.claude/` 下的设置） | README、package scripts |
| 宿主浏览器 | Codex 内置浏览器 | Claude in Chrome 或桌面应用内置浏览器；没有时用 Playwright | 给出可点击链接 |
| 原生出图（image2） | 内置 `image_gen`（`source=system-imagegen`） | 没有内置出图工具，走 `scripts/image2_asset.py` 包装器 | 同左；都不可用时如实说明缺口 |
| 技能目录 | Codex skills 目录 | `${CLAUDE_SKILL_DIR}`（Claude Code 会替换成实际路径） | 本 `SKILL.md` 所在目录 |
| 仅 Plan 模式可用的工具 | 不使用 | 不使用 `ExitPlanMode` 之类只在计划模式里有意义的工具 | — |

`AskUserQuestion` 一题最多 4 个选项。组件库首层需要 5 项时，把“更多产品组件”交给自动附带的“其它”入口，或把“自动推荐”与三套库作为 4 个选项、在问题里注明可输入“更多”；不要为了凑数把两套库合成一个选项。

## 安装

**Claude Code（个人，所有项目可用）：**

```bash
git clone https://github.com/zhu-guli326/image2_UI.git ~/.claude/skills/image-to-ui-skill
```

**Claude Code（只给某个项目，团队成员提交后同步获得）：**

```bash
git clone https://github.com/zhu-guli326/image2_UI.git .claude/skills/image-to-ui-skill
```

文件夹名就是技能名，保持 `image-to-ui-skill`。`references/`、`scripts/` 会随技能一起可用，SKILL.md 中的相对链接无需修改。

**Codex：** 放进 Codex 的 skills 目录，或按 README 的 Quick start 克隆后使用。

**只能上传单个 SKILL.md 的环境（如部分网页端）：** 参考文件需要通过 GitHub 链接读取，`image2-ui` CLI 不可用，按下文“没有 CLI 时的验证兜底”执行。

## 调用本仓库的 CLI

按顺序尝试，用第一个可用的：

1. `image2-ui`（已通过 npm 全局安装或在 PATH 上）
2. `node <技能目录>/scripts/image2-ui`（Claude Code 中写作 `node ${CLAUDE_SKILL_DIR}/scripts/image2-ui`）
3. 都不可用：按下文兜底流程

先运行一次 `doctor` 确认浏览器截图和出图通道是否就绪，不要在通道未就绪时声称已调用 image2。

## 用 Claude Code 驱动 Runtime

Runtime 默认通过 `codex exec` 执行实现与修复。改用 Claude Code：

```bash
image2-ui run ./my-ui --mode recreate --reference ./reference.png --task "..." --agent claude-code
# 或
IMAGE2_AGENT=claude-code image2-ui run ./my-ui --mode create --task "..."
```

Runtime 会以 `claude -p ... --output-format json --no-session-persistence` 无交互运行：

- 写入阶段默认 `--permission-mode acceptEdits`：允许改文件，不允许执行 shell。构建命令由 Runtime 的 `--build` 自己执行，通常不需要给代理 shell 权限。
- 只读阶段默认 `--permission-mode dontAsk --allowedTools Read,Grep,Glob`。
- 需要放宽时设置 `IMAGE2_CLAUDE_PERMISSION_MODE` 和 `IMAGE2_CLAUDE_ALLOWED_TOOLS`，例如 `IMAGE2_CLAUDE_ALLOWED_TOOLS="Bash(npm run build)"`。只放开任务确实需要的命令。
- 代理的最终回复会写入多代理交接文件（`final-message.md`），与 Codex 的 `-o` 行为一致。
- 自定义可执行文件路径用 `--agent-command /path/to/claude`；文件名是 `claude` 时会自动识别为 Claude Code。

## 没有 CLI 时的验证兜底

`image2-ui validate / loop / compare` 不可用时，验证要求不变，只是换成手动执行：

1. **渲染**：用宿主浏览器打开预览；没有浏览器能力时用 Playwright：

   ```bash
   npx -y playwright@1.55.0 screenshot --viewport-size="390,844" --full-page http://localhost:5173 out/mobile.png
   npx -y playwright@1.55.0 screenshot --viewport-size="1440,900" --full-page http://localhost:5173 out/desktop.png
   ```

   视口按参考图或效果图的设备尺寸设置；首次使用可能需要 `npx playwright install chromium`。
2. **对比**：把截图与当前流程的视觉依据（Recreate 用原图，Redesign / Create 用效果图）并排查看，逐区检查构图、层级、间距、字号、组件形状、图片裁切与状态。
3. **结构检查**：按 [harness-hard-guards.md](harness-hard-guards.md) 和 [loop-engineering.md](loop-engineering.md) 的清单逐项核对，至少包括：资源加载失败、远程资源、文字溢出、对比度、混用图标库、用字符代替功能图标、图片里烤进 UI 文字或控件、缺少 alt、移动端横向滚动、触控目标小于 44×44px。
4. **交互**：点击每个可见控件，确认有响应或明确反馈。
5. **汇报**：在最终汇报里写明“未使用 image2-ui CLI，采用手动渲染对比”，列出实际截图路径和检查项；未能检查的项如实写出，不能声称自动审计已通过。
