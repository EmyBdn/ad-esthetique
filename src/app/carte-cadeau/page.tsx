import type { Metadata } from "next";
import Hero from "@/components/Hero";
export const metadata: Metadata = {
  title: "Carte cadeau",
  description:
    "Offrez un moment de bien-être à vos proches avec une carte cadeau.",
};

export default function GiftCardPage() {
  return (
    <div>
      <Hero title="Carte cadeau" imageSrc="/images/hero-salon.jpg" />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <p>
          Offrez un moment de bien-être à vos proches. Massage, soin du visage,
          soin des mains, des pieds… choisissez la prestation ou le montant de
          votre choix. ~ Valable 6 mois ~ Message personnalisé Deux possibilités
          pour l'achat de votre carte cadeau : 1- Réservez votre carte cadeaux
          en ligne pour l'avoir directement. 2- Contactez-moi par téléphone au
          07 44 95 12 55 afin de passer en institut ou d’organiser l’envoi
          postal de votre carte cadeau.{" "}
        </p>
      </section>
    </div>
  );
}
