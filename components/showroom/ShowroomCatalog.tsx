"use client";

import { useMemo, useState } from "react";
import type { SaleCar } from "@/lib/inventory";
import {
  countActiveFilters,
  DEFAULT_SHOWROOM_FILTERS,
  filterAndSortInventory,
  getUniqueFuels,
  type ShowroomFilters,
  type ShowroomPriceRange,
  type ShowroomSort,
  type ShowroomStatusFilter,
  type ShowroomTransmissionFilter,
} from "@/lib/showroom-filters";
import { CarCard } from "./CarCard";

type ShowroomCatalogProps = {
  cars: SaleCar[];
};

const STATUS_OPTIONS: { value: ShowroomStatusFilter; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "available", label: "Disponíveis" },
  { value: "reserved", label: "Reservados" },
  { value: "sold", label: "Vendidos" },
];

const TRANSMISSION_OPTIONS: {
  value: ShowroomTransmissionFilter;
  label: string;
}[] = [
  { value: "all", label: "Qualquer câmbio" },
  { value: "automatic", label: "Automático" },
  { value: "manual", label: "Manual" },
];

const PRICE_OPTIONS: { value: ShowroomPriceRange; label: string }[] = [
  { value: "all", label: "Qualquer preço" },
  { value: "under-60", label: "Até R$ 60 mil" },
  { value: "60-100", label: "R$ 60–100 mil" },
  { value: "100-150", label: "R$ 100–150 mil" },
  { value: "over-150", label: "Acima de R$ 150 mil" },
];

const SORT_OPTIONS: { value: ShowroomSort; label: string }[] = [
  { value: "default", label: "Padrão" },
  { value: "price-asc", label: "Menor preço" },
  { value: "price-desc", label: "Maior preço" },
  { value: "year-desc", label: "Ano mais novo" },
  { value: "mileage-asc", label: "Menor km" },
];

function selectClassName() {
  return "w-full border border-white/20 bg-black px-3 py-2.5 text-sm text-white outline-none transition focus:border-white";
}

