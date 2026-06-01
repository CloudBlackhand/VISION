import type { SaleCar } from "./inventory";

const DEFAULT_WHATSAPP = "5511999999999";

export function getWhatsAppNumber(): string {
  const raw = process.env.NEXT_PUBLIC_WHATSAPP ?? DEFAULT_WHATSAPP;
  return raw.replace(/\D/g, "");
}

export function buildWhatsAppUrl(car?: SaleCar): string {
  const number = getWhatsAppNumber();
  const message = car
    ? `Olá! Tenho interesse no ${car.name} (${car.year}) — ${car.price}. Vim pelo showroom VISION.`
    : "Olá! Vim pelo site VISION e gostaria de mais informações.";
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
