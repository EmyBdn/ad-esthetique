import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebook,
  faCcVisa,
  faCcMastercard,
  faCcAmex,
  faApplePay,
  faGooglePay,
} from "@fortawesome/free-brands-svg-icons";

import {
  faMoneyBillWave,
  faLocationDot,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#394B39] text-[#F8F6F1] mt-6">
      <div className="mx-auto max-w-5xl px-6 py-10 flex flex-col gap-12">
        <div className="mx-auto flex flex-col gap-4 text-center">
          <h3 className="text-3xl font-serif italic">AD Esthétique</h3>
          <hr className="mx-auto w-24 border-[#F8F6F1]/15" />

          <nav
            className="flex flex-row gap-6 justify-center"
            aria-label="Réseaux sociaux"
          >
            <a
              href="https://www.facebook.com/profile.php?id=61574561083112"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                icon={faFacebook}
                className="text-xl text-[#F8F6F1]/70 hover:text-white transition-colors"
              />
            </a>
            <a
              href="https://www.instagram.com/adesthetique37/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                icon={faInstagram}
                className="text-xl text-[#F8F6F1]/70 hover:text-white transition-colors"
              />
            </a>
          </nav>
        </div>

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3 items-start">
          {/* Coordonnées */}
          <div className="flex flex-col gap-4 max-w-xs mx-auto w-full sm:mx-0 sm:max-w-none">
            <h4 className="text-center font-bold uppercase tracking-[0.2em] text-[11px] border-b border-[#F8F6F1]/15 pb-2">
              Coordonnées
            </h4>

            <ul className="flex flex-col gap-4 text-sm font-light items-center sm:items-start text-center sm:text-left text-[#F8F6F1]/80">
              <li className="flex items-start gap-3 w-fit">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="mt-1 text-xs text-[#F8F6F1]/65 shrink-0"
                />
                <span className="leading-relaxed">
                  2 rue Maurice de Tastes,
                  <br /> 37100 Tours
                </span>
              </li>

              <li className="flex items-center gap-3 w-fit">
                <FontAwesomeIcon
                  icon={faPhone}
                  className="text-xs text-[#F8F6F1]/65 shrink-0"
                />
                <a
                  href="tel:0744951255"
                  className="hover:text-white transition-colors"
                >
                  07 44 95 12 55
                </a>
              </li>

              <li className="flex items-center gap-3 w-fit">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="text-xs text-[#F8F6F1]/65 shrink-0"
                />
                <a
                  href="mailto:adesthetique.tours@gmail.com"
                  className="hover:text-white transition-colors break-all"
                >
                  adesthetique.tours@gmail.com
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4 max-w-xs mx-auto w-full sm:mx-0 sm:max-w-none">
            <h4 className="text-center font-bold uppercase tracking-[0.2em] text-[11px] border-b border-[#F8F6F1]/15 pb-2">
              Horaires
            </h4>

            <ul className="text-sm font-light flex flex-col items-center sm:items-stretch text-[#F8F6F1]/80">
              {[
                { day: "Lun – Ven", time: "9h – 19h" },
                { day: "Sam", time: "09h30 – 17h" },
                { day: "Dim", time: "Fermé", isClosed: true },
              ].map((item, index) => (
                <li
                  key={index}
                  className={`flex justify-between py-2 border-b border-[#F8F6F1]/10 italic w-full max-w-[240px] sm:max-w-none ${
                    item.isClosed ? "opacity-45" : ""
                  }`}
                >
                  <span className="pr-4">{item.day}</span>
                  <span className="font-normal not-italic text-right">
                    {item.time}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4 max-w-[240px] mx-auto w-full lg:max-w-none lg:mx-0">
            <h4 className="text-center font-bold uppercase tracking-[0.2em] text-[11px] border-b border-[#F8F6F1]/15 pb-2">
              Paiement
            </h4>

            <div className="grid grid-cols-3 gap-y-6 justify-items-center text-[#F8F6F1]/70 pt-2">
              <FontAwesomeIcon icon={faCcVisa} className="text-2xl" />
              <FontAwesomeIcon icon={faCcMastercard} className="text-2xl" />
              <FontAwesomeIcon icon={faCcAmex} className="text-2xl" />
              <FontAwesomeIcon icon={faApplePay} className="text-2xl" />
              <FontAwesomeIcon icon={faGooglePay} className="text-2xl" />
              <FontAwesomeIcon icon={faMoneyBillWave} className="text-2xl" />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className="pt-8 border-[#F8F6F1]/10 text-center text-[10px] text-[#F8F6F1]/45 tracking-[0.2em] uppercase">
            © {new Date().getFullYear()} AD Esthétique
          </div>
          <Link
            href="/mentions-legales"
            className="inline-block text-xs text-[#F8F6F1]/50 transition-colors hover:text-white"
          >
            Mentions légales
          </Link>
        </div>
      </div>
    </footer>
  );
}
