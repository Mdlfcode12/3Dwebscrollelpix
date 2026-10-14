"use client";

import { useState, useEffect, useRef } from "react";

export default function About() {
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
      id="about"
      ref={sectionRef}
      className="scroll-mt-[60px] md:scroll-mt-[72px] w-full bg-[var(--cream)] text-[var(--ink)] py-[100px] md:py-[140px] lg:py-[180px] px-[4vw] border-t border-[var(--line-light)]"
    >
      <div className="max-w-[1440px] mx-auto flex flex-col space-y-10 md:space-y-14">
        {/* Eyebrow Label */}
        <div
          className={`transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="font-sans text-[10px] md:text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--eyebrow)]">
            01  ABOUT ELPIX
          </span>
        </div>

        {/* Two Columns Grid: Left ~55% (md:col-span-7), Right ~35% (md:col-span-5), Aligned to Top */}
        <div
          className={`grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start transition-all duration-700 delay-100 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {/* Left Column */}
          <div className="md:col-span-7">
            <h2 className="font-serif font-light text-[clamp(40px,5vw,72px)] leading-[1.05] tracking-[-0.01em] text-[var(--ink)]">
              We see the potential<br />
              before it becomes<br />
              <em className="font-serif italic font-normal text-[var(--taupe)]">
                obvious.
              </em>
            </h2>
          </div>

          {/* Right Column */}
          <div className="md:col-span-5 flex flex-col space-y-6 text-[13px] md:text-[15px] leading-[1.6] text-[var(--ink-muted)] font-sans">
            <p>
              Elpix Properties approaches real estate as more than a physical asset. We look for the hidden relationship between place, design, operation, and market positioning.
            </p>
            <p>
              Our work is to turn that potential into spaces people want to live in—and assets people can believe in for the long term.
            </p>
            <div className="pt-2">
              <a
                href="#approach"
                className="link-editorial text-[var(--ink)] inline-flex items-center gap-1 hover:opacity-70 transition-opacity"
              >
                <span>OUR APPROACH</span>
                <span className="text-xs">↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
