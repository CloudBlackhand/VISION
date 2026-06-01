import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function ContactCTA() {
  const whatsappUrl = buildWhatsAppUrl();

  return (
    <section
      id="contato"
      className="border-t border-white/10 bg-black px-6 py-24 md:px-10"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-medium uppercase tracking-[0.45em] text-neutral-500">
          Contato
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold text-white md:text-5xl">
          Fale conosco
        </h2>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex items-center justify-center border border-white bg-white px-10 py-4 text-sm font-semibold uppercase tracking-widest text-black transition hover:bg-black hover:text-white"
        >
          WhatsApp
        </a>
      </div>
    </section>
  );
}
