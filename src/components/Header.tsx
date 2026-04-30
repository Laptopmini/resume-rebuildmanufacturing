export default function Header() {
  return (
    <header
      data-testid="site-header"
      className="fixed top-0 inset-x-0 z-50 bg-bg/90 backdrop-blur border-b border-rule"
    >
      <div className="mx-auto max-w-wide flex items-center justify-between px-6 md:px-10 h-16">
        <span
          data-testid="header-mark"
          className="font-sans font-bold tracking-tight text-ink text-md uppercase"
        >
          PAUL-VALENTIN MINI
        </span>
        <nav>
          <a
            data-testid="nav-experience"
            href="#experience"
            className="text-inkMuted hover:text-accentBright text-xs uppercase tracking-[0.2em] mx-3 transition-colors"
          >
            Experience
          </a>
          <a
            data-testid="nav-skills"
            href="#skills"
            className="text-inkMuted hover:text-accentBright text-xs uppercase tracking-[0.2em] mx-3 transition-colors"
          >
            Skills
          </a>
          <a
            data-testid="nav-contact"
            href="#contact"
            className="text-inkMuted hover:text-accentBright text-xs uppercase tracking-[0.2em] mx-3 transition-colors"
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
