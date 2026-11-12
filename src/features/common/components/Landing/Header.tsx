export function Header() {
  return (
    <header className="flex min-h-[72px] items-center justify-between border-b border-white/[0.06]">
      <a
        href="/"
        className="flex items-center gap-2 text-sm font-bold"
      >
        <span className="grid h-[18px] w-[18px] place-items-center rounded border border-accent text-[11px] text-accent">
          ✓
        </span>
        <span>TaskFlow</span>
      </a>

      <nav
        aria-label="Primary navigation"
        className="ml-auto mr-9 hidden items-center gap-6 md:flex"
      >
        <a href="#features" className="nav-link">
          Features
        </a>
        <a href="#solutions" className="nav-link">
          Solutions
        </a>
        <a href="#pricing" className="nav-link">
          Pricing
        </a>
        <a href="#resources" className="nav-link">
          Resources
        </a>
      </nav>

      <div className="flex items-center gap-4">
        <a
          href="/login"
          className="hidden text-xs text-muted transition  sm:inline"
        >
          Log in
        </a>

        <a
          href="/signup"
          className="focus-ring rounded-md bg-accent px-3 py-2 text-xs font-semibold transition hover:bg-accent-hover"
        >
          Get started free
        </a>
      </div>
    </header>
  );
}
