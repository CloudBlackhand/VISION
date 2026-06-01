import Image from "next/image";
import Link from "next/link";
import { getStatusLabel, type SaleCar } from "@/lib/inventory";

type CarCardProps = {
  car: SaleCar;
};

export function CarCard({ car }: CarCardProps) {
  const isUnavailable = car.status !== "available";
  const statusLabel = getStatusLabel(car.status);

  return (
    <article
      className={`group flex flex-col border border-white/10 bg-black transition hover:border-white ${
        isUnavailable ? "opacity-75" : ""
      }`}
    >
      <Link
        href={`/showroom/${car.id}`}
        className="relative flex aspect-[4/3] overflow-hidden border-b border-white/10 bg-neutral-950"
      >
        <Image
          src={car.image}
          alt={`${car.name} ${car.version} ${car.year}`}
          fill
          className={`object-cover transition duration-500 group-hover:scale-[1.02] ${
            isUnavailable ? "grayscale" : ""
          }`}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {isUnavailable && (
          <span className="absolute inset-0 flex items-center justify-center bg-black/55">
            <span className="border border-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white">
              {statusLabel}
            </span>
          </span>
        )}
        <span className="absolute left-3 top-3 bg-black/80 px-2 py-1 text-[10px] uppercase tracking-widest text-neutral-400">
          {car.listingCode}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <Link href={`/showroom/${car.id}`} className="block">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-display text-xl font-semibold text-white transition group-hover:underline">
                {car.name}
              </h2>
              <p className="mt-1 text-sm text-neutral-500">
                {car.version} · {car.year}
              </p>
            </div>
            <p className="shrink-0 text-right font-display text-lg text-white">
              {car.price}
            </p>
          </div>
          {car.installmentFrom && car.status === "available" && (
            <p className="mt-2 text-xs text-neutral-500">
              A partir de{" "}
              <span className="text-neutral-300">{car.installmentFrom}</span>
            </p>
          )}
        </Link>

        <ul className="mt-6 space-y-2 border-t border-white/10 pt-6 text-sm text-neutral-400">
          <li className="flex justify-between">
            <span>Km</span>
            <span className="text-neutral-300">{car.mileage}</span>
          </li>
          <li className="flex justify-between">
            <span>Câmbio</span>
            <span className="text-neutral-300">{car.transmission}</span>
          </li>
          <li className="flex justify-between">
            <span>Cor</span>
            <span className="text-neutral-300">{car.color}</span>
          </li>
        </ul>

        <Link
          href={`/showroom/${car.id}`}
          className="mt-6 inline-flex w-full items-center justify-center border border-white py-3 text-xs font-semibold uppercase tracking-widest text-white transition group-hover:bg-white group-hover:text-black"
        >
          {isUnavailable ? "Ver ficha" : "Ver detalhes"}
        </Link>
      </div>
    </article>
  );
}
