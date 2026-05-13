import Hero from "@/components/Hero";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-white">
      <Hero title="AD Esthétique" imageSrc="/images/hero-salon.jpg" />

      <section className="mx-auto max-w-6xl py-12 lg:py-24">
        <div className="grid gap-10 md:grid-cols-2 md:items-center md:px-6 lg:gap-20">
          {/* Colonne Image : Pleine largeur mobile, Angles droits, Pas de zoom */}
          <div className="order-2 md:order-1">
            <div className="relative aspect-[4/3] w-full overflow-hidden shadow-sm">
              <Image
                src="/images/estheticienne-maquillage.jpg"
                alt="Soin esthétique"
                fill
                className="object-cover"
                preload
              />
            </div>
          </div>

          {/* Colonne Texte */}
          <div className="order-1 px-6 md:order-2 md:px-0">
            <span className="mb-3 inline-block text-[10px] font-bold uppercase tracking-[0.3em] text-[#1A2F1A]/50">
              Expertise Tours
            </span>

            <h2 className="font-serif text-3xl italic leading-tight text-[#1A2F1A] md:text-4xl">
              Un salon pensé pour <br className="hidden md:block" /> votre
              bien-être
            </h2>

            <p className="mt-6 text-base font-light leading-relaxed text-[#1A2F1A]/80">
              Bienvenue chez <span className="font-medium">AD Esthétique</span>.
              Ici, chaque soin est un moment de douceur : écoute, gestes précis
              et conseils adaptés à votre peau.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              {/* Bouton Principal : Rond, changement de couleur au survol */}
              <Link
                href="/rendez-vous"
                className="inline-flex items-center justify-center rounded-full bg-[#1A2F1A] px-8 py-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#B7D8A8] hover:text-[#1A2F1A]"
              >
                Prendre rendez-vous
              </Link>

              {/* Bouton Secondaire : Rond, changement de couleur au survol */}
              <Link
                href="/prestations"
                className="inline-flex items-center justify-center rounded-full border border-[#1A2F1A]/15 bg-white px-8 py-4 text-sm font-semibold text-[#1A2F1A] transition-colors duration-300 hover:bg-[#B7D8A8]/20"
              >
                Voir les prestations
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section>
        <script src="https://elfsightcdn.com/platform.js" async></script>
        <div
          className="elfsight-app-cb81ad4e-bdfe-4d7a-940c-926c1decefff"
          data-elfsight-app-lazy
        ></div>
      </section>
    </div>
  );
}
