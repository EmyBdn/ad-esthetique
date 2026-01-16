import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact",
    description: "Coordonnées, adresse, téléphone, horaires et formulaire de contact.",
};

export default function ContactPage() {
    return (
    <section>
        <h1>Contact</h1>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div>
                <h2>Coordonnées</h2>
                <ul>
                    <li>🏠 2 rue Maurice de Tastes, 37100 Tours</li>
                    <li>📞 07 44 95 12 55</li>
                </ul>

                <h2>Horaires</h2>
                <div>
                    <span>🕐 Horaires</span>
                    <span>Lundi-vendredi : 8h30-19h</span>
                    <span>Samedi : 9h30-17h</span>
                    <span>Fermé le dimanche</span>
                </div>
            </div>

            <div className="mt-5 overflow-hidden rounded-lg border">
                <iframe
                    title="Carte Google Maps"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2699.9902264022376!2d0.7018360758741593!3d47.412131801387005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47fcd58cb7694e27%3A0x3174d2ace61146a7!2sAD%20Esth%C3%A9tique%20-%20Tours!5e0!3m2!1sfr!2sfr!4v1768494053260!5m2!1sfr!2sfr"
                    width="600"
                    height="450"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade">
                </iframe>
            </div>
        </div>

        <div>

        </div>
    </section>
    )
}
