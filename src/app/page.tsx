import Hero from "@/components/Hero";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-white">
      <Hero title="AD Esthétique" imageSrc="/images/hero-salon.jpg" />

      <section className="mx-auto max-w-6xl py-12 lg:py-24">
        <div className="grid gap-10 md:grid-cols-2 md:items-center md:px-6 lg:gap-20">
          <div className="order-2 md:order-1">
            <div className="relative aspect-[4/3] w-full overflow-hidden shadow-sm rounded-xl">
              <Image
                src="/images/estheticienne-maquillage.jpg"
                alt="Esthéticienne réalisant un  maquillage"
                fill
                className="object-cover"
                preload
              />
            </div>
          </div>

          <div className="order-1 px-5 md:order-2 w-full lg:w-[80%] md:px-1 ">
            <span className="mb-3 inline-block text-[10px] font-bold uppercase tracking-[0.3em] text-[#1A2F1A]/50">
              Tours
            </span>

            <h2 className="font-serif text-3xl italic leading-tight text-[#394B39] md:text-4xl">
              Un salon pensé pour <br className="hidden md:block" /> votre
              bien-être
            </h2>

            <p className="mt-6 text-base font-light leading-relaxed text-[#1A2F1A]/80">
              Bienvenue chez <span className="font-medium">AD Esthétique</span>.
              Ici, chaque soin est un moment de douceur : écoute, gestes précis
              et conseils adaptés à votre peau.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="https://www.planity.com/ad-esthetique-37100-tours"
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-12 w-full items-center justify-center rounded-full bg-[#394B39] px-6 text-center text-sm font-semibold leading-none text-white transition hover:bg-[#B7D8A8] hover:text-[#394B39] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1A2F1A] sm:w-auto sm:min-w-56"
              >
                Prendre rendez-vous
              </Link>

              <Link
                href="/prestations"
                className="flex min-h-14 w-full items-center justify-center rounded-full border border-[#1A2F1A]/20 bg-white px-6 text-center text-sm font-semibold leading-none text-[#394B39] transition hover:bg-[#B7D8A8]/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1A2F1A] sm:w-auto sm:min-w-56"
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
          className="elfsight-app-cb81ad4e-bdfe-4d7a-940c-926c1decefff px-5 md: mx-auto w-full lg:w-[80%]"
          data-elfsight-app-lazy
        ></div>
      </section>
    </div>
  );
}
