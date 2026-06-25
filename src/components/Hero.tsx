import Header from "./Header";
import Image from "next/image";

type HeroProps = {
  title: string;
  imageSrc: string;
  subtitle?: string;
};
export default function Hero({ title, imageSrc, subtitle }: HeroProps) {
  return (
    <div>
      <Header />
      <section className="relative w-full h-[30vh] min-h-[280px] sm:h-[40vh] sm:min-h-[360px]">
        <Image
          src={imageSrc}
          alt="Intérieur du salon"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 flex h-full items-center justify-center">
          <h1 className="font-serif italic text-4xl text-white sm:text-5xl lg:text-6xl">
            {title}
          </h1>
        </div>
      </section>
    </div>
  );
}
