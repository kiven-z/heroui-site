export const siteConfig = {
  name: 'heroui-site',
  description: 'Vite + React + HeroUI site',
  navItems: [
    { labelKey: 'nav.features', href: '/' },
    { labelKey: 'nav.table', href: '/data-table' },
    { labelKey: 'nav.integrations', href: '/integrations' },
    { labelKey: 'nav.pricing', href: '/pricing' },
  ],
} as const;
