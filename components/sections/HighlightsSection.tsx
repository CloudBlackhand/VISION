import { HIGHLIGHTS } from "@/lib/content";

export function HighlightsSection() {
  return (
    <section
      id="destaques"
      className="border-t border-white/10 bg-black px-6 py-24 md:px-10"
    >
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-medium uppercase tracking-[0.45em] text-neutral-500">
          Por que VISION
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold text-white md:text-4xl">
          Destaques
        </h2>

        <div className="mt-14 grid gap-px bg-white/10 md:grid-cols-3">
          {HIGHLIGHTS.map((item) => (
            <article
              key={item.title}
              className="group bg-black p-8 transition hover:bg-white hover:text-black"
            >
              <span
                className="font-display text-2xl text-white group-hover:text-black"
                aria-hidden
              >
                {item.icon}
              </span>
              <h3 className="mt-6 text-lg font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-400 group-hover:text-neutral-700">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
