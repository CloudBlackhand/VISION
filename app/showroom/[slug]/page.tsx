import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { CarDetailView } from "@/components/showroom/CarDetailView";
import { getAllSaleCarIds, getSaleCarById } from "@/lib/inventory";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllSaleCarIds().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const car = getSaleCarById(slug);

  if (!car) {
    return { title: "Veículo não encontrado" };
  }

  return {
    title: car.name,
    description: car.description,
  };
}

export default async function CarDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const car = getSaleCarById(slug);

  if (!car) {
    notFound();
  }

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-black pt-20">
        <div className="mx-auto max-w-6xl px-6 py-12 md:px-10 md:py-16">
          <CarDetailView car={car} />
        </div>
        <div className="h-24" />
      </main>
      <SiteFooter />
    </>
  );
}
