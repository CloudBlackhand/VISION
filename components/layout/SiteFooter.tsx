import { SITE } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black px-6 py-8 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-center text-xs text-neutral-500 md:flex-row md:text-left">
        <p>
          © {new Date().getFullYear()} {SITE.name}. Todos os direitos reservados.
        </p>
        <p className="text-neutral-600">{SITE.tagline}</p>
      </div>
    </footer>
  );
}
