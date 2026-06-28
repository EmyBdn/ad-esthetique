import { prisma } from "../../../../lib/prisma";
import Hero from "@/components/Hero";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { applyDiscount, isDiscountActive } from "@/utils/discounts";
import { ChevronLeft } from "lucide-react";

export default async function PrestationDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const category = await prisma.category.findUnique({
    where: { slug },
    include: {
      discount: true,

      subcategories: {
        include: {
          discount: true,

          services: {
            include: {
              discount: true,
            },
            orderBy: {
              position: "asc",
            },
          },
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if (!category) {
    notFound();
  }

  return (
    <>
      <Hero title={category.label} imageSrc="/images/hero-salon.jpg" />

      <main className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/prestations"
            className="inline-flex items-center gap-1.5 text-sm text-[#394B39]/60 transition-colors duration-200 hover:text-[#394B39]"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Retour aux prestations</span>
          </Link>

          <Link
            href="https://www.planity.com/ad-esthetique-37100-tours"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-[#394B39] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#B7D8A8] hover:text-[#394B39]"
          >
            Réserver en ligne
          </Link>
        </div>

        <div
          className={`grid grid-cols-1 gap-8 justify-center ${
            category.subcategories.length === 1
              ? "max-w-sm mx-auto"
              : category.subcategories.length === 2
                ? "sm:grid-cols-2 max-w-3xl mx-auto"
                : "sm:grid-cols-2 xl:grid-cols-3"
          }`}
        >
          {category.subcategories.map((subcat) => (
            <div
              key={subcat.id}
              className="group flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm"
            >
              {subcat.image && (
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    fill
                    src={subcat.image}
                    alt={subcat.label}
                    className="object-cover"
                  />
                </div>
              )}

              <div className="p-8">
                <h2 className="mb-4 text-center font-serif text-2xl leading-none tracking-tight text-[#394B39]">
                  {subcat.label}
                </h2>

                <div className="mx-auto mb-5 h-px w-20 bg-gradient-to-r from-transparent via-[#B7D8A8] to-transparent" />

                <div className="space-y-4">
                  {subcat.services.map((service) => {
                    const originalPrice = Number(service.price);

                    const activeDiscount =
                      service.discount ?? subcat.discount ?? category.discount;

                    const hasActiveDiscount =
                      activeDiscount &&
                      isDiscountActive(
                        activeDiscount.startDate,
                        activeDiscount.endDate,
                      );

                    const discountedPrice = hasActiveDiscount
                      ? applyDiscount(
                          originalPrice,
                          activeDiscount.discountType,
                          Number(activeDiscount.value),
                        )
                      : originalPrice;

                    return (
                      <div
                        key={service.id}
                        className="border-b border-[#1A2F1A]/10 pb-4 last:border-0 last:pb-0"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-medium text-[#394B39]">
                              {service.label}
                            </h3>

                            {service.duration && (
                              <p className="text-sm text-[#1A2F1A]/55">
                                {service.duration} min
                              </p>
                            )}
                          </div>

                          <div className="shrink-0 text-right">
                            {hasActiveDiscount ? (
                              <>
                                <p className="text-sm text-[#394B39]/40 line-through">
                                  {originalPrice}€
                                </p>

                                <p className="font-semibold text-[#394B39]">
                                  {discountedPrice}€
                                </p>
                              </>
                            ) : (
                              <p className="font-semibold text-[#394B39]">
                                {originalPrice}€
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {category.subcategories.length === 0 && (
          <p className="py-20 text-center text-gray-500">
            Aucune prestation n'est disponible dans cette catégorie.
          </p>
        )}
      </main>
    </>
  );
}
