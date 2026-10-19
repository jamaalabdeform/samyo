# SAMYO — 3 vidéos publicitaires de 10 s (Google Flow / Veo)

## Règle d'or : AUCUN texte généré par l'IA

Les modèles vidéo déforment les lettres (logos illisibles, mots inventés). Donc :
1. **Les plans Veo ne contiennent aucun texte** : pas de logo, pas d'enseigne, pas de plaque, véhicules et cartons **vierges**.
2. **Tout le texte est ajouté au montage** (CapCut, Canva, Premiere…) avec les vraies polices et les phrases exactes ci-dessous.
3. **La fin (2 s) est une image fixe déjà prête** : `fin-9x16.png`, `fin-16x9.png`, `fin-1x1.png`, `fin-4x5.png` (logo officiel, site, téléphone).

Structure de chaque vidéo (10 s) : **plan Veo 8 s** (2 temps de caméra) + **carte de fin 2 s** (fondu 0,3 s).

## Charte graphique (à respecter au montage)

| Élément | Valeur |
|---|---|
| Bleu SAMYO (fonds, bandeaux) | `#2348C4` |
| Bleu nuit | `#0F1E4F` |
| Pistache (soulignés, liserés) | `#93C572` |
| Aqua (pastille du logo uniquement) | `#3EC3D3` |
| Fond clair | `#F5F7FB` · texte blanc `#FFFFFF` |
| Titres | **Bricolage Grotesque** Bold (Google Fonts) |
| Textes | **Figtree** Medium / SemiBold (Google Fonts) |
| Logo | `public/brand/samyo-logo-blanc.svg` (jamais redessiné, jamais déformé) |

Style des textes à l'écran : blanc, alignés à gauche, petit trait pistache au-dessus du titre, éventuellement dans un bandeau bleu `#2348C4` à 90 %. Pas d'emoji, pas d'effets « néon ».

