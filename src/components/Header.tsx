"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

const navigationLinks = [
  { href: "/", label: "Accueil" },
  { href: "/prestations", label: "Prestations" },
  { href: "/carte-cadeau", label: "Carte cadeau" },
  { href: "/contact", label: "Contact" },
];

function BurgerIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
      <path
        d="M4 6h16M4 12h16M4 18h16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
      <path
        d="M6 6l12 12M18 6l-12 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Header({
  solidAfterScroll = 220,
}: {
  solidAfterScroll?: number;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeaderSolidOnMobile, setIsHeaderSolidOnMobile] = useState(false);

  useEffect(() => {
    const isMobileViewport = () =>
      window.matchMedia("(max-width: 767px)").matches;

    const updateHeaderStyleOnResizeOrLoad = () => {
      if (!isMobileViewport()) return;
      setIsHeaderSolidOnMobile(window.scrollY > solidAfterScroll);
    };

    const updateHeaderStyleOnScroll = () => {
      if (!isMobileViewport()) return;
      setIsHeaderSolidOnMobile(window.scrollY > solidAfterScroll);
    };

    updateHeaderStyleOnResizeOrLoad();
    window.addEventListener("scroll", updateHeaderStyleOnScroll, {
      passive: true,
    });

    const mobileMediaQuery = window.matchMedia("(max-width: 767px)");
    mobileMediaQuery.addEventListener(
      "change",
      updateHeaderStyleOnResizeOrLoad,
    );

    return () => {
      window.removeEventListener("scroll", updateHeaderStyleOnScroll);
      mobileMediaQuery.removeEventListener(
        "change",
        updateHeaderStyleOnResizeOrLoad,
      );
    };
  }, [solidAfterScroll]);

  const headerPositionClasses = "fixed md:absolute inset-x-0 top-0";

  // Desktop : toujours transparent + texte blanc
  const desktopHeaderStyleClasses =
    "md:bg-transparent md:text-white md:border-b-0";

  // Mobile : transparent au début, puis solid après scroll
  const mobileHeaderStyleClasses = isHeaderSolidOnMobile
    ? "bg-white/95 backdrop-blur border-b text-gray-900"
    : "bg-transparent text-white";

  return (
    <>
      <header
        className={[
          "z-40",
          headerPositionClasses,
          mobileHeaderStyleClasses,
          desktopHeaderStyleClasses,
        ].join(" ")}
      >
        <div className="w-full flex items-center justify-between px-6 py-3">
          <Link
            href="/"
            className="flex items-center gap-3 font-semibold tracking-tight"
          >
            <Image
              src="/images/logo.jpg"
              alt="Logo AD Esthétique"
              width={52}
              height={52}
              className="h-12 w-12 object-contain"
            />
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex gap-5 text-md">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:underline underline-offset-4"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile burger button */}
          <button
            type="button"
            className={[
              "md:hidden inline-flex items-center justify-center rounded-lg p-2",
              "transition-colors",
              isHeaderSolidOnMobile
                ? "bg-transparent"
                : "bg-black/30 backdrop-blur border border-white/30",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70",
            ].join(" ")}
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((previous) => !previous)}
          >
            {isMenuOpen ? <CloseIcon /> : <BurgerIcon />}
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={[
          "md:hidden fixed inset-0 z-50",
          isMenuOpen ? "pointer-events-auto" : "pointer-events-none",
        ].join(" ")}
      >
        <div
          className={[
            "absolute inset-0 bg-black/40 transition-opacity duration-300",
            isMenuOpen ? "opacity-100" : "opacity-0",
          ].join(" ")}
          onClick={() => setIsMenuOpen(false)}
        />

        <div
          className={[
            "absolute right-0 top-0 h-full w-[65%] max-w-sm bg-white shadow-xl",
            "transition-transform duration-300",
            isMenuOpen ? "translate-x-0" : "translate-x-full",
          ].join(" ")}
        >
          <div className="flex items-center justify-between px-4 py-4 border-b">
            <p className="font-medium">Menu</p>
            <button
              type="button"
              className="rounded-lg p-2"
              aria-label="Fermer le menu"
              onClick={() => setIsMenuOpen(false)}
            >
              <CloseIcon />
            </button>
          </div>

          {/* Nav mobile */}
          <nav className="p-4 flex flex-col gap-2">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
