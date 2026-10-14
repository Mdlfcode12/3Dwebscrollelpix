"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function Partnership() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section
      id="partner"
      ref={sectionRef}
      className="scroll-mt-[60px] md:scroll-mt-[72px] w-full min-h-screen bg-[var(--dark-panel)] border-t border-[var(--line-dark)]"
    >
      <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-2 items-stretch">
        
        {/* Left Column (50% desktop, top 60vh mobile): Image /images/property-07.webp */}
        <div className="relative w-full h-[60vh] lg:h-full lg:min-h-screen overflow-hidden group">
          <Image
            src="/images/property-07.webp"
            alt="Elpix Partnership — Arrival Experience"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            loading="lazy"
          />
        </div>

        {/* Right Column (50% desktop, panel with background var(--dark-panel)) */}
        <div className="bg-[var(--dark-panel)] flex flex-col justify-center p-8 sm:p-12 lg:p-[8%] text-[var(--on-dark)]">
          <div
            className={`flex flex-col items-start transition-all duration-700 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            {/* Eyebrow */}
            <span className="font-sans text-[10px] md:text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--eyebrow)]">
              04  PARTNERSHIP
            </span>

            {/* Small uppercase audience line */}
            <span className="font-sans text-[10px] md:text-[11px] font-medium uppercase tracking-[0.15em] text-[var(--on-dark-muted)] mt-4 mb-6">
              LANDOWNERS · INVESTORS · BUYERS
            </span>

            {/* H2 Heading */}
            <h2 className="font-serif font-light text-[clamp(40px,5vw,72px)] leading-[1.05] tracking-[-0.01em] text-[var(--on-dark)]">
              Let's build<br />
              what's{" "}
              <em className="font-serif italic font-normal text-[var(--taupe)]">
                next.
              </em>
            </h2>

            {/* Paragraph */}
            <p className="font-sans text-[13px] md:text-[15px] leading-[1.6] text-[var(--on-dark-muted)] mt-6 mb-8 max-w-[420px]">
              We welcome thoughtful conversations with people who see possibility in property—whether you own land, seek an investment opportunity, or want to acquire a distinctive asset.
            </p>

            {/* WhatsApp Text Link */}
            <div>
              <a
                href="https://wa.me/6282324393309"
                target="_blank"
                rel="noopener noreferrer"
                className="link-editorial text-[var(--on-dark)] inline-flex items-center gap-1 hover:opacity-70 transition-opacity"
              >
                <span>DISCUSS VIA WHATSAPP</span>
                <span className="text-xs">↗</span>
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
