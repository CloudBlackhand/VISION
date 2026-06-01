import type { CarStatus, SaleCar } from "./inventory";

export type ShowroomStatusFilter = "all" | CarStatus;
export type ShowroomTransmissionFilter = "all" | "automatic" | "manual";
export type ShowroomPriceRange =
  | "all"
  | "under-60"
  | "60-100"
  | "100-150"
  | "over-150";
export type ShowroomSort =
  | "default"
  | "price-asc"
  | "price-desc"
  | "year-desc"
  | "mileage-asc";

export type ShowroomFilters = {
  query: string;
  status: ShowroomStatusFilter;
  transmission: ShowroomTransmissionFilter;
  fuel: string;
  priceRange: ShowroomPriceRange;
  sort: ShowroomSort;
};

export const DEFAULT_SHOWROOM_FILTERS: ShowroomFilters = {
  query: "",
  status: "all",
  transmission: "all",
  fuel: "all",
  priceRange: "all",
  sort: "default",
};

export function parsePriceBrl(price: string): number {
  const digits = price.replace(/\D/g, "");
  return digits ? Number(digits) : 0;
}

export function parseMileageKm(mileage: string): number {
  const digits = mileage.replace(/\D/g, "");
  return digits ? Number(digits) : 0;
}

function normalizeText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase();
}

function isAutomaticTransmission(transmission: string): boolean {
  const t = normalizeText(transmission);
  return t.includes("automatico") || t.includes("cvt");
}

export function getUniqueFuels(cars: SaleCar[]): string[] {
  return [...new Set(cars.map((c) => c.fuel))].sort((a, b) =>
    a.localeCompare(b, "pt-BR"),
  );
}

function matchesPriceRange(price: number, range: ShowroomPriceRange): boolean {
  switch (range) {
    case "under-60":
      return price < 60_000;
    case "60-100":
      return price >= 60_000 && price < 100_000;
    case "100-150":
      return price >= 100_000 && price < 150_000;
    case "over-150":
      return price >= 150_000;
    default:
      return true;
  }
}

function statusRank(status: CarStatus): number {
  switch (status) {
    case "available":
      return 0;
    case "reserved":
      return 1;
    default:
      return 2;
  }
}

export function filterAndSortInventory(
  cars: SaleCar[],
  filters: ShowroomFilters,
): SaleCar[] {
  const q = normalizeText(filters.query.trim());

  let result = cars.filter((car) => {
    if (filters.status !== "all" && car.status !== filters.status) {
      return false;
    }

    if (filters.transmission !== "all") {
      const auto = isAutomaticTransmission(car.transmission);
      if (filters.transmission === "automatic" && !auto) return false;
      if (filters.transmission === "manual" && auto) return false;
    }

    if (filters.fuel !== "all" && car.fuel !== filters.fuel) {
      return false;
    }

    const price = parsePriceBrl(car.price);
    if (!matchesPriceRange(price, filters.priceRange)) {
      return false;
    }

    if (!q) return true;

    const haystack = normalizeText(
      [
        car.name,
        car.version,
        car.listingCode,
        car.color,
        car.fuel,
        car.transmission,
        String(car.year),
        car.description,
        ...car.highlights,
      ].join(" "),
    );

    return haystack.includes(q);
  });

  result = [...result];

  switch (filters.sort) {
    case "price-asc":
      result.sort((a, b) => parsePriceBrl(a.price) - parsePriceBrl(b.price));
      break;
    case "price-desc":
      result.sort((a, b) => parsePriceBrl(b.price) - parsePriceBrl(a.price));
      break;
    case "year-desc":
      result.sort((a, b) => b.year - a.year);
      break;
    case "mileage-asc":
      result.sort(
        (a, b) => parseMileageKm(a.mileage) - parseMileageKm(b.mileage),
      );
      break;
    default:
      result.sort((a, b) => {
        const byStatus = statusRank(a.status) - statusRank(b.status);
        if (byStatus !== 0) return byStatus;
        return a.name.localeCompare(b.name, "pt-BR");
      });
  }

  return result;
}

export function countActiveFilters(filters: ShowroomFilters): number {
  let n = 0;
  if (filters.query.trim()) n += 1;
  if (filters.status !== "all") n += 1;
  if (filters.transmission !== "all") n += 1;
  if (filters.fuel !== "all") n += 1;
  if (filters.priceRange !== "all") n += 1;
  if (filters.sort !== "default") n += 1;
  return n;
}
