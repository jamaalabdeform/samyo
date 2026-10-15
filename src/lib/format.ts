const volumeFormatter = new Intl.NumberFormat("fr-FR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

export const formatVolume = (m3: number) => `${volumeFormatter.format(m3)} m³`;
export const formatNumber1 = (n: number) => volumeFormatter.format(n);

export function formatDate(iso: string, opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" }) {
  if (!iso) return "";
  const d = new Date(iso.length === 10 ? `${iso}T12:00:00` : iso);
  if (Number.isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat("fr-FR", opts).format(d);
}

export function formatDateTime(iso: string) {
  return formatDate(iso, { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
}

export function formatFloor(floor: number | null) {
  if (floor === null) return "Étage non précisé";
  if (floor === 0) return "Rez-de-chaussée";
  return floor === 1 ? "1er étage" : `${floor}e étage`;
}

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** Copie profonde d'un objet JSON (structuredClone absent sur d'anciens Safari / navigateurs intégrés) */
export function cloneJson<T>(value: T): T {
  return typeof structuredClone === "function" ? structuredClone(value) : (JSON.parse(JSON.stringify(value)) as T);
}

/** Identifiant unique (crypto.randomUUID absent sur d'anciens navigateurs ou hors HTTPS) */
export function uid() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") return crypto.randomUUID();
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}
