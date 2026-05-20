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
    <form ref={formRef} action={action}>
      <div>
        <label htmlFor="nom">Nom</label>
        <input
          id="nom"
          name="nom"
          defaultValue={state.values.nom}
          required
          placeholder="Votre nom"
          className={`border p-2 w-full ${
            state.errors.nom?.length ? "border-red-500" : "border-gray-300"
          }`}
        />
        {state.errors.nom?.[0] && (
          <p className="text-red-500 text-sm mt-1">{state.errors.nom[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="prenom">Prénom</label>
        <input
          id="prenom"
          name="prenom"
          defaultValue={state.values.prenom}
          required
          placeholder="Votre prénom"
          className={`border p-2 w-full ${
            state.errors.prenom?.length ? "border-red-500" : "border-gray-300"
          }`}
        />

        {state.errors.prenom?.[0] && (
          <p className="text-red-500 text-sm mt-1">{state.errors.prenom[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          defaultValue={state.values.email}
          required
          placeholder="email@exemple.com"
          className={`border p-2 w-full ${
            state.errors.email?.length ? "border-red-500" : "border-gray-300"
          }`}
        />
        {state.errors.email?.[0] && (
          <p className="text-red-500 text-sm mt-1">{state.errors.email[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          defaultValue={state.values.message}
          required
          rows={5}
          placeholder="Votre message..."
          className={`border p-2 w-full ${
            state.errors.message?.length ? "border-red-500" : "border-gray-300"
          }`}
        />
        {state.errors.message?.[0] && (
          <p className="text-red-500 text-sm mt-1">{state.errors.message[0]}</p>
        )}
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
        <p className="text-green-600 text-sm">
          Votre message a bien été envoyé.
        </p>
      )}
      <button type="submit" disabled={pending} className="">
        {pending ? "Envoi en cours..." : "Envoyer"}
      </button>
    </form>
  );
}
