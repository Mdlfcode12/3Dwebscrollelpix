"use client";

import { useState, useEffect, useRef } from "react";

interface Step {
  number: string;
  title: string;
  description: string;
}

const STEPS: Step[] = [
  {
    number: "01",
    title: "Identify",
    description: "Find potential others may overlook—in the asset, location, or market.",
  },
  {
    number: "02",
    title: "Reimagine",
    description: "Define a clearer spatial idea and a stronger commercial position.",
  },
  {
    number: "03",
    title: "Develop",
    description: "Translate the vision into a disciplined, liveable, well-resolved property.",
  },
  {
    number: "04",
    title: "Position",
    description: "Shape the story, product, and experience for the right audience.",
  },
  {
    number: "05",
    title: "Operate or Exit",
    description: "Create the conditions for lasting operation or a considered transaction.",
  },
];

export default function Approach() {
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
      id="approach"
      ref={sectionRef}
      className="scroll-mt-[60px] md:scroll-mt-[72px] w-full bg-[var(--cream)] text-[var(--ink)] py-[100px] md:py-[140px] lg:py-[180px] px-[4vw] border-t border-[var(--line-light)]"
    >
      <div className="max-w-[1440px] mx-auto flex flex-col space-y-16 md:space-y-24">
        
        {/* Eyebrow & Header Row */}
        <div
          className={`flex flex-col space-y-8 transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {/* Eyebrow Label */}
          <div>
            <span className="font-sans text-[10px] md:text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--eyebrow)]">
              03  THE ELPIX APPROACH
            </span>
          </div>

          {/* Header Row: H2 left, Paragraph right (~30% width) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start">
            <div className="md:col-span-8">
              <h2 className="font-serif font-light text-[clamp(40px,5vw,72px)] leading-[1.05] tracking-[-0.01em] text-[var(--ink)]">
                From overlooked asset<br />
                to enduring{" "}
                <em className="font-serif italic font-normal text-[var(--taupe)]">
                  value.
                </em>
              </h2>
            </div>
            <div className="md:col-span-4">
              <p className="text-[13px] md:text-[15px] leading-[1.6] text-[var(--ink-muted)] font-sans">
                Every opportunity is considered as a complete journey: spatially, commercially, and operationally.
              </p>
            </div>
          </div>
        </div>

        {/* Table-Like List of 5 Rows */}
        <div className="flex flex-col border-b border-[var(--line-light)]">
          {STEPS.map((step, idx) => (
            <div
              key={step.number}
              className={`group cursor-pointer border-t border-[var(--line-light)] py-[28px] transition-all duration-500 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${idx * 75}ms` }}
            >
              {/* Desktop Grid Layout */}
              <div className="hidden md:grid grid-cols-12 items-center gap-4">
                {/* 01-05: Number at 0-5% (col-span-1) */}
                <div className="col-span-1">
                  <span className="font-sans text-[10px] uppercase font-medium tracking-widest text-[var(--eyebrow)]">
                    {step.number}
                  </span>
                </div>

                {/* Title in Cormorant Garamond ~22px at ~7% (col-span-5) */}
                <div className="col-span-5">
                  <h3 className="font-serif text-[22px] font-light text-[var(--ink)] transition-transform duration-300 ease-out group-hover:translate-x-2">
                    {step.title}
                  </h3>
                </div>

                {/* Description at ~55% (col-span-5) */}
                <div className="col-span-5">
                  <p className="font-sans text-[12px] leading-[1.6] text-[var(--ink-muted)]">
                    {step.description}
                  </p>
                </div>

                {/* Arrow far right (col-span-1) */}
                <div className="col-span-1 flex justify-end">
                  <span className="text-sm text-[var(--ink)] transition-transform duration-300 ease-out group-hover:rotate-45 inline-block">
                    ↗
                  </span>
                </div>
              </div>

              {/* Mobile Layout: Stacked */}
              <div className="flex md:hidden flex-col space-y-2">
                <div className="flex items-baseline justify-between">
                  <div className="flex items-baseline gap-3">
                    <span className="font-sans text-[10px] font-medium text-[var(--eyebrow)]">
                      {step.number}
                    </span>
                    <h3 className="font-serif text-[20px] font-light text-[var(--ink)]">
                      {step.title}
                    </h3>
                  </div>
                  <span className="text-sm text-[var(--ink)]">
                    ↗
                  </span>
                </div>
                <p className="font-sans text-[12px] leading-[1.6] text-[var(--ink-muted)] pl-6">
                  {step.description}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
