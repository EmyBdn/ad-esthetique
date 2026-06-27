import Hero from "@/components/Hero";

const sections = [
  {
    title: "Éditeur du site",
    content: (
      <>
        <p>Ce site est édité par :</p>
        <p>
          <strong>AD Esthétique</strong>
          <br />
          Entreprise individuelle immatriculée sous le numéro SIRET 942 346 206
          00017
          <br />
          Siège social : 2 rue Maurice de Tastes, 37100 Tours, France
          <br />
          Responsable de l’entreprise : Angéline DESPINS
          <br />
          Conception et développement du site : Emeline BAUDOUIN
          <br />
          Téléphone : 07 44 95 12 55
          <br />
          E-mail : adesthetique.tours@gmail.com
        </p>
      </>
    ),
  },
  {
    title: "Activité",
    content: (
      <>
        <p>AD Esthétique propose des prestations esthétiques.</p>
        <p>
          Angéline Despins est titulaire du CAP, du BP Esthétique, ainsi que
          d’un diplôme de lumière pulsée.
        </p>
        <p>
          L’activité est couverte par une assurance professionnelle souscrite
          auprès de la MAAF.
        </p>
      </>
    ),
  },
  {
    title: "Hébergement du site",
    content: (
      <p>
        Le site est hébergé par :
        <br />
        <strong>Vercel Inc.</strong>
        <br />
        340 S Lemon Ave #4133
        <br />
        Walnut, CA 91789
        <br />
        États-Unis
        <br />
        Site :{" "}
        <a
          href="https://vercel.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#394B39] underline underline-offset-2"
        >
          vercel.com
        </a>
      </p>
    ),
  },
  {
    title: "Propriété intellectuelle",
    content: (
      <>
        <p>
          L’ensemble des contenus présents sur ce site (textes, logo, mise en
          page, etc.) sont la propriété d’AD Esthétique et de son créateur
          Rodrigue Beautrais, sauf mention contraire.
        </p>
        <p>
          Certaines images utilisées proviennent de sources externes libres de
          droits ou de banques d’images. Les droits afférents à ces éléments
          restent la propriété de leurs auteurs respectifs.
        </p>
        <p>
          Toute reproduction, représentation, diffusion ou exploitation, même
          partielle, des contenus est strictement interdite sans autorisation
          préalable.
        </p>
      </>
    ),
  },
  {
    title: "Données personnelles",
    content: (
      <>
        <p>
          Les données personnelles éventuellement collectées (via des liens de
          prise de rendez-vous externes) sont traitées par un site tiers et ne
          sont pas stockées directement sur www.ad-esthetique.fr.
        </p>
        <p>
          AD Esthétique ne conserve donc aucune information personnelle via son
          propre site internet.
        </p>
        <p>
          Le formulaire de contact permet aux visiteurs de transmettre leur nom,
          leur adresse e-mail ainsi que le contenu de leur message afin de
          contacter AD Esthétique.
        </p>

        <p>
          Les informations communiquées ne sont pas enregistrées dans une base
          de données du site. Elles sont uniquement transmises via le service
          Resend afin de permettre l'envoi du message par courrier électronique
          à AD Esthétique et de répondre à votre demande.
        </p>
        <p>
          Ces données ne sont ni vendues ni cédées à des tiers et sont utilisées
          exclusivement dans le cadre des échanges avec les visiteurs.
        </p>
        <p>
          Pour toute question liée à vos données, vous pouvez contacter :
          adesthetique.tours@gmail.com
        </p>
      </>
    ),
  },
  {
    title: "Cookies",
    content: (
      <>
        <p>
          Ce site utilise des cookies dans le cadre de l’affichage de Google
          Maps et de la navigation vers des plateformes tierces (ex. réseaux
          sociaux).
        </p>
        <p>
          Vous pouvez configurer votre navigateur pour refuser les cookies ou
          être informé de leur présence.
        </p>
      </>
    ),
  },
  {
    title: "Liens externes",
    content: (
      <p>
        Des liens peuvent être présents vers des sites tiers (réseaux sociaux,
        plateformes de prise de rendez-vous, etc.). AD Esthétique ne saurait
        être tenue responsable du contenu de ces sites.
      </p>
    ),
  },
  {
    title: "Droit applicable",
    content: (
      <p>
        Le présent site est soumis au droit français. En cas de litige, les
        tribunaux compétents seront ceux du ressort de Tours (37).
      </p>
    ),
  },
];

export default function MentionsLegalesPage() {
  return (
    <>
      <Hero title="Mentions légales" imageSrc="/images/hero-salon.jpg" />

      <main className="mx-auto max-w-4xl px-6 py-14">
        <div className="mb-12 text-center">
          <span className="mb-3 inline-block text-[10px] font-bold uppercase tracking-[0.3em] text-[#1A2F1A]/50">
            AD Esthétique
          </span>

          <h1 className="font-serif text-3xl italic leading-tight text-[#394B39] md:text-4xl">
            Mentions légales
          </h1>

          <div className="mx-auto mt-5 h-px w-24 bg-gradient-to-r from-transparent via-[#B7D8A8] to-transparent" />
        </div>

        <div className="space-y-6">
          {sections.map((section) => (
            <section
              key={section.title}
              className="rounded-xl border border-[#1A2F1A]/10 bg-white p-6 shadow-sm md:p-8"
            >
              <h2 className="mb-4 font-serif text-2xl leading-tight tracking-tight text-[#394B39]">
                {section.title}
              </h2>

              <div className="space-y-4 text-sm font-light leading-relaxed text-[#1A2F1A]/75 md:text-base">
                {section.content}
              </div>
            </section>
          ))}
        </div>
      </main>
    </>
  );
}
