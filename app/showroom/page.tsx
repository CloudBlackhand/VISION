import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ShowroomCatalog } from "@/components/showroom/ShowroomCatalog";
import { INVENTORY, SHOWROOM_META, SHOWROOM_STATS } from "@/lib/inventory";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Showroom",
  description: "Estoque de seminovos VISION — São Paulo.",
};

export default function ShowroomPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-black pt-20">
        <header className="mx-auto max-w-6xl px-6 pb-10 pt-12 md:px-10">
          <p className="text-xs font-medium uppercase tracking-[0.5em] text-neutral-500">
            VISION · Seminovos
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold text-white md:text-6xl">
            Showroom
          </h1>
          <p className="mt-4 max-w-xl text-sm text-neutral-400 md:text-base">
            {SHOWROOM_STATS.availableCount} unidades disponíveis de{" "}
            {SHOWROOM_STATS.totalCount} anunciadas. Use a busca e os filtros
            para encontrar o veículo ideal.
          </p>

          <div className="mt-8 flex flex-col gap-4 border border-white/10 bg-neutral-950/50 p-5 text-sm text-neutral-400 md:flex-row md:items-center md:justify-between md:gap-8">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-neutral-500">
                Unidade
              </p>
              <p className="mt-1 text-neutral-300">{SHOWROOM_META.address}</p>
            </div>
            <div className="md:text-right">
              <p className="text-[10px] uppercase tracking-widest text-neutral-500">
                Estoque atualizado em
              </p>
              <p className="mt-1 text-neutral-300">{SHOWROOM_META.lastUpdated}</p>
            </div>
          </div>

          <p className="mt-4 text-xs text-neutral-600">
            {SHOWROOM_META.financingNote}
          </p>
        </header>

        <ShowroomCatalog cars={INVENTORY} />

        <div className="h-32" />
      </main>
      <SiteFooter />
    </>
  );
}
