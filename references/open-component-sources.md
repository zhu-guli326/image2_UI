# 开源组件与 Figma 资源目录

核实日期：2026-10-31。优先国内来源；此目录是自动发现入口，不是已经安装或已获得访问权限的声明。

| 产品简称 | 代码仓库 / 文档 | 设计资源入口 | 来源说明 |
| --- | --- | --- | --- |
| 蚂蚁产品组件 | https://github.com/ant-design/ant-design ; https://ant.design | https://ant.design/docs/resources/ ; https://www.figma.com/community/file/831698976089873405 | 官方资源页列出的第三方 Figma Open Source Library；免费资源，不等同官方维护或代码仓库 MIT 授权覆盖设计资产 |
| 字节产品组件：Arco | https://github.com/arco-design/arco-design ; https://github.com/arco-design/awesome-arco | https://www.figma.com/file/M66cTiLXHa4SVyZIlfY5Pb/arco-Design-System?node-id=7945%3A44563 | Arco 官方资源仓库列出的 Components Figma；具体组件访问和许可运行时确认 |
| 字节产品组件：Semi | https://github.com/DouyinFE/semi-design ; https://semi.design/zh-CN/advanced/design-source | https://www.figma.com/community/file/1509783980598707066/semi-design-library | Semi 官方文档列出的社区用户资源，不使用内部 ByteDance 版本 |
| 腾讯产品组件 | https://github.com/Tencent/tdesign ; https://tdesign.tencent.com | https://www.figma.com/@tencent | 腾讯官方仓库提供的 Figma 发布者入口，需从发布者页面选择对应平台资源，不能把发布者 URL 当组件 fileKey |

上述 Figma 链接已从维护者文档提取；当前搜索浏览器无法抓取部分 Figma 社区内容，未验证组件访问、许可细节或导入成功。不得据此宣称这些库已加入用户文件。实际使用前复核资源描述、版本与许可；代码开源许可不自动覆盖同名商业 Figma 套件。

## 自动接入流程

1. 用户选产品简称后读取本目录，结合项目栈确定实际代码库；只检索所需组件、图标与 tokens，不批量安装全部库。
2. 网页交付：检查现有依赖，按官方文档接入实际组件与配套图标，保留许可说明。依赖安装失败时报告实际错误，不用字符占位冒充组件。
3. Figma 交付：先检查当前文件库和组件；没有匹配时，自动使用目录中的维护者资源入口定位公开资产。使用当前 Figma 工具支持的检索、组件 key 解析与导入能力；解析 fileKey 后创建/复用任务会话，按 Figma 技能验证访问并导入所需组件。社区 resource ID 不是 design fileKey，不能猜测转换关系。
4. 如果资源必须先 Duplicate / 加入团队库，且工具不支持该操作，主动打开精确资源页面并指出一个必要操作，例如“点击 Open in Figma / Duplicate 后，把复制文件链接发来”；已有用户授权不代表工具具备该能力。不能把官方资源目录链接本身当作导入成功。
5. 开源源代码可以用于在许可允许范围内重建本地可编辑组件，但这属于本地实现，不是官方组件实例；只有用户已同意本地组件路径时采用，否则简短说明后让用户选择。
6. 仅在公开资源检索、访问检查和可用导入路径均已确认无法继续时，才请求用户补充私有库链接。不得在当前库列表缺项时立即把搜索工作交给用户。
7. 在项目 artifacts/component-sources.json 记录采用库、文档 URL、代码仓库、设计资源 URL、许可核实状态、实际组件 key/节点 ID 与导入结果。未知字段保留 null 并解释，不编造。
