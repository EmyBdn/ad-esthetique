import type { Metadata } from "next";
import Hero from "@/app/components/Hero";

export const metadata: Metadata = {
  title: "Rendez-vous",
  description: "Prenez rendez-vous en ligne via Reservio.",
};

export default function RendezVousPage() {
  const reservioUrl = "https://propiccee.reservio.com/services";

  return (
    <div>
      <Hero title="Rendez-vous" imageSrc="/images/hero-salon.jpg" />
      <section className="mx-auto max-w-6xl px-6 py-16">
        <p>Réservez votre créneau en ligne en quelques clics.</p>

        <a
          href={reservioUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-lg border px-4 py-2 font-medium hover:bg-green-700"
        >
          Accéder à la réservation en ligne
        </a>
      </section>
    </div>
  );
}
