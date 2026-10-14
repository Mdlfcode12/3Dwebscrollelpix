"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const TOTAL_FRAMES = 236;
const DAMPING_FACTOR = 0.04; // Slower, more luxurious Apple-grade inertia momentum

const getFrameUrl = (index: number) =>
  `/frames/ezgif-frame-${String(index + 1).padStart(3, "0")}.webp`;

const NAV_ITEMS = [
  { label: "01  About", id: "about" },
  { label: "02  Properties", id: "properties" },
  { label: "03  Approach", id: "approach" },
  { label: "04  Partnership", id: "partner" },
  { label: "05  Contact", id: "contact" },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const lastRenderedIndexRef = useRef<number>(-1);
  const targetFrameRef = useRef<number>(0);
  const currentFrameRef = useRef<number>(0);
  const isLoopRunningRef = useRef<boolean>(false);
  const animationFrameIdRef = useRef<number | null>(null);
  const preloaderInitializedRef = useRef<boolean>(false);

  // Header & Overlay State
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("about");
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);

  // Aspect-ratio cover canvas renderer
  const renderFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let img = imagesRef.current[frameIndex];

    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let i = frameIndex - 1; i >= 0; i--) {
        if (imagesRef.current[i] && imagesRef.current[i].complete && imagesRef.current[i].naturalWidth > 0) {
          img = imagesRef.current[i];
          break;
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let i = frameIndex + 1; i < TOTAL_FRAMES; i++) {
        if (imagesRef.current[i] && imagesRef.current[i].complete && imagesRef.current[i].naturalWidth > 0) {
          img = imagesRef.current[i];
          break;
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;

    const imgAspect = imgWidth / imgHeight;
    const canvasAspect = canvasWidth / canvasHeight;

    let drawWidth: number;
    let drawHeight: number;
    let offsetX: number;
    let offsetY: number;

    if (canvasAspect > imgAspect) {
      drawWidth = canvasWidth;
      drawHeight = canvasWidth / imgAspect;
      offsetX = 0;
      offsetY = (canvasHeight - drawHeight) / 2;
    } else {
      drawHeight = canvasHeight;
      drawWidth = canvasHeight * imgAspect;
      offsetX = (canvasWidth - drawWidth) / 2;
      offsetY = 0;
    }

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    lastRenderedIndexRef.current = frameIndex;
  }, []);

  // Canvas DPI & Sizing logic
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = window.innerWidth;
    const height = window.innerHeight;

    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      renderFrame(Math.round(currentFrameRef.current));
    }
  }, [renderFrame]);

  // Inertia rAF Loop
  const startAnimationLoop = useCallback(() => {
    if (isLoopRunningRef.current) return;
    isLoopRunningRef.current = true;

    const animate = () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        currentFrameRef.current = targetFrameRef.current;
      } else {
        const diff = targetFrameRef.current - currentFrameRef.current;
        if (Math.abs(diff) > 0.0005) {
          currentFrameRef.current += diff * DAMPING_FACTOR;
        } else {
          currentFrameRef.current = targetFrameRef.current;
        }
      }

      const frameToRender = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.round(currentFrameRef.current))
      );

      if (frameToRender !== lastRenderedIndexRef.current) {
        renderFrame(frameToRender);
      }

      if (Math.abs(targetFrameRef.current - currentFrameRef.current) > 0.0005) {
        animationFrameIdRef.current = requestAnimationFrame(animate);
      } else {
        isLoopRunningRef.current = false;
        animationFrameIdRef.current = null;
      }
    };

    animationFrameIdRef.current = requestAnimationFrame(animate);
  }, [renderFrame]);

  // Update target frame based on scroll offset
  const updateScrollProgress = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const scrollableHeight = rect.height - window.innerHeight;

    if (scrollableHeight <= 0) {
      targetFrameRef.current = 0;
      startAnimationLoop();
      return;
    }

    const progress = Math.max(0, Math.min(1, -rect.top / scrollableHeight));
    targetFrameRef.current = progress * (TOTAL_FRAMES - 1);
    startAnimationLoop();
  }, [startAnimationLoop]);

  // Async frame preloader
  useEffect(() => {
    if (preloaderInitializedRef.current) return;
    preloaderInitializedRef.current = true;

    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    imagesRef.current = images;

    const loadAndDecodeFrame = async (index: number) => {
      const img = new window.Image();
      img.src = getFrameUrl(index);
      try {
        if (img.decode) {
          await img.decode();
        }
      } catch {
        // Fallback for decode interruption
      }
      images[index] = img;
      if (Math.round(currentFrameRef.current) === index) {
        renderFrame(index);
      }
    };

    loadAndDecodeFrame(0).then(() => {
      handleResize();
      renderFrame(0);
      setIsLoaded(true);
    });

    const preloadAll = async () => {
      for (let i = 1; i < TOTAL_FRAMES; i++) {
        await loadAndDecodeFrame(i);
      }
    };

    preloadAll();
  }, [handleResize, renderFrame]);

  // IntersectionObserver to detect when user scrolls past hero (observes #about section)
  useEffect(() => {
    const aboutEl = document.getElementById("about");
    if (!aboutEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Hero background is solid dark when #about is near or past top of viewport
        const isPast = entry.isIntersecting || entry.boundingClientRect.top <= 100;
        setIsScrolledPastHero(isPast);
      },
      { rootMargin: "-60px 0px 0px 0px" }
    );

    observer.observe(aboutEl);
    return () => observer.disconnect();
  }, []);

  // IntersectionObserver for active section tracking in menu overlay
  useEffect(() => {
    const sectionIds = ["about", "properties", "approach", "partner", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Escape key & focus lock for Menu Overlay
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  // Event listeners for scroll & resize
  useEffect(() => {
    handleResize();
    updateScrollProgress();

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("scroll", updateScrollProgress, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", updateScrollProgress);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      isLoopRunningRef.current = false;
    };
  }, [handleResize, updateScrollProgress]);

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      id="home"
      ref={containerRef}
      className="relative w-full h-[380vh] md:h-[550vh] bg-[#030303] text-white selection:bg-white/20"
    >
      {/* Fixed Header Navigation - ALWAYS VISIBLE */}
      <header
        className={`fixed top-0 left-0 right-0 z-[100] w-full h-[60px] md:h-[72px] pt-[env(safe-area-inset-top,0px)] transition-[background-color,border-color] duration-300 ease-in-out pointer-events-auto flex items-center ${isScrolledPastHero
          ? "bg-[var(--dark)] border-b border-[var(--line-dark)] shadow-lg"
          : "bg-transparent border-b border-transparent"
          }`}
      >
        <div className="max-w-[1440px] w-full mx-auto px-5 md:px-[4vw] flex items-center justify-between">
          {/* Left: MENU Button */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="font-sans text-[11px] font-medium uppercase tracking-[0.15em] text-[var(--on-dark)] hover:opacity-70 transition-opacity"
          >
            MENU
          </button>

          {/* Center: LOGO + WORDMARK */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="brand inline-flex items-center gap-2 md:gap-[10px] focus:outline-none focus-visible:outline-1 focus-visible:outline-[var(--on-dark)] focus-visible:outline-offset-6"
            aria-label="Elpix Properties home"
          >
            <img
              src="/logo/elpix-mark-white.png"
              alt=""
              aria-hidden="true"
              width={1144}
              height={505}
              loading="eager"
              className="h-[15px] md:h-[18px] w-auto object-contain"
            />
            <span className="brand-text font-sans text-[10px] md:text-xs tracking-[0.15em] md:tracking-[0.2em] text-[var(--on-dark)] uppercase whitespace-nowrap">
              <strong className="font-bold text-[var(--on-dark)]">ELPIX</strong> PROPERTIES
            </span>
          </a>

          {/* Right: WHATSAPP Link */}
          <a
            href="https://wa.me/6282324393309"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-[11px] font-medium uppercase tracking-[0.15em] text-[var(--on-dark)] hover:opacity-70 transition-opacity flex items-center gap-1.5"
            aria-label="Direct WhatsApp contact"
          >
            <span className="hidden md:inline">WHATSAPP ↗</span>
            <span className="md:hidden flex items-center justify-center w-7 h-7 rounded-full bg-[var(--wa-green)] text-white shadow-sm">
              <svg
                className="w-3.5 h-3.5 fill-white"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.461c-1.854 0-3.674-.499-5.267-1.442l-.377-.225-3.916 1.027 1.045-3.819-.247-.393c-1.036-1.648-1.583-3.557-1.582-5.51 0-5.632 4.582-10.214 10.215-10.214 2.73 0 5.295 1.063 7.222 2.992 1.928 1.929 2.99 4.493 2.99 7.223 0 5.633-4.583 10.214-10.073 10.214m0-18.665c-4.664 0-8.46 3.796-8.46 8.451 0 1.637.472 3.238 1.366 4.621l.542.846-.628 2.296 2.348-.616.818.486c1.33.79 2.854 1.206 4.414 1.206 4.664 0 8.46-3.796 8.46-8.451 0-4.656-3.8-8.452-8.86-8.452" />
              </svg>
            </span>
          </a>
        </div>
      </header>

      {/* Sticky Fullscreen Container for Canvas & Hero Text (100svh fallback 100vh) */}
      <div className="sticky top-0 h-[100svh] min-h-[100vh] w-full overflow-hidden flex flex-col justify-between pointer-events-none">

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          style={{ willChange: "transform", transform: "translateZ(0)" }}
          className={`absolute inset-0 w-full h-full object-cover z-0 pointer-events-none transition-opacity duration-[2000ms] ease-out ${isLoaded ? "opacity-100" : "opacity-0"}`}
        />

        {/* Soft dark bottom gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent pointer-events-none z-1" />

        {/* Hero Overlay Text Block (Bottom-Left over image) */}
        <div className="relative z-10 mt-auto w-full max-w-[1440px] mx-auto px-5 md:px-[4vw] pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))] md:pb-[calc(3rem+env(safe-area-inset-bottom,0px))] pointer-events-auto">
          <div className="flex flex-col items-start">
            {/* Eyebrow */}
            <span className="font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--on-dark)]/80 mb-4">
              Development · Living · Value
            </span>

            {/* H1 Heading (Only H1 on page) */}
            <h1 className="font-serif font-light text-[clamp(38px,8.5vw,140px)] leading-[0.95] tracking-[-0.02em] text-[var(--on-dark)] break-words max-w-full">
              Elpix Properties
            </h1>

            {/* Subheading */}
            <p className="font-sans text-[14px] md:text-[16px] leading-[1.6] text-[var(--on-dark)]/85 mt-6 max-w-[440px] w-full">
              We identify, transform, and position distinctive real-estate opportunities for modern living and long-term value.
            </p>
          </div>
        </div>

      </div>

      {/* Menu Overlay Modal */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-[200] bg-[var(--dark)] text-[var(--on-dark)] flex flex-col justify-between p-6 md:p-12 overflow-y-auto max-h-screen animate-fade-in"
          role="dialog"
          aria-modal="true"
        >
          {/* Header row in modal */}
          <div className="flex items-center justify-between border-b border-[var(--line-dark)] pb-6 shrink-0">
            <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-[var(--eyebrow)]">
              NAVIGATION
            </span>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="font-sans text-[11px] uppercase tracking-[0.15em] text-[var(--on-dark)] hover:opacity-70 transition-opacity"
            >
              CLOSE ×
            </button>
          </div>

          {/* Large Numbered Navigation List */}
          <div className="my-auto py-8 flex flex-col space-y-4 md:space-y-6 shrink-0">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left font-serif text-[clamp(36px,10vw,64px)] font-light leading-tight tracking-tight transition-colors hover:text-[var(--taupe)] group"
                >
                  <span
                    className={`${isActive ? "text-[var(--taupe)] italic" : "text-[var(--on-dark)]"
                      }`}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Modal Footer */}
          <div className="border-t border-[var(--line-dark)] pt-6 flex flex-col sm:flex-row items-baseline justify-between gap-4 text-[10px] font-sans text-[var(--on-dark-muted)] shrink-0">
            <span>ELPIX PROPERTIES · JAKARTA, INDONESIA</span>
            <a
              href="https://wa.me/6282324393309"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--on-dark)] transition-colors"
            >
              WHATSAPP DIRECT ↗
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
