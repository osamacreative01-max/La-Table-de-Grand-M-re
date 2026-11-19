"use server";

import { z } from "zod";

/**
 * Form state shared by both forms.
 * Field errors are message codes, translated on the client so each language
 * shows its own wording.
 */
export type FieldError = "required" | "invalid" | "too-long";
export type FormState = {
  status: "idle" | "success" | "error" | "unconfigured";
  errors?: Record<string, FieldError>;
};

const contactSchema = z.object({
  name: z.string().trim().min(1, "required").max(120, "too-long"),
  email: z.email("invalid"),
  message: z.string().trim().min(1, "required").max(4000, "too-long"),
});

const businessSchema = z.object({
  businessType: z.string().trim().min(1, "required"),
  name: z.string().trim().min(1, "required").max(120, "too-long"),
  company: z.string().trim().min(1, "required").max(160, "too-long"),
  email: z.email("invalid"),
  phone: z.string().trim().max(40, "too-long").optional(),
  city: z.string().trim().min(1, "required").max(120, "too-long"),
  products: z.array(z.string()).min(1, "required"),
  packSizes: z.string().trim().max(200, "too-long").optional(),
  quantity: z.string().trim().max(120, "too-long").optional(),
  frequency: z.string().trim().max(120, "too-long").optional(),
  message: z.string().trim().max(4000, "too-long").optional(),
  lang: z.enum(["fr", "en"]).default("fr"),
});

function firstErrors(errors: Record<string, string[] | undefined>) {
  const result: Record<string, FieldError> = {};
  for (const [field, messages] of Object.entries(errors)) {
    const code = messages?.[0];
    if (code === "required" || code === "invalid" || code === "too-long") {
      result[field] = code;
    } else {
      result[field] = "invalid";
    }
  }
  return result;
}

async function deliver({
  subject,
  text,
  replyTo,
}: {
  subject: string;
  text: string;
  replyTo?: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_TO_EMAIL;

  // Delivery is not configured yet: report it honestly instead of pretending
  // the message was sent. Set RESEND_API_KEY and ENQUIRY_TO_EMAIL to activate.
  if (!apiKey || !to) return { ok: false as const, reason: "unconfigured" as const };

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.ENQUIRY_FROM_EMAIL ?? "site@latabledegrandmere.ca",
      to: [to],
      reply_to: replyTo,
      subject,
      text,
    }),
  });

  if (!response.ok) return { ok: false as const, reason: "error" as const };
  return { ok: true as const };
}

export async function submitContact(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      errors: firstErrors(z.flattenError(parsed.error).fieldErrors as Record<string, string[]>),
    };
  }

  const result = await deliver({
    subject: `Nouveau message — ${parsed.data.name}`,
    text: `Nom: ${parsed.data.name}\nCourriel: ${parsed.data.email}\n\n${parsed.data.message}`,
    replyTo: parsed.data.email,
  });

  if (!result.ok) return { status: result.reason };
  return { status: "success" };
}

export async function submitBusinessEnquiry(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = businessSchema.safeParse({
    businessType: formData.get("businessType"),
    name: formData.get("name"),
    company: formData.get("company"),
    email: formData.get("email"),
    phone: formData.get("phone") ?? "",
    city: formData.get("city"),
    products: formData.getAll("products"),
    packSizes: formData.get("packSizes") ?? "",
    quantity: formData.get("quantity") ?? "",
    frequency: formData.get("frequency") ?? "",
    message: formData.get("message") ?? "",
    lang: formData.get("lang") ?? "fr",
  });

  if (!parsed.success) {
    return {
      status: "error",
      errors: firstErrors(z.flattenError(parsed.error).fieldErrors as Record<string, string[]>),
    };
  }

  const data = parsed.data;

  const result = await deliver({
    subject: `Demande commerciale — ${data.company}`,
    replyTo: data.email,
    text: [
      `Type: ${data.businessType}`,
      `Nom: ${data.name}`,
      `Entreprise: ${data.company}`,
      `Courriel: ${data.email}`,
      `Téléphone: ${data.phone || "—"}`,
      `Ville et province: ${data.city}`,
      `Produits recherchés: ${data.products.join(", ")}`,
      `Formats souhaités: ${data.packSizes || "—"}`,
      `Volume estimé: ${data.quantity || "—"}`,
      `Fréquence: ${data.frequency || "—"}`,
      "",
      data.message || "",
    ].join("\n"),
  });

  if (!result.ok) return { status: result.reason };
  return { status: "success" };
}
