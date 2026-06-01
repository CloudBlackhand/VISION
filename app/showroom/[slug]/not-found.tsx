import Link from "next/link";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

export default function CarNotFound() {
  return (
    <>
      <SiteHeader />
      <main className="flex min-h-screen flex-col items-center justify-center bg-black px-6 pt-20 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-neutral-500">
          404
        </p>
        <h1 className="mt-4 font-display text-3xl font-bold text-white">
          Veículo não encontrado
        </h1>
        <Link
          href="/showroom"
          className="mt-8 border border-white px-8 py-3 text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-white hover:text-black"
        >
          Voltar ao showroom
        </Link>
      </main>
      <SiteFooter />
    </>
  );
}
