import type { Metadata } from "next";
import Hero from "@/components/Hero";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Coordonnées, adresse, téléphone, horaires et formulaire de contact.",
};

export default function ContactPage() {
  return (
    <div>
      <Hero title="Contact" imageSrc="/images/hero-salon.jpg" />

      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-6 lg:py-20">
        <h2 className="mb-8 font-serif text-3xl text-[#394B39]">
          Contact & accès
        </h2>

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <div className="space-y-6">
            <div className="rounded-xl border border-[#394B39]/10 bg-[#FAF8F4] p-6">
              <h3 className="mb-3 font-semibold text-[#394B39]">Coordonnées</h3>

              <address className="not-italic leading-relaxed text-[#394B39]/75">
                2 rue Maurice de Tastes
                <br />
                37100 Tours
              </address>

              <a
                href="tel:0744951255"
                className="mt-3 inline-block font-semibold text-[#394B39] underline underline-offset-4"
              >
                07 44 95 12 55
              </a>
            </div>

            <div className="rounded-xl border border-[#394B39]/10 bg-[#FAF8F4] p-6">
              <h3 className="mb-3 font-semibold text-[#394B39]">Horaires</h3>

              <ul className="space-y-2 text-[#1A2F1A]/75">
                <li>Lundi - vendredi : 8h30 - 19h</li>
                <li>Samedi : 9h30 - 17h</li>
                <li>Dimanche : fermé</li>
              </ul>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-[#394B39]/10 lg:h-full">
            <iframe
              title="Carte Google Maps indiquant AD Esthétique à Tours"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2699.9902264022376!2d0.7018360758741593!3d47.412131801387005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47fcd58cb7694e27%3A0x3174d2ace61146a7!2sAD%20Esth%C3%A9tique%20-%20Tours!5e0!3m2!1sfr!2sfr!4v1768494053260!5m2!1sfr!2sfr"
              className="h-[320px] w-full sm:h-[420px] lg:h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <div className="mt-12 rounded-xl border border-[#394B39]/10 bg-[#FAF8F4] p-5 sm:p-8 lg:mt-16">
          <div className="mb-6">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-[#1A2F1A]/70">
              Une question ?
            </p>

            <h2 className="font-serif text-3xl text-[#394B39]">
              Formulaire de contact
            </h2>
          </div>

          <ContactForm />
        </div>
      </section>
    </div>
  );
}
