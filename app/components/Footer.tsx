"use client";

export default function Footer() {
  return (
    <footer className="w-full bg-[var(--cream)] text-[var(--ink)] border-t border-[var(--line-light)] py-[32px] px-[4vw]">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Left: LOGO + WORDMARK */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="brand inline-flex items-center gap-[10px] focus:outline-none focus-visible:outline-1 focus-visible:outline-[var(--ink)] focus-visible:outline-offset-6"
          aria-label="Elpix Properties home"
        >
          <img
            src="/logo/elpix-mark-navy.png"
            alt=""
            aria-hidden="true"
            width={1144}
            height={505}
            loading="eager"
            className="h-[16px] w-auto object-contain"
          />
          <div className="flex flex-col items-start leading-none">
            <span className="font-sans text-sm font-bold tracking-[0.15em] text-[var(--ink)] uppercase">
              ELPIX
            </span>
            <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-[var(--ink-muted)]">
              PROPERTIES
            </span>
          </div>
        </a>

        {/* Center: Navigation Links */}
        <nav className="flex flex-wrap items-center justify-center gap-3 md:gap-5 text-[10px] uppercase tracking-[0.15em] text-[var(--ink-muted)] font-sans">
          <a href="#about" className="hover:text-[var(--ink)] transition-colors">
            ABOUT
          </a>
          <span className="text-[var(--eyebrow)]">·</span>
          <a href="#properties" className="hover:text-[var(--ink)] transition-colors">
            PROPERTIES
          </a>
          <span className="text-[var(--eyebrow)]">·</span>
          <a href="#partner" className="hover:text-[var(--ink)] transition-colors">
            PARTNER
          </a>
          <span className="text-[var(--eyebrow)]">·</span>
          <a href="#contact" className="hover:text-[var(--ink)] transition-colors">
            CONTACT
          </a>
        </nav>

        {/* Right: Two small lines in var(--eyebrow) */}
        <div className="flex flex-col items-center md:items-end text-[10px] font-sans tracking-wider text-[var(--eyebrow)] space-y-0.5">
          <span>© 2026 ELPIX PROPERTIES</span>
          <span>JAKARTA · INDONESIA</span>
        </div>

      </div>
    </footer>
  );
}
