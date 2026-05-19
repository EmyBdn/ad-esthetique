"use server";

import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const contactSchema = z.object({
  nom: z
    .string()
    .trim()
    .min(2, {
      error: "Le nom doit contenir au moins 2 caractères.",
    })
    .max(50, {
      error: "Le nom ne peut pas dépasser 50 caractères.",
    }),

  prenom: z
    .string()
    .trim()
    .min(2, {
      error: "Le prénom doit contenir au moins 2 caractères.",
    })
    .max(50, {
      error: "Le prénom ne peut pas dépasser 50 caractères.",
    }),

  email: z.email({
    error: "Adresse email invalide.",
  }),

  message: z
    .string()
    .trim()
    .min(10, {
      error: "Le message doit contenir au moins 10 caractères.",
    })
    .max(500, {
      error: "Le message ne peut pas dépasser 500 caractères.",
    }),
});
export async function sendContactEmail(previous: any, formData: FormData) {
  const rawData = {
    nom: formData.get("nom"),
    prenom: formData.get("prenom"),
    email: formData.get("email"),
    message: formData.get("message"),
    website: formData.get("website"),
  };

  if (rawData.website) {
    return {
      success: false,
      errors: {},
    };
  }

  const result = contactSchema.safeParse(rawData);

  if (!result.success) {
    return {
      success: false,
      errors: z.flattenError(result.error).fieldErrors,
    };
  }

  const { nom, prenom, email, message } = result.data;

  const safeNom = escapeHtml(nom);
  const safePrenom = escapeHtml(prenom);
  const safeMessage = escapeHtml(message);

  try {
    await resend.emails.send({
      from: "Formulaire Contact <onboarding@resend.dev>",
      to: "emeline.baudouin.cefim@gmail.com",
      replyTo: email,
      subject: `Nouveau message de ${safePrenom} ${safeNom}`,
      html: `
        <h3>Nouveau message de contact</h3>

        <p>
          <strong>Nom :</strong>
          ${safePrenom} ${safeNom}
        </p>

        <p>
          <strong>Email :</strong>
          ${email}
        </p>

        <p>
          <strong>Message :</strong>
        </p>

        <p style="white-space: pre-wrap;">
          ${safeMessage}
        </p>
      `,
    });

    return {
      success: true,
      errors: {},
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      errors: {},
    };
  }
}
