# heroui-site

[English](README.md) | [中文](README.zh-CN.md)

A site skeleton built with Next.js, React, and HeroUI v3.

## Tech Stack

- Runtime and language: [Node.js](https://nodejs.org/); [TypeScript](https://www.typescriptlang.org) (strict)
- Package manager: pnpm (preinstall check; pnpm only)
- Framework: [Next.js](https://nextjs.org/) (App Router); [React](https://react.dev/)
- UI: [HeroUI v3](https://heroui.com)
- Styling: [Tailwind CSS v4](https://tailwindcss.com); tailwind-variants; clsx
- State: Zustand (persist)
- Internationalization: i18next; YAML message catalogs
- Icons: Iconify (common icons inlined offline)
- Tooling: ESLint; Prettier

## Features

- Site layout: header, main content, and footer; desktop navigation and mobile drawer menu
- Global hosts: Dialog, Drawer, and Toast mounted at the application root, alongside the route tree
- Imperative Dialog: open / close / confirm / clear; single layer (reopens replace, no stacking), sizes, custom content and footer buttons, backdrop and Escape controls, pre-confirm validation with loading, post-exit-animation callbacks; cleared on route change
- Imperative Drawer: same contract as Dialog; four-edge placement
- Data table: column-driven; controlled pagination, row selection, loading and empty states
- Pagination state: fetch, page change, and selection; Toast on failure
- UI preferences (persisted locally, applied to the DOM after hydration): light / dark / system; Simplified Chinese / English; LTR / RTL
- Icons: configured names prefer an offline map, with Iconify as fallback
- HTTP error pages: 403, 404, 500

## Requirements

- Node.js `^20.19.0` or `>=22.13.0`
- pnpm `>=10.26.0`

## Usage

```bash
pnpm install
pnpm dev
```

Production build:

```bash
pnpm build
pnpm start
```
