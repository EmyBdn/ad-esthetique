import Hero from "@/components/Hero";
import { prisma } from "../../../lib/prisma";
import Link from "next/link";
import Image from "next/image";

export default async function PrestationsPage() {
  const categories = await prisma.category.findMany({
    orderBy: {
      position: "asc",
    },
  });

  return (
    <div>
      <Hero title="Prestations" imageSrc="/images/hero-salon.jpg" />
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/prestations/${category.slug}`}
              className="group block overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-xl border border-gray-100 hover:-translate-y-1"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-gray-200">
                {category.image ? (
                  <Image
                    src={category.image}
                    alt={category.label}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-gray-400">
                    Image non disponible
                  </div>
                )}
              </div>

              {/* Contenu de la carte */}
              <div className="p-6">
                <h3 className="mb-2 text-xl font-semibold text-gray-800 group-hover:text-pink-600 transition-colors">
                  {category.label}
                </h3>

                {category.description && (
                  <p className="mb-4 text-sm text-gray-600 line-clamp-2">
                    {category.description}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>

        {categories.length === 0 && (
          <p className="text-center text-gray-500">
            Aucune catégorie n'est disponible pour le moment.
          </p>
        )}
      </section>
    </div>
  );
}
