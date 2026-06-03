"use client";

import { useEffect, useState } from "react";

const SCROLL_TARGET_ID = "destaques";

export function HeroScrollHint() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const hide = () => {
      if (window.scrollY > 48) setVisible(false);
    };
    hide();
    window.addEventListener("scroll", hide, { passive: true });
    return () => window.removeEventListener("scroll", hide);
  }, []);

  if (!visible) return null;

  return (
    <a
      href={`#${SCROLL_TARGET_ID}`}
      className="absolute inset-x-0 bottom-6 z-20 flex flex-col items-center gap-2 text-neutral-400 transition hover:text-white md:bottom-8"
      aria-label="Role para ver mais conteúdo"
    >
      <span className="text-[10px] font-medium uppercase tracking-[0.35em]">
        Explorar
      </span>
      <span
        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-sm"
        aria-hidden
      >
        <svg
          className="h-4 w-4 animate-bounce"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M12 5v14M6 13l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </a>
  );
}
