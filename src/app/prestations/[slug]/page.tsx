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
        <Link
          href="/prestations"
          className="inline-flex items-center gap-2 mb-8 text-gray-600 hover:text-pink-600 transition-colors"
        >
          ← Retour aux prestations
        </Link>
        <button>
          <Link href="https://www.planity.com/ad-esthetique-37100-tours">
            Réservez en ligne
          </Link>
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {category.subcategories.map((subcat) => (
            <div
              key={subcat.id}
              className="flex flex-col bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
            >
              {/* Header de la carte (Image + Titre) */}
              {subcat.image && (
                <div className="h-48 w-full overflow-hidden">
                  <Image
                    src={subcat.image}
                    alt={subcat.label}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="p-8">
                <h2 className="text-2xl font-serif text-center text-slate-700 mb-2">
                  {subcat.label}
                </h2>
                <div className="w-16 h-0.5 bg-amber-200 mx-auto mb-8"></div>
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
                      <div key={service.id} className="group">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium text-gray-700 group-hover:text-pink-600 transition-colors">
                            {service.label}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 text-sm">
                          <span className="text-gray-400">
                            {service.duration}mn
                          </span>

                          {hasActiveDiscount ? (
                            <>
                              <span className="text-gray-400 line-through">
                                {originalPrice}€
                              </span>

                              <span className="font-bold text-pink-600">
                                {discountedPrice}€
                              </span>
                            </>
                          ) : (
                            <span className="font-bold text-gray-600">
                              {originalPrice}€
                            </span>
                          )}
                        </div>

                        <div className="mt-4 border-b border-dotted border-gray-200 last:hidden"></div>
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
