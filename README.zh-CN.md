# heroui-site

[English](README.md) | [中文](README.zh-CN.md)

基于 Next.js、React 与 HeroUI v3 的站点骨架。

## 技术栈

- 运行时与语言：[Node.js](https://nodejs.org/)；[TypeScript](https://www.typescriptlang.org)（strict）
- 包管理：pnpm（安装前校验，仅允许 pnpm）
- 框架：[Next.js](https://nextjs.org/)（App Router）；[React](https://react.dev/)
- UI：[HeroUI v3](https://heroui.com)
- 样式：[Tailwind CSS v4](https://tailwindcss.com)；tailwind-variants；clsx
- 状态：Zustand（persist）
- 国际化：i18next；YAML 文案
- 图标：Iconify（常用图标离线内联）
- 工程：ESLint；Prettier

## 功能

- 站点布局：顶栏、主内容、页脚；桌面导航与移动端抽屉菜单
- 全局宿主：Toast 挂在应用根，与路由并列
- 受控 Dialog：`open` / `onOpenChange`；尺寸、遮罩与 ESC 控制；确定 loading 由调用方持有
- 受控 Drawer：`open` / `onOpenChange`；支持四向滑出
- 数据表格：列配置驱动；受控分页、行选择、加载与空状态
- 分页状态：拉取、翻页、选择；失败时 Toast
- 界面偏好（本地持久化，水合后写入 DOM）：浅色 / 深色 / 跟随系统；简体中文 / English；LTR / RTL
- 图标：配置名优先离线表，未命中再走 Iconify
- HTTP 错误页：403、404、500

## 环境要求

- Node.js `^20.19.0` 或 `>=22.13.0`
- pnpm `>=10.26.0`

## 使用

```bash
pnpm install
pnpm dev
```

生产构建：

```bash
pnpm build
pnpm start
```
