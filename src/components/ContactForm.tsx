"use client";

import { useActionState, useEffect, useRef } from "react";
import { sendContactEmail } from "@/actions/contactActions";

type ContactFormState = {
  success: boolean;
  errors: {
    nom?: string[];
    prenom?: string[];
    email?: string[];
    message?: string[];
  };
  values: {
    nom: string;
    prenom: string;
    email: string;
    message: string;
  };
};

const initialState: ContactFormState = {
  success: false,
  errors: {},
  values: {
    nom: "",
    prenom: "",
    email: "",
    message: "",
  },
};

export function ContactForm() {
  const [state, action, pending] = useActionState(
    sendContactEmail,
    initialState,
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <form ref={formRef} action={action} className="space-y-3">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="nom"
            className="mb-2 block text-sm font-medium text-[#394B39]"
          >
            Nom
          </label>
          <input
            id="nom"
            name="nom"
            defaultValue={state.values.nom}
            required
            placeholder="Votre nom"
            className={`w-full rounded-2xl border bg-white px-4 py-3 text-[#394B39] outline-none transition placeholder:text-[#1A2F1A]/35 focus:border-[#394B39] focus:ring-4 focus:ring-[#B7D8A8]/30 ${
              state.errors.nom?.length
                ? "border-red-500"
                : "border-[#1A2F1A]/15"
            }`}
          />
          <p className="mt-1 h-4 text-sm leading-none text-red-600">
            {state.errors.nom?.[0] ?? " "}
          </p>
        </div>

        <div>
          <label
            htmlFor="prenom"
            className="mb-2 block text-sm font-medium text-[#394B39]"
          >
            Prénom
          </label>
          <input
            id="prenom"
            name="prenom"
            defaultValue={state.values.prenom}
            required
            placeholder="Votre prénom"
            className={`w-full rounded-2xl border bg-white px-4 py-3 text-[#394B39] outline-none transition placeholder:text-[#1A2F1A]/35 focus:border-[#394B39] focus:ring-4 focus:ring-[#B7D8A8]/30 ${
              state.errors.prenom?.length
                ? "border-red-500"
                : "border-[#1A2F1A]/15"
            }`}
          />
          <p className="mt-1 h-4 text-sm leading-none text-red-600">
            {state.errors.prenom?.[0] ?? " "}
          </p>
        </div>
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-[#394B39]"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          defaultValue={state.values.email}
          required
          placeholder="email@exemple.com"
          className={`w-full rounded-2xl border bg-white px-4 py-3 text-[#394B39] outline-none transition placeholder:text-[#394B39]/35 focus:border-[#394B39] focus:ring-4 focus:ring-[#B7D8A8]/30 ${
            state.errors.email?.length
              ? "border-red-500"
              : "border-[#1A2F1A]/15"
          }`}
        />
        <p className="mt-1 h-4 text-sm leading-none text-red-600">
          {state.errors.email?.[0] ?? " "}
        </p>
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-2 block text-sm font-medium text-[#394B39]"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          defaultValue={state.values.message}
          required
          rows={5}
          placeholder="Votre message..."
          className={`w-full resize-none rounded-2xl border bg-white px-4 py-3 text-[#394B39] outline-none transition placeholder:text-[#394B39]/35 focus:border-[#394B39] focus:ring-4 focus:ring-[#B7D8A8]/30 ${
            state.errors.message?.length
              ? "border-red-500"
              : "border-[#1A2F1A]/15"
          }`}
        />
        <p className="mt-1 h-4 text-sm leading-none text-red-600">
          {state.errors.message?.[0] ?? " "}
        </p>
      </div>

      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="website">Ne pas remplir ce champ</label>
        <input
          type="text"
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {state.success && (
        <p className="rounded-2xl bg-[#B7D8A8]/25 px-4 py-3 text-sm font-medium text-[#394B39]">
          Votre message a bien été envoyé.
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-full items-center justify-center rounded-full bg-[#394B39] px-8 py-4 text-sm font-semibold text-white transition hover:bg-[#B7D8A8] hover:text-[#394B39] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {pending ? "Envoi en cours..." : "Envoyer"}
      </button>
    </form>
  );
}
