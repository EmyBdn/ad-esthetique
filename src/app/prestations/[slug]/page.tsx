import { prisma } from "../../../../lib/prisma";
import Hero from "@/components/Hero";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { applyDiscount, isDiscountActive } from "@/utils/discounts";

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
            className="inline-flex items-center text-sm font-medium text-[#1A2F1A]/70 transition hover:text-[#1A2F1A]"
          >
            ← Retour aux prestations
          </Link>

          <Link
            href="https://www.planity.com/ad-esthetique-37100-tours"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-[#1A2F1A] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#B7D8A8] hover:text-[#1A2F1A]"
          >
            Réserver en ligne
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {category.subcategories.map((subcat) => (
            <div
              key={subcat.id}
              className="group flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-md"
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
                <h2 className="text-xl font-semibold text-center text-slate-700 mb-2">
                  {subcat.label}
                </h2>
                <div className="w-16 h-0.5 bg-green-300 mx-auto mb-8"></div>
                <div className="space-y-6">
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
                        className="border-b border-[#1A2F1A]/10 pb-5 last:border-0 last:pb-0"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="font-medium text-[#1A2F1A]">
                              {service.label}
                            </h3>
                            {service.duration && (
                              <p className="mt-1 text-sm text-[#1A2F1A]/55">
                                {service.duration} min
                              </p>
                            )}
                          </div>

                          <div className="shrink-0 text-right">
                            {hasActiveDiscount ? (
                              <>
                                <p className="text-sm text-[#1A2F1A]/40 line-through">
                                  {originalPrice}€
                                </p>
                                <p className="font-semibold text-pink-600">
                                  {discountedPrice}€
                                </p>
                              </>
                            ) : (
                              <p className="font-semibold text-[#1A2F1A]">
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
          <p className="text-center text-gray-500 py-20">
            Aucune prestation n'est disponible dans cette catégorie.
          </p>
        )}
      </main>
    </>
  );
}
