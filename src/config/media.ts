/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  REGISTRE DES MÉDIAS
 * ─────────────────────────────────────────────────────────────────────────────
 *  Chaque emplacement visuel du site est déclaré ici. Tant qu'un fichier n'est
 *  pas fourni (src/poster = null), le composant <MediaSlot> affiche une
 *  composition graphique de repli (« scene »), pensée pour rester élégante.
 *
 *  Pour brancher un asset produit avec Higgsfield (voir creative/higgsfield-prompts.md) :
 *    1. exporter en WebM (VP9) + MP4 (H.264) + poster JPG/AVIF
 *    2. déposer les fichiers dans /public/media/
 *    3. renseigner les chemins ci-dessous — rien d'autre à modifier.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type FallbackScene = "window-light" | "morning" | "street" | "quilt" | "hands";

export interface MediaAsset {
  id: string;
  /** Référence dans creative/higgsfield-prompts.md */
  brief: string;
  alt: string;
  poster: string | null;
  video?: { webm?: string; mp4?: string; mobileMp4?: string } | null;
  fallback: FallbackScene;
  /** Cadrage de l'image dans son cadre (CSS object-position) */
  position?: string;
}

export const media = {
  // Photos réelles (dossier client, 14/10/2026) : préparées par
  // scripts/build-photos.py (plaques floutées, recadrage, WebP).
  hero: {
    id: "hero",
    brief: "Photo client — intérieur de la caisse chargée (sans plaque)",
    alt: "Caisse de camion de déménagement chargée : cartons, mobilier protégé et pile de couvertures",
    poster: "/media/terrain/hero-caisse.webp",
    position: "50% 50%",
    video: null,
    fallback: "window-light",
  },
  van: {
    id: "van",
    brief: "Fourgon SAMYO détouré (photo du véritable véhicule, fond transparent PNG/WebP)",
    alt: "Fourgon de déménagement SAMYO",
    // Image fournie par le client comme libre de droits (source à documenter),
    // détourée. Remplaçable par une photo du véritable véhicule.
    poster: process.env.NEXT_PUBLIC_VAN_IMAGE || "/media/samyo-van-v3.webp",
    video: null,
    fallback: "street",
  },
  volume: {
    id: "volume",
    brief: "ASSET 02 — Transition objets → volume",
    alt: "",
    poster: null,
    video: null,
    fallback: "morning",
  },
  truck: {
    id: "truck",
    brief: "Photo client — camion caisse (plaques floutées)",
    alt: "Camion de déménagement à caisse blanche, vu de trois quarts",
    poster: "/media/terrain/camion-caisse.webp",
    position: "50% 55%",
    video: null,
    fallback: "street",
  },
  protection: {
    id: "protection",
    brief: "Photo client — chargement latéral, couvertures (plaques floutées)",
    alt: "Camion de déménagement ouvert sur le côté, couvertures de protection prêtes au chargement",
    poster: "/media/terrain/camion-chargement-lateral.webp",
    position: "28% 50%",
    video: null,
    fallback: "quilt",
  },
  carry: {
    id: "carry",
    brief: "Photo client — chargement latéral (plaques floutées)",
    alt: "Camion de déménagement ouvert sur le côté, couvertures de protection prêtes au chargement",
    poster: "/media/terrain/camion-chargement-lateral.webp",
    position: "30% 50%",
    video: null,
    fallback: "hands",
  },
  front: {
    id: "front",
    brief: "Photo client — camion de face (plaque floutée)",
    alt: "Camion de déménagement blanc vu de face, prêt à partir",
    poster: "/media/terrain/camion-face.webp",
    video: null,
    fallback: "street",
    position: "50% 45%",
  },
  arrival: {
    id: "arrival",
    brief: "ASSET 05 — Nouveau départ",
    alt: "Pièce vide baignée par la lumière du matin",
    poster: null,
    video: null,
    fallback: "morning",
  },
} satisfies Record<string, MediaAsset>;

export type MediaId = keyof typeof media;