export function ShowroomCatalog({ cars }: ShowroomCatalogProps) {
  const [filters, setFilters] = useState<ShowroomFilters>(
    DEFAULT_SHOWROOM_FILTERS,
  );
  const fuels = useMemo(() => getUniqueFuels(cars), [cars]);

  const filtered = useMemo(
    () => filterAndSortInventory(cars, filters),
    [cars, filters],
  );

  const activeCount = countActiveFilters(filters);
  const showGrouped =
    filters.status === "all" &&
    !filters.query.trim() &&
    filters.sort === "default" &&
    filters.transmission === "all" &&
    filters.fuel === "all" &&
    filters.priceRange === "all";

  const available = filtered.filter((c) => c.status === "available");
  const others = filtered.filter((c) => c.status !== "available");

  function patch(partial: Partial<ShowroomFilters>) {
    setFilters((prev) => ({ ...prev, ...partial }));
  }

  function clearFilters() {
    setFilters(DEFAULT_SHOWROOM_FILTERS);
  }

  return (
    <div>
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="border border-white/10 bg-neutral-950/80 p-5 md:p-6">
          <label htmlFor="showroom-search" className="sr-only">
            Buscar veículos
          </label>
          <div className="relative">
            <input
              id="showroom-search"
              type="search"
              placeholder="Buscar por modelo, versão, cor, código…"
              value={filters.query}
              onChange={(e) => patch({ query: e.target.value })}
              className="w-full border border-white/20 bg-black py-3 pl-4 pr-10 text-sm text-white placeholder:text-neutral-600 outline-none transition focus:border-white"
              autoComplete="off"
            />
            {filters.query && (
              <button
                type="button"
                onClick={() => patch({ query: "" })}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs uppercase tracking-widest text-neutral-500 transition hover:text-white"
                aria-label="Limpar busca"
              >
                ✕
              </button>
            )}
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <div>
              <label
                htmlFor="filter-status"
                className="mb-1.5 block text-[10px] uppercase tracking-widest text-neutral-500"
              >
                Status
              </label>
              <select
                id="filter-status"
                value={filters.status}
                onChange={(e) =>
                  patch({
                    status: e.target.value as ShowroomStatusFilter,
                  })
                }
                className={selectClassName()}
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="filter-transmission"
                className="mb-1.5 block text-[10px] uppercase tracking-widest text-neutral-500"
              >
                Câmbio
              </label>
              <select
                id="filter-transmission"
                value={filters.transmission}
                onChange={(e) =>
                  patch({
                    transmission: e.target
                      .value as ShowroomTransmissionFilter,
                  })
                }
                className={selectClassName()}
              >
                {TRANSMISSION_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="filter-fuel"
                className="mb-1.5 block text-[10px] uppercase tracking-widest text-neutral-500"
              >
                Combustível
              </label>
              <select
                id="filter-fuel"
                value={filters.fuel}
                onChange={(e) => patch({ fuel: e.target.value })}
                className={selectClassName()}
              >
                <option value="all">Qualquer</option>
                {fuels.map((fuel) => (
                  <option key={fuel} value={fuel}>
                    {fuel}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="filter-price"
                className="mb-1.5 block text-[10px] uppercase tracking-widest text-neutral-500"
              >
                Preço
              </label>
              <select
                id="filter-price"
                value={filters.priceRange}
                onChange={(e) =>
                  patch({
                    priceRange: e.target.value as ShowroomPriceRange,
                  })
                }
                className={selectClassName()}
              >
                {PRICE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="filter-sort"
                className="mb-1.5 block text-[10px] uppercase tracking-widest text-neutral-500"
              >
                Ordenar
              </label>
              <select
                id="filter-sort"
                value={filters.sort}
                onChange={(e) =>
                  patch({ sort: e.target.value as ShowroomSort })
                }
                className={selectClassName()}
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-neutral-400">
              <span className="text-white">{filtered.length}</span> de{" "}
              {cars.length} veículos
              {activeCount > 0 && (
                <span className="text-neutral-600">
                  {" "}
                  · {activeCount} filtro{activeCount > 1 ? "s" : ""} ativo
                  {activeCount > 1 ? "s" : ""}
                </span>
              )}
            </p>
            {activeCount > 0 && (
              <button
                type="button"
                onClick={clearFilters}
                className="self-start border border-white/30 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition hover:border-white sm:self-auto"
              >
                Limpar filtros
              </button>
            )}
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="mx-auto mt-16 max-w-md px-6 text-center md:px-10">
          <p className="font-display text-xl text-white">
            Nenhum veículo encontrado
          </p>
          <p className="mt-3 text-sm text-neutral-500">
            Tente outro termo de busca ou remova alguns filtros.
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-8 border border-white px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-white hover:text-black"
          >
            Ver todo o estoque
          </button>
        </div>
      ) : showGrouped && others.length > 0 ? (
        <>
          {available.length > 0 && (
            <section className="mt-12">
              <div className="mx-auto max-w-6xl px-6 md:px-10">
                <h2 className="text-xs font-medium uppercase tracking-[0.45em] text-neutral-500">
                  Disponíveis agora
                </h2>
              </div>
              <CatalogGrid cars={available} />
            </section>
          )}
          <section className="mt-16">
            <div className="mx-auto max-w-6xl px-6 md:px-10">
              <h2 className="text-xs font-medium uppercase tracking-[0.45em] text-neutral-500">
                Reservados e vendidos
              </h2>
            </div>
            <CatalogGrid cars={others} />
          </section>
        </>
      ) : (
        <section className="mt-12">
          <CatalogGrid cars={filtered} />
        </section>
      )}
    </div>
  );
}

function CatalogGrid({ cars }: { cars: SaleCar[] }) {
  return (
    <div className="mx-auto mt-6 grid max-w-6xl grid-cols-1 gap-8 px-6 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3 lg:gap-12 md:px-10">
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
}
