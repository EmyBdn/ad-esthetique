import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Carte cadeau",
  description:
    "Offrez un moment de bien-être à vos proches avec une carte cadeau.",
};

export default function GiftCardPage() {
  return (
    <div>
      <Hero title="Carte cadeau" imageSrc="/images/hero-salon.jpg" />

      <main className="mx-auto max-w-6xl px-5 py-12 sm:px-6 lg:py-20">
        <section className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100 shadow-sm">
            <Image
              src="/images/carte-cadeau.jpg"
              alt="Carte cadeau AD Esthétique"
              fill
              className="object-cover"
            />
          </div>

          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-[#1A2F1A]/70">
              Offrir du bien-être
            </p>

            <h2 className="font-serif text-3xl leading-tight text-[#1A2F1A] sm:text-4xl">
              Une attention douce et personnalisée
            </h2>

            <p className="mt-6 text-base leading-relaxed text-[#1A2F1A]/80">
              Offrez un moment de bien-être à vos proches : massage, soin du
              visage, soin des mains ou des pieds… choisissez la prestation ou
              le montant de votre choix.
            </p>

            <ul className="mt-6 space-y-3 text-[#1A2F1A]/80">
              <li>Valable 6 mois</li>
              <li>Message personnalisé</li>
            </ul>

            <div className="mt-8 rounded-2xl bg-[#FAF8F4] p-5">
              <h3 className="font-semibold text-[#1A2F1A]">
                Deux possibilités pour l’achat :
              </h3>

              <ol className="mt-4 space-y-3 text-sm leading-relaxed text-[#1A2F1A]/80">
                <li>
                  Réservez votre carte cadeau en ligne pour l’avoir directement.
                </li>
                <li>
                  Contactez-moi au{" "}
                  <a
                    href="tel:0744951255"
                    className="font-semibold underline underline-offset-4"
                  >
                    07 44 95 12 55
                  </a>{" "}
                  afin de passer en institut ou d’organiser l’envoi postal.
                </li>
              </ol>
            </div>

            <div className="mt-8">
              <Link
                href="https://www.planity.com/ad-esthetique-37100-tours"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center rounded-full bg-[#1A2F1A] px-8 py-4 text-sm font-semibold text-white transition hover:bg-[#B7D8A8] hover:text-[#1A2F1A] sm:w-auto"
              >
                Réserver en ligne
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
