# HTML / 网页代码的真实组件接入

用户选定产品组件后、编写 UI 前读取。目标是让交付代码实际调用选定库，不只是样式模仿。

## 1. 确认技术栈与真实依赖

检查 package.json、锁文件、入口文件和已有组件封装，优先复用现有版本与包管理器。React、Vue 与原生 HTML 的组件不能直接互换；不擅自重建现有项目技术栈。新项目根据用户选定的库确定兼容栈。实现 API 与版本以官方安装文档及已安装包为准。

| 用户选项 | React 实现 | Vue 实现 | 官方接入入口 |
| --- | --- | --- | --- |
| 蚂蚁产品组件 | antd；图标 @ant-design/icons | ant-design-vue；图标 @ant-design/icons-vue | https://ant.design/docs/react/introduce ; https://antdv.com/docs/vue/introduce |
| 字节 Arco 组件 | @arco-design/web-react | @arco-design/web-vue | https://arco.design/react/docs/start ; https://arco.design/vue/docs/start |
| 字节 Semi 组件 | @douyinfe/semi-ui；图标 @douyinfe/semi-icons | 不假设存在同等官方 Vue 实现 | https://semi.design/zh-CN/start/getting-started |
| 腾讯产品组件 | tdesign-react；图标 tdesign-icons-react | tdesign-vue-next；图标 tdesign-icons-vue-next | https://tdesign.tencent.com/react/getting-started ; https://tdesign.tencent.com/vue-next/getting-started |
| 有赞移动组件 | 不将 Vant 当作 React 组件 | vant | https://vant-ui.github.io/vant/ |
| 饿了么后台组件 | 不将 Element Plus 当作 React 组件 | element-plus | https://element-plus.org/en-US/guide/installation.html |
| Google 产品组件 | @mui/material；按文档配置样式引擎；图标 @mui/icons-material | vuetify（遵守所选实现的规范） | https://mui.com/material-ui/getting-started/installation/ ; https://vuetifyjs.com/en/getting-started/installation/ |
| 简约定制组件 | shadcn/ui 按官方 CLI 添加需要的源码组件 | 不自动把同名社区实现当成官方 React 版本 | https://ui.shadcn.com/docs/installation |

以上为查找入口与包映射，不承诺固定版本兼容性。先核实当前官方说明再安装；不在技能中固定 latest，也不混用不同大版本示例。

## 2. 从安装到调用必须落地

1. 复用已有依赖或用项目包管理器添加必要包；只安装需要的组件体系。读取官方 quick start，确认 CSS、主题 Provider、样式引擎和按需导入要求。
2. 在真实页面或业务组件中 import 并渲染所选组件。示意（具体属性以所装版本为准）：

```tsx
import { Button, ConfigProvider } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

export function TicketActions() {
  return (
    <ConfigProvider>
      <Button icon={<SearchOutlined />} aria-label="搜索活动" />
      <Button type="primary">立即购票</Button>
    </ConfigProvider>
  );
}
```

Vue 项目使用对应库组件的模板 / 注册方式，不能复制 React JSX。shadcn/ui 是加入项目的可编辑源码组件，不使用不存在的通用运行时包。共享图标仍通过统一入口调用，示例中直接 import 仅用于解释真实依赖。

3. 用所选库的主题 tokens、组件属性与必要的局部样式匹配参考图。截图还原不应被组件默认主题改变，但不得用样式近似品代替已承诺的真实组件。
4. 在项目 artifacts/component-sources.json 记录包名、实际版本、组件名、调用文件、样式入口、图标入口、来源和采用方式；报告必须区分真实库调用、本地源码组件和纯样式实现。

## 3. 纯 HTML 的处理

- 纯 .html 不能直接 import React / Vue 组件。用户要求无构建单文件时，先确认所选库是否有受维护的原生 JS / Web Components 或官方浏览器方案；只采用有文档的方式。
- 已有 React / Vue 项目可以构建为静态网页；“HTML 网页交付”不自动意味着必须单个 .html 文件。保留可编辑源码，并说明实际运行 / 构建入口。
- 用户明确要求零框架单文件且选定库无兼容实现时，简短说明冲突，提供“保留组件库并构建静态网页”或“改用兼容的原生组件方案”。不可悄悄写手工 div 后声称已调用 Ant Design。
- CDN 仅在官方支持、版本固定且交付允许网络依赖时使用；不把在线依赖说成离线可用。不执行未知站点提供的任意安装脚本。

## 4. 验证

核对实际 import / 模板引用、依赖版本和资源加载；运行适当构建，检查浏览器错误，实际操作所需按钮、筛选、弹窗及键盘交互，并查看当前渲染截图。只安装包不算接入，只通过构建不算视觉验收。缺少依赖、样式、图标或真实调用时修复；未解决则明确说明，不以占位字符或扁平图片冒充可用组件。
