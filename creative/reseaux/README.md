# Visuels réseaux sociaux — SAMYO

| Fichier | Usage | Taille |
|---|---|---|
| `profil-bleu.png` | **Photo de profil** Facebook, LinkedIn (page entreprise), Google, WhatsApp Business — version principale | 1080 × 1080 |
| `profil-blanc.png` | Variante sur fond blanc | 1080 × 1080 |
| `profil-nuit.png` | Variante bleu nuit avec cercle pistache | 1080 × 1080 |
| `facebook-couverture.png` | **Couverture de la page Facebook** (affichée en 820 × 312 ; sur mobile les côtés sont recadrés, le texte reste dans la zone centrale) | 1640 × 624 |
| `linkedin-couverture.png` | **Bannière de la page entreprise LinkedIn** (1128 × 191, fournie en ×2) | 2256 × 382 |
| `linkedin-banniere-profil.png` | Bannière du **profil personnel** LinkedIn du gérant | 1584 × 396 |

Le texte des bannières démarre à gauche après la zone recouverte par la photo de profil.
Régénération : `python3 creative/reseaux/generer-visuels.py <racine du projet> <dossier html>` puis capture des pages HTML à leur taille exacte (Playwright).
