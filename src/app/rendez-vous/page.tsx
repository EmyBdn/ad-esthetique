import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Rendez-vous",
    description: "Prenez rendez-vous en ligne via Reservio.",
};

export default function RendezVousPage() {
    const reservioUrl = "https://propiccee.reservio.com/services";

    return (
        <section>

            <p>
                Réservez votre créneau en ligne en quelques clics.
            </p>

            <a
                href={reservioUrl}
                target="_blank"
                rel="noreferrer"
            >
                Accéder à la réservation en ligne
            </a>
        </section>
    );
}
