export function LayoutFooter() {
  return (
    <footer className="flex w-full items-center justify-center py-3">
      <a
        className="flex items-center gap-1 text-current no-underline"
        href="https://heroui.com?utm_source=heroui-site"
        rel="noopener noreferrer"
        target="_blank"
      >
        <span className="text-muted">Powered by</span>
        <p className="text-accent">HeroUI</p>
      </a>
    </footer>
  );
}
