import Image from "next/image";
import Link from "next/link";
import { getStatusLabel, type SaleCar } from "@/lib/inventory";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

type CarDetailViewProps = {
  car: SaleCar;
};

export function CarDetailView({ car }: CarDetailViewProps) {
  const whatsappUrl = buildWhatsAppUrl(car);
  const isAvailable = car.status === "available";
  const statusLabel = getStatusLabel(car.status);

  const specs = [
    { label: "Ano", value: String(car.year) },
    { label: "Versão", value: car.version },
    { label: "Quilometragem", value: car.mileage },
    { label: "Câmbio", value: car.transmission },
    { label: "Combustível", value: car.fuel },
    { label: "Cor", value: car.color },
    { label: "Código", value: car.listingCode },
  ];

  return (
    <article>
      <Link
        href="/showroom"
        className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-neutral-500 transition hover:text-white"
      >
        ← Voltar ao showroom
      </Link>

      <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-[4/3] overflow-hidden border border-white/10 bg-neutral-950 lg:aspect-square lg:min-h-[420px]">
          <Image
            src={car.image}
            alt={`${car.name} ${car.version}`}
            fill
            className={`object-cover ${car.status !== "available" ? "grayscale" : ""}`}
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
          {car.status !== "available" && (
            <span className="absolute inset-0 flex items-center justify-center bg-black/50">
              <span className="border border-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.4em] text-white">
                {statusLabel}
              </span>
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <p
            className={`text-xs font-medium uppercase tracking-[0.45em] ${
              isAvailable ? "text-neutral-500" : "text-neutral-400"
            }`}
          >
            {statusLabel}
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold text-white md:text-5xl">
            {car.name}
          </h1>
          <p className="mt-2 text-sm text-neutral-500">{car.version}</p>
          <p className="mt-6 font-display text-3xl text-white md:text-4xl">
            {car.price}
          </p>
          {car.installmentFrom && isAvailable && (
            <p className="mt-2 text-sm text-neutral-400">
              Parcelas estimadas a partir de{" "}
              <span className="text-white">{car.installmentFrom}</span>
            </p>
          )}

          <dl className="mt-10 grid grid-cols-2 gap-px border border-white/10 bg-white/10">
            {specs.map((spec) => (
              <div
                key={spec.label}
                className={`bg-black p-4 ${spec.label === "Versão" ? "col-span-2" : ""}`}
              >
                <dt className="text-[10px] uppercase tracking-widest text-neutral-500">
                  {spec.label}
                </dt>
                <dd className="mt-1 text-sm text-white">{spec.value}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-10 text-sm leading-relaxed text-neutral-400 md:text-base">
            {car.description}
          </p>

          <div className="mt-10 border-t border-white/10 pt-10">
            <h2 className="text-xs font-medium uppercase tracking-[0.4em] text-neutral-500">
              Destaques
            </h2>
            <ul className="mt-4 space-y-3">
              {car.highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-neutral-300"
                >
                  <span
                    className="mt-1.5 h-px w-4 shrink-0 bg-white"
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-12 flex flex-col gap-3 sm:flex-row">
            {isAvailable ? (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center border border-white bg-white px-8 py-4 text-xs font-semibold uppercase tracking-widest text-black transition hover:bg-black hover:text-white"
              >
                Falar no WhatsApp
              </a>
            ) : (
              <p className="flex-1 border border-white/20 px-8 py-4 text-center text-xs uppercase tracking-widest text-neutral-500">
                Este veículo não está mais disponível para negociação
              </p>
            )}
            <Link
              href="/showroom"
              className="inline-flex flex-1 items-center justify-center border border-white/30 px-8 py-4 text-xs font-semibold uppercase tracking-widest text-white transition hover:border-white"
            >
              Ver outros carros
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
