"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE = "samyo_admin";

export async function login(_prev: { error?: string } | undefined, form: FormData) {
  const code = String(form.get("code") ?? "").trim();
  // En production, le code DOIT être défini (variable ADMIN_ACCESS_CODE) : aucun code par défaut.
  const expected = process.env.ADMIN_ACCESS_CODE ?? (process.env.NODE_ENV === "production" ? undefined : "samyo");
  if (!expected) return { error: "Accès non configuré : définir ADMIN_ACCESS_CODE." };
  if (code !== expected) return { error: "Code incorrect." };
  (await cookies()).set(COOKIE, "1", { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60 * 60 * 12 });
  const next = String(form.get("next") ?? "");
  redirect(next.startsWith("/espace-pro") ? next : "/espace-pro");
}

export async function logout() {
  (await cookies()).delete(COOKIE);
  redirect("/espace-pro/login");
}
