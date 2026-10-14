"use client";

import { useState, useEffect, useRef } from "react";

export default function Contact() {
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
      { threshold: 0.15 }
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
      id="contact"
      ref={sectionRef}
      className="scroll-mt-[60px] md:scroll-mt-[72px] w-full bg-[var(--cream)] text-[var(--ink)] py-[100px] md:py-[140px] lg:py-[180px] px-[4vw] border-t border-[var(--line-light)]"
    >
      <div className="max-w-[1440px] mx-auto flex flex-col space-y-12 md:space-y-16">
        
        {/* Eyebrow Label */}
        <div
          className={`transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="font-sans text-[10px] md:text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--eyebrow)]">
            05  START A CONVERSATION
          </span>
        </div>

        {/* Two Columns Grid: Left ~50% (md:col-span-6), Right ~40% starting at 55% (md:col-span-5 md:col-start-7) */}
        <div
          className={`grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start transition-all duration-700 delay-100 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {/* Left Column (~50%) */}
          <div className="md:col-span-6 flex flex-col space-y-6">
            <h2 className="font-serif font-light text-[clamp(40px,5vw,72px)] leading-[1.05] tracking-[-0.01em] text-[var(--ink)]">
              A good property<br />
              story starts with<br />
              <em className="font-serif italic font-normal text-[var(--taupe)]">
                a conversation.
              </em>
            </h2>

            <p className="font-sans text-[13px] md:text-[15px] leading-[1.6] text-[var(--ink-muted)] max-w-[420px]">
              Have a property, land, investment opportunity, or acquisition in mind? Talk directly with Elpix Properties on WhatsApp.
            </p>
          </div>

          {/* Right Column (~40%, aligned lower than H2) */}
          <div className="md:col-span-5 md:col-start-7 md:pt-12 flex flex-col items-start">
            {/* Small uppercase label */}
            <span className="font-sans text-[10px] md:text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--eyebrow)]">
              DIRECT WHATSAPP
            </span>

            {/* Large WhatsApp phone number in Cormorant Garamond */}
            <a
              href="https://wa.me/6282324393309"
              target="_blank"
              rel="noopener noreferrer"
              className="font-serif font-light text-[32px] md:text-[40px] leading-[1.1] text-[var(--ink)] hover:opacity-80 transition-opacity mt-2 mb-4 block"
            >
              +62 823-2439-3309
            </a>

            {/* Text link */}
            <a
              href="https://wa.me/6282324393309"
              target="_blank"
              rel="noopener noreferrer"
              className="link-editorial text-[var(--ink)] inline-flex items-center gap-1 hover:opacity-70 transition-opacity mb-6"
            >
              <span>START CONVERSATION</span>
              <span className="text-xs">↗</span>
            </a>

            {/* Hairline Divider */}
            <div className="w-full border-t border-[var(--line-light)] my-4" />

            {/* Small note */}
            <span className="font-sans text-[10px] md:text-[11px] text-[var(--eyebrow)]">
              Tap the number to open WhatsApp
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
