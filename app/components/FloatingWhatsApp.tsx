"use client";

export default function FloatingWhatsApp() {
  return (
    <aside
      className="fixed right-6 z-50 transition-all duration-300 pointer-events-auto"
      style={{
        bottom: "calc(1.5rem + env(safe-area-inset-bottom, 0px))",
      }}
    >
      <a
        href="https://wa.me/6282324393309"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact Elpix Properties on WhatsApp"
        className="flex items-center gap-3 px-4 py-2.5 sm:px-5 sm:py-3 rounded-full bg-[var(--wa-green)] text-white shadow-xl shadow-black/20 hover:scale-[1.03] active:scale-[0.98] transition-transform duration-200"
      >
        {/* Left: White WhatsApp icon in a translucent circle */}
        <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center shrink-0">
          <svg
            className="w-4 h-4 fill-white"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.461c-1.854 0-3.674-.499-5.267-1.442l-.377-.225-3.916 1.027 1.045-3.819-.247-.393c-1.036-1.648-1.583-3.557-1.582-5.51 0-5.632 4.582-10.214 10.215-10.214 2.73 0 5.295 1.063 7.222 2.992 1.928 1.929 2.99 4.493 2.99 7.223 0 5.633-4.583 10.214-10.073 10.214m0-18.665c-4.664 0-8.46 3.796-8.46 8.451 0 1.637.472 3.238 1.366 4.621l.542.846-.628 2.296 2.348-.616.818.486c1.33.79 2.854 1.206 4.414 1.206 4.664 0 8.46-3.796 8.46-8.451 0-4.656-3.8-8.452-8.86-8.452" />
          </svg>
        </div>

        {/* Right: Two lines of white text */}
        <div className="flex flex-col text-left leading-tight">
          <span className="font-sans text-[9px] uppercase font-medium tracking-wider text-white/90">
            WHATSAPP
          </span>
          <span className="font-sans text-[12px] font-semibold tracking-wide text-white">
            +62 823-2439-3309
          </span>
        </div>
      </a>
    </aside>
  );
}
