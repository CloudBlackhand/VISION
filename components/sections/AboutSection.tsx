import { ABOUT, SITE } from "@/lib/content";

export function AboutSection() {
  return (
    <section
      id="sobre"
      className="border-t border-white/10 bg-black px-6 py-24 md:px-10"
    >
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:items-start">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.45em] text-neutral-500">
            {SITE.name}
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-white md:text-5xl">
            {ABOUT.title}
          </h2>
        </div>
        <div className="space-y-6 border-l border-white/10 pl-8 text-sm leading-relaxed text-neutral-400 md:text-base">
          {ABOUT.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