**Textes autorisés (exactement ceux-ci, rien d'inventé : pas de prix, de % de réduction, de « n°1 », d'années d'expérience ni de note) :**
- « Déménagement & transport de meubles »
- « Montreuil · Île-de-France · partout en France »
- « Estimez votre volume en ligne »
- « Un devis clair, vérifié par un conseiller »
- « Un seul interlocuteur, du devis à la livraison »
- « Quelques meubles à déplacer ? »
- « samyo-demenagement.com » · « 07 44 63 02 06 »

---

## Bloc de style commun (à coller au début de chaque prompt)

```
STYLE: photorealistic commercial footage, natural soft daylight, clean and calm, documentary feel, shot on a full-frame cinema camera, 35mm lens, shallow depth of field, gentle stabilized camera movement, realistic textures, Paris-area urban setting (Montreuil, eastern suburbs of Paris: Haussmann-style and brick buildings, trees, cobblestones), subtle cool-blue color grade with clean whites, no music video effects.
STRICT RULES: absolutely no text, no letters, no numbers, no logos, no brand names, no signage, no license plates, no watermarks, no subtitles anywhere in the frame. All vehicles, boxes and clothing are plain and unbranded (plain white van, plain brown cardboard boxes, plain navy-blue work clothes without any print). Realistic hands and faces, natural movements, no distortion.
```

---

## Vidéo 1 — Instagram (Reels / Stories) · format 9:16

**Paramètres Flow :** Veo (qualité max) · ratio **9:16** · durée 8 s · son : ambiance légère (rue, cartons), sans voix.

```
[STYLE BLOCK]
SHOT (8 seconds, vertical 9:16):
0–4s: Close-up inside a bright, almost empty Paris apartment with tall windows and herringbone parquet: two movers in plain navy-blue work clothes carefully wrap a wooden armchair in a thick grey moving blanket and secure it with a strap. Slow push-in, warm morning light through the windows.
4–8s: Cut to the street below: the same movers slide the wrapped armchair into the open back of a plain white moving van parked on a tree-lined street; plain cardboard boxes neatly stacked inside the van. The camera slowly rises and pulls back to reveal the street. Calm, reassuring, careful handling.
Leave the upper third and lower third of the frame visually simple (sky, wall, ground) for text overlays.
```

**Montage (CapCut/Canva) :**
| Temps | Texte (Bricolage Bold, blanc) | Position |
|---|---|---|
| 0,3 – 3,8 s | « Déménagement & transport de meubles » | tiers haut, trait pistache au-dessus |
| 4,2 – 7,8 s | « Estimez votre volume en ligne » | tiers bas, bandeau bleu `#2348C4` |
| 8 – 10 s | carte de fin `fin-9x16.png` | plein écran |

---

## Vidéo 2 — Facebook (fil + Reels) · format 9:16 (recadré en 4:5 pour le fil)

**Paramètres Flow :** ratio **9:16** · 8 s. Pour le fil Facebook, exporter aussi en **4:5** (recadrage centré) avec `fin-4x5.png`.

```
[STYLE BLOCK]
SHOT (8 seconds, vertical 9:16, keep the main action in the central 4:5 area):
0–4s: A young couple in a bright living room looks happily at a plain sofa they just bought second-hand; a mover in plain navy-blue work clothes arrives and, with a colleague, lifts the sofa wrapped in a grey moving blanket. Natural smiles, relaxed atmosphere.
4–8s: Exterior, Paris-suburb street: the movers carefully load the wrapped sofa into a plain white van, then close the van doors; the camera pans to follow the van driving away down a sunny street lined with trees.
Keep the top and bottom of the frame clean (no busy details) for text overlays.
```

**Montage :**
| Temps | Texte | Position |
|---|---|---|
| 0,3 – 3,8 s | « Quelques meubles à déplacer ? » | haut, trait pistache |
| 4,2 – 7,8 s | « Montreuil · Île-de-France · partout en France » | bas, bandeau bleu |
| 8 – 10 s | `fin-9x16.png` (ou `fin-4x5.png` en version fil) | plein écran |

---

## Vidéo 3 — LinkedIn · format 16:9 (recadrage 1:1 possible)

**Paramètres Flow :** ratio **16:9** · 8 s. Version carrée : recadrage centré + `fin-1x1.png`.

```
[STYLE BLOCK]
SHOT (8 seconds, horizontal 16:9, keep the main subject in the central square area):
0–4s: A modern small office in Paris being moved: movers in plain navy-blue work clothes roll a plain desk and office chairs protected with grey blankets on a moving dolly; plain cardboard archive boxes stacked neatly; a calm manager in business casual watches and nods. Smooth lateral tracking shot.
4–8s: Exterior: a plain white moving van parked in front of a Haussmann-style building in the early morning; the movers load the last protected desk; the camera slowly cranes up toward the Paris skyline in soft morning light.
Leave the left third of the frame visually simple for a text overlay.
```

**Montage :**
| Temps | Texte | Position |
|---|---|---|
| 0,3 – 3,8 s | « Un seul interlocuteur, du devis à la livraison » | tiers gauche, trait pistache |
| 4,2 – 7,8 s | « Un devis clair, vérifié par un conseiller » | tiers gauche, bandeau bleu |
| 8 – 10 s | `fin-16x9.png` (ou `fin-1x1.png`) | plein écran |

---

## Si Veo ajoute quand même du texte ou un logo

- Relancer en ajoutant en tête : `NO TEXT. NO LOGOS. NO LETTERS. PLAIN UNBRANDED VEHICLES AND BOXES.`
- Si un mot ou une plaque apparaît sur 1 ou 2 secondes : flouter/masquer la zone au montage ou couper le passage.
- **Ne jamais garder un plan où le nom « SAMYO » est écrit par l'IA** : le logo n'apparaît que via les images officielles.
- Option : utiliser une photo réelle du site (`public/media/terrain/…`) comme image de départ (« Frames to video ») — mais vérifier que les plaques restent floutées.

## Textes d'accompagnement (légende du post)

- **Instagram / Facebook :** « Déménagement ou quelques meubles à transporter ? SAMYO vous accompagne à Montreuil, en Île-de-France et partout en France. Estimez votre volume en ligne 👉 samyo-demenagement.com »
- **LinkedIn :** « Particuliers et professionnels : SAMYO Déménagement organise vos déménagements et transports de mobilier depuis Montreuil, avec un interlocuteur unique du devis à la livraison. Demande de devis en ligne : samyo-demenagement.com »
