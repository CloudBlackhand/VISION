import Link from "next/link";
import { SITE } from "@/lib/content";

export function SiteHeader() {
  return (
    <header className="fixed top-0 z-20 w-full bg-transparent">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
        <Link
          href="/"
          className="font-display text-lg font-bold tracking-[0.2em] text-white"
        >
          {SITE.name}
        </Link>
        <nav className="flex items-center gap-6 text-sm text-neutral-400 md:gap-8">
          <Link href="/showroom" className="transition hover:text-white">
            Showroom
          </Link>
          <Link href="/#sobre" className="hidden transition hover:text-white md:inline">
            Sobre
          </Link>
          <Link href="/#contato" className="transition hover:text-white">
            Contato
          </Link>
        </nav>
      </div>
    </header>
  );
}
