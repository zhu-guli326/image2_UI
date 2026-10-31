# 组件库选项：名称映射与完整候选

弹出组件库选择前读取本文件。提问节奏（首层最多 5 项、逐题、推荐项唯一、选后一句确认）见 SKILL.md；本文件提供对外名称、内部映射与完整候选。

## 组件选项名称：国内优先、产品名称可读

- 面向中文用户，默认将适合项目的国内产品组件排在海外方案前；“自动推荐”仍放第一。不以技术包名作为首层主要标签。
- 首层通用示例：自动推荐（推荐）、蚂蚁产品组件、字节产品组件、腾讯产品组件、更多产品组件。根据已知技术栈与目标平台替换不兼容项，不为了国内优先牺牲适配。
- 对外短名称与内部实现映射：

| 用户看到的名称 | 内部实际候选 |
| --- | --- |
| 蚂蚁产品组件 | Ant Design（React）；Ant Design Vue（Vue）；Ant Design Mobile（React 移动 Web） |
| 字节产品组件 | Arco Design 或 Semi Design；根据技术栈与参考图选一个实际库 |
| 腾讯产品组件 | TDesign 的对应框架实现 |
| 有赞移动组件 | Vant（Vue 移动 Web） |
| 饿了么后台组件 | Element Plus（Vue；名称表示 Element 系列来源，不声称当前官方背书） |
| Google 产品组件 | Material Design；Web 按栈选择 MUI / Vuetify 等实际实现 |
| 微软产品组件 | Fluent UI |
| IBM 产品组件 | Carbon Design System |
| 简约定制组件 | shadcn/ui |
| Mantine 产品组件 | Mantine |
| Chakra 产品组件 | Chakra UI |
| Radix 产品组件 | Radix Themes |
| HeroUI 产品组件 | HeroUI（React） |

- 这些名称是帮助选择的简称，不承诺复刻对应公司的某个产品，也不意味着授权使用其商标或专有资产。没有真实厂商关联的库不能随意冠以国内平台名称。
- 选择后用一句短确认说明实际采用的库，例如“已选蚂蚁产品组件，采用 Ant Design。”实际栈不兼容时说明并提供兼容选择，不能静默替换。用户直接指定技术库名时保留其选择，不要求重新选产品简称。
- “更多产品组件”先显示尚未展示的国内适用项，再显示 Google、微软、IBM 等海外项及独立库；每批最多 6 项，需要时按国内 / 海外 / 独立组件分组，不一次列出全部候选。

## 完整候选（按技术栈）

- 完整候选中保留 **Google Material Design / MUI** 和 **Ant Design**；根据项目栈、设备和用途补充其它方案，例如 shadcn/ui。Google Material Design 是设计体系；React 项目可使用 MUI，其他栈选择对应的实际实现，不能把 Google 当成一个可直接安装的组件包。
- 组件库候选不能固定为三套。根据技术栈和使用场景，从以下候选中提供足够丰富的互斥选项，其它候选按需展开；宿主支持分组或搜索时，可用搜索式选择器。不要为了数量展示与项目栈不兼容的库。
  - React / 通用 Web：Google Material Design / MUI、Ant Design、Arco Design、Semi Design、TDesign、shadcn/ui、HeroUI、Chakra UI、Mantine、Radix Themes、React Aria Components、Fluent UI、Carbon Design System、PrimeReact、Bootstrap / React Bootstrap。
  - Vue：Element Plus、Naive UI、Arco Design Vue、TDesign Vue Next、Vuetify、PrimeVue、Ant Design Vue、Quasar。
  - 移动 Web：Vant（Vue）、Ant Design Mobile（React）、Ionic（按实际框架选择实现）。
  - Svelte：Skeleton、Flowbite Svelte；按项目实际版本确认适配。
  - 原生移动：Android Jetpack Compose Material 3、iOS SwiftUI 系统组件；仅在目标平台匹配时展示，不与 Web 组件混作可互换依赖。
- 当技术栈未知时，先展示跨场景的首层示例供用户选择方向；选择后再确定兼容实现。不要把 React、Vue 与原生组件同时装进一个项目，也不要把设计体系与实现库混为一谈。

## 用户偏好：优先有 Skill / MCP / Taste 支持的组件库

- 组件选型除平台兼容、参考图与国内优先外，优先考虑具有可用配套 Skill、官方 MCP 或可靠设计指导的 UI 库。先发现宿主实际可用能力并核实对应关系，再采用；不能凭库名宣称已存在或已连接 MCP。
- 若存在适用的 Taste 类审美 / 设计指导 Skill，在遵循其触发条件的前提下配合使用，帮助处理排版、留白、配色、视觉层级与细节；“taste”不默认等于一个已安装的特定技能。缺少该能力时不虚构，也不阻断普通 UI 工作。
- React 新项目把 **HeroUI** 纳入优先候选，显示为“HeroUI 产品组件”。按实际版本的官方文档核实依赖、主题、图标与组件 API；有相应 Skill / MCP 时先加载使用。已有项目、用户指定库或截图忠实度优先，不擅自迁移技术栈或替换已选组件。
- 组件推荐简短说明实际依据；不承诺“好看十倍”等无法验证的效果。用当前渲染结果检验审美质量，不以安装工具数量代替视觉验收。

## 推荐判断（仅内部使用，不放入选项标签）

- Material 适合 Material 视觉；Ant Design / Element Plus 适合后台与复杂表单；shadcn/ui / Radix / React Aria 适合定制体验；Mantine / Chakra 适合产品应用；Fluent / Carbon 适合对应企业设计语言；Vant / Ant Design Mobile 适合移动 Web。已有成熟项目优先推荐沿用现有。
- 这些是常见候选，不代表实时热度排名。用户要求“目前最热门”、最新版本或热度排序时，先核实官方资料及近期可信数据，再给出带来源和日期的选项，不凭印象声称排名。

## “更多产品组件”第二批示例

选择“更多产品组件”后按实际技术栈展示另一批短名称，例如有赞移动组件、饿了么后台组件、Google 产品组件、微软产品组件、简约定制组件、返回推荐。每个选项对应一个库，不捆绑多个独立库；不能因为首层精简就删除完整候选或忽略用户自定义选择。

选定后接入组件资源，见 [开源组件与 Figma 资源目录](open-component-sources.md)。
