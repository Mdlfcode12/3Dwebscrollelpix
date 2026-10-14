"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { PROPERTIES } from "../data/properties";

export default function SelectedProperties() {
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
      id="properties"
      ref={sectionRef}
      className="scroll-mt-[60px] md:scroll-mt-[72px] w-full bg-[var(--dark)] text-[var(--on-dark)] py-[100px] md:py-[140px] lg:py-[180px] px-[4vw] border-t border-[var(--line-dark)]"
    >
      <div className="max-w-[1440px] mx-auto flex flex-col space-y-16 md:space-y-24">
        
        {/* Header Row: 3 parts (Eyebrow left, H2 middle ~28% start, Paragraph right) */}
        <div
          className={`grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {/* Eyebrow - Left */}
          <div className="md:col-span-3">
            <span className="font-sans text-[10px] md:text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--eyebrow)]">
              02  SELECTED PROPERTIES
            </span>
          </div>

          {/* H2 Heading - Middle (~28% width offset) */}
          <div className="md:col-span-6">
            <h2 className="font-serif font-light text-[clamp(40px,5vw,72px)] leading-[1.05] tracking-[-0.01em] text-[var(--on-dark)]">
              Spaces with the power<br />
              to become{" "}
              <em className="font-serif italic font-normal text-[var(--taupe)]">
                more.
              </em>
            </h2>
          </div>

          {/* Paragraph - Right */}
          <div className="md:col-span-3">
            <p className="text-[13px] md:text-[14px] leading-[1.6] text-[var(--on-dark-muted)] font-sans">
              Selected Elpix property imagery, highlighting spaces designed for modern living and long-term value.
            </p>
          </div>
        </div>

        {/* Vertical List of 8 Rows */}
        <div className="flex flex-col border-b border-[var(--line-dark)]">
          {PROPERTIES.map((property, idx) => (
            <div
              key={property.id}
              className={`group cursor-pointer border-t border-[var(--line-dark)] py-10 md:py-16 transition-all duration-700 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${Math.min(idx * 75, 400)}ms` }}
            >
              <div className="flex flex-col md:flex-row items-stretch justify-between gap-8 lg:gap-16">
                
                {/* Left Column: Image (~64% width desktop, 58% tablet), 16/10 aspect ratio */}
                <div className="w-full md:w-[58%] lg:w-[64%] shrink-0">
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/40">
                    <Image
                      src={property.image}
                      alt={property.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 58vw, 64vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      loading="lazy"
                    />

                    {/* Small Badge top-left corner */}
                    <div className="absolute top-4 left-4 z-10 px-2.5 py-1 text-[8px] font-sans uppercase tracking-[0.15em] bg-[var(--badge)] text-[var(--ink)] font-semibold shadow-sm">
                      {property.badge}
                    </div>
                  </div>
                </div>

                {/* Right Column: Meta, Title, Description, and 40px Circular Button */}
                <div className="w-full md:w-[36%] lg:w-[30%] flex flex-col justify-between py-2 md:py-4">
                  <div className="flex flex-col space-y-3">
                    {/* Meta line */}
                    <span className="font-sans text-[10px] md:text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--on-dark-muted)]">
                      ELPIX PROPERTY · {property.category.toUpperCase()}
                    </span>

                    {/* H3 Title */}
                    <h3 className="font-serif font-light text-[clamp(28px,3vw,44px)] leading-[1.1] text-[var(--on-dark)]">
                      {property.name}
                    </h3>

                    {/* Description */}
                    <p className="font-sans text-[12px] md:text-[13px] leading-[1.6] text-[var(--on-dark-muted)] line-clamp-3">
                      {property.description}
                    </p>
                  </div>

                  {/* 40px Circular Outline Button at bottom-right */}
                  <div className="flex justify-end pt-6 md:pt-8">
                    <div className="w-[40px] h-[40px] rounded-full border border-[var(--line-dark)] flex items-center justify-center text-sm text-[var(--on-dark)] transition-all duration-300 group-hover:bg-[var(--on-dark)] group-hover:text-[var(--dark)] group-hover:border-[var(--on-dark)] shrink-0">
                      ↗
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
