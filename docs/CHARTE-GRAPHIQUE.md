# Charte graphique — SAMYO Déménagement & Transport (version 2)

Planche visuelle : `docs/charte/charte-samyo.pdf` (et `.html`, `.png`). Fichiers logo : `public/brand/` et `docs/charte/`.

## Logo

Le « S » de SAMYO est tracé comme un **itinéraire** : départ (cercle ouvert) en bas à gauche, arrivée (pastille aqua) en haut à droite. De A à B, sans détour. Le dessin est inchangé depuis la version 1 ; seules les couleurs ont évolué.

| Fichier | Usage |
|---|---|
| `samyo-logo.svg` | Version principale (bleu sur fond clair) |
| `samyo-logo-blanc.svg` | Sur fond bleu nuit, bleu SAMYO, photo sombre, camion |
| `samyo-symbole.svg` | Symbole seul (signature d'e-mail, tampon) |
| `samyo-symbole-carre.svg` | Avatar réseaux sociaux, favicon, application |

- **Zone de protection :** une marge égale à la moitié de la hauteur du symbole.
- **Taille minimale :** 24 px de haut pour le logo complet, sinon symbole seul.
- **À éviter :** déformer, ombrer, changer la couleur de la pastille, poser le logo bleu sur un fond aqua ou sur une photo chargée.
- **Camion :** logo blanc sur caisse bleu SAMYO, ou logo bleu sur caisse blanche.
- Lettrage vectorisé (Instrument Sans Semibold) : aucune police à installer. Régénération : `python3 scripts/build-logo.py`.

## Couleurs

Un seul bleu (teinte ≈ 227°), décliné du clair au nuit : les tons ne se contredisent jamais. Les neutres sont légèrement bleutés pour le prolonger.

| Nom | Hex | Usage |
|---|---|---|
| **Bleu SAMYO** | `#2348C4` | **Couleur d'identité** : logo, boutons, bandeaux, barre supérieure |
| Bleu nuit | `#0F1E4F` | Sections sombres, pied de page, symbole carré |
| Bleu 800 | `#1A3699` | Survol des boutons |
| Bleu 500 | `#4870EE` | Focus, liens au survol |
| Bleu 100 / 50 | `#DDE6FD` / `#F0F4FF` | Fonds d'information, fonds teintés |
| **Aqua** | `#3EC3D3` | Accent : pastille du logo, repères sur fond sombre |
| Aqua lisible | `#0B7C8E` | Accent en texte sur fond clair |
| Encre | `#101830` | Texte principal |
| Ardoise | `#566075` | Texte secondaire |
| Brume | `#F5F7FB` | Fond de page |
| Blanc | `#FFFFFF` | Cartes, formulaires |

**Dosage :** neutres ≈ 65 %, bleu SAMYO ≈ 22 %, bleu nuit ≈ 8 %, aqua ≤ 5 % (jamais en aplat ni en fond de bouton).
**Contrastes (WCAG AA) :** bleu SAMYO sur blanc 7,5:1 · ardoise 6,3:1 · aqua lisible 4,9:1.
Couleurs fonctionnelles à part : ambre `#8F5200` (à vérifier), rouge `#B42F2A` (erreurs).

## Typographies

- **Titres : Bricolage Grotesque**, graisse 500–600, interlettrage −2 %. Formes ouvertes et douces : chaleureuse et sérieuse.
- **Texte et interface : Figtree**, 400 pour le texte, 600 pour les boutons et libellés. Très lisible sur mobile.
- Polices libres (SIL Open Font License), disponibles sur Google Fonts.

## Ton

Simple, précis, rassurant : on parle comme un conseiller au téléphone. À éviter : superlatifs, jargon, promesses chiffrées non vérifiées.
