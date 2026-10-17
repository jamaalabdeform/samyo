# SAMYO Déménagement — plan SEO complet

Objectif : apparaître sur Google pour **« déménagement Montreuil »**, **« déménageur Seine-Saint-Denis / Paris / Île-de-France »**, **« transport de meubles »** et **« déménagement [ville] → [ville] »**, puis transformer ces visites en demandes de devis.

Légende : ✅ déjà fait dans le site · 🔲 à faire · 👤 action du client · 🛠 action technique (agence)

---

## Phase 0 — Déjà en place dans le site ✅

| Élément | Détail |
|---|---|
| Titre et description Google | « Déménagement Montreuil & Île-de-France, partout en France · SAMYO » + description orientée déménageur Montreuil (93) / Paris / IDF / France |
| Données structurées (schema.org) | `MovingCompany` : nom, raison sociale, SIREN, adresse, téléphone, e-mail, logo, zone desservie (Île-de-France, France) ; `FAQPage` ; fil d'Ariane |
| Sitemap et robots | `/sitemap.xml` (accueil, devis, qui sommes-nous, contact, pages légales) et `/robots.txt` (espace pro et API exclus) |
| Balises techniques | URL canonique sur chaque page, Open Graph + image de partage générée, `lang="fr"` |
| Pages | Accueil, calculateur `/devis`, `/qui-sommes-nous`, `/contact`, mentions légales, CGU, confidentialité |
| Contenu | FAQ « Où intervenez-vous ? », services, formules, zone Île-de-France + France |
| Performance | Next.js (pages pré-générées), images WebP/AVIF optimisées et chargées à la demande, polices auto-hébergées |
| Mobile | Site responsive, boutons d'appel / WhatsApp toujours accessibles |
| Mesure | Vercel Analytics (sans cookie) ; Google Analytics 4 prêt (`NEXT_PUBLIC_GA_ID`) avec bandeau de consentement et suivi des demandes de devis |
| Protection de la préprod | `samyo.stipway.com` n'est **pas** indexé tant que `NEXT_PUBLIC_INDEXABLE` ≠ `1` |

---

## Phase 1 — Mise en ligne sur le domaine définitif (semaine 1)

1. 👤 Acheter **samyo-demenagement.fr** (+ `.com` en redirection). Éviter le domaine accentué.
2. 🛠 Brancher le domaine sur Vercel, HTTPS automatique, rediriger `www` → domaine principal (ou l'inverse, un seul des deux).
3. 🛠 Variables Vercel : `NEXT_PUBLIC_SITE_URL=https://samyo-demenagement.fr` et **`NEXT_PUBLIC_INDEXABLE=1`** → redéployer.
4. 🛠 Rediriger `samyo.stipway.com` (301) vers le domaine définitif.
5. 👤 Créer `contact@samyo-demenagement.fr` (déjà affichée sur le site).
6. 🛠 Vérifier : `https://samyo-demenagement.fr/robots.txt` autorise l'exploration, `sitemap.xml` contient les bonnes URL.

## Phase 2 — Outils Google (semaine 1)

Procédure détaillée : `docs/GOOGLE-COMPTE-FICHE-ANALYTICS.md`.

1. 👤 Compte Google au nom de SAMYO.
2. 👤🛠 **Google Search Console** : propriété « Domaine » (enregistrement TXT chez le registrar) → envoyer `sitemap.xml` → demander l'indexation de l'accueil, `/devis`, `/contact`, `/qui-sommes-nous`.
3. 👤🛠 **Google Analytics 4** : ID `G-…` → `NEXT_PUBLIC_GA_ID` ; marquer `quote_submitted` et `callback_requested` comme événements clés.
4. 🛠 Lier Search Console ↔ Analytics.
5. 🔲 Bing Webmaster Tools : import direct depuis Search Console (5 minutes, ~5 % du trafic en France).

## Phase 3 — Fiche Google (Google Business Profile / « My Business ») — le levier n°1 en local

1. 👤 Créer la fiche : **SAMYO Déménagement**, catégorie principale **Déménageur** ; secondaires uniquement si le service existe (« Service de transport de meubles », « Garde-meubles »…).
2. 👤 Adresse Montreuil (avec code postal). Si les clients ne viennent pas sur place : masquer l'adresse et déclarer les **zones desservies** (Paris, Seine-Saint-Denis, Val-de-Marne, Hauts-de-Seine, Île-de-France).
3. 👤 Téléphone 07 44 63 02 06, site web, **horaires** (indispensables pour apparaître « ouvert »).
4. 👤 Validation (vidéo du camion / local, ou courrier).
5. 👤 Description factuelle (750 caractères), liste des services, attributs.
6. 👤 **10 à 20 vraies photos** : camions, chargement, équipe (avec accord), avant/après. Puis 2 à 4 nouvelles photos par mois.
7. 👤 Un « post » Google par mois (conseil, disponibilité, chantier réalisé).
8. 🛠 Envoyer le lien de la fiche → ajouté au site (`company.social.googleBusiness`, `sameAs` schema.org).
9. **Cohérence NAP** : Nom, Adresse, Téléphone **strictement identiques** partout (site, fiche, annuaires).

## Phase 4 — Avis clients (en continu)

1. 👤 Récupérer le lien « Demander des avis » de la fiche Google.
2. 👤 L'envoyer **par WhatsApp le soir du déménagement** à chaque client satisfait (message type ci-dessous).
3. 👤 Répondre à **tous** les avis, positifs et négatifs, sous 48 h.
4. 🛠 Quand il y a des avis réels : les afficher sur le site (bloc avis Google) — jamais d'avis inventés ni de note sans source.
5. Objectif : 10 avis en 2 mois, puis 3 à 5 par mois.

> *« Bonjour [Prénom], merci pour votre confiance aujourd'hui ! Si vous êtes satisfait, un petit avis nous aiderait beaucoup : [lien]. Bonne installation, l'équipe SAMYO. »*

## Phase 5 — Pages locales (mois 1 à 3) — le levier n°2

Le site est prêt : chaque ville ajoutée dans `src/data/locations.ts` crée une page `/demenagement-{ville}`, l'ajoute au sitemap et aux données structurées.

1. 👤 Valider les villes prioritaires. Proposition, par ordre :
   - **Montreuil**, Paris (puis arrondissements de l'Est : 11e, 12e, 20e), Vincennes, Bagnolet, Rosny-sous-Bois, Fontenay-sous-Bois, Noisy-le-Sec, Romainville, Saint-Denis, Bobigny, Créteil, Saint-Maur-des-Fossés, Pantin, Aubervilliers, Ivry-sur-Seine.
2. 🛠 **1 page = contenu unique**, jamais de copier-coller avec juste le nom changé (Google pénalise) :
   - contraintes réelles (rues étroites, stationnement, immeubles anciens sans ascenseur…),
   - démarche d'**autorisation de stationnement** propre à la mairie (lien officiel),
   - quartiers desservis, exemples de trajets fréquents,
   - FAQ locale (3-4 questions), CTA devis + téléphone,
   - photo réelle si possible.
3. 🛠 Rythme : 2 à 4 pages par mois, d'abord les villes où SAMYO travaille le plus.
4. 🛠 Maillage : lien depuis l'accueil (« Nos zones ») et entre villes voisines.

## Phase 6 — Pages services (mois 2 à 3)

Une page dédiée par prestation réellement proposée (à valider par le client) :
- `/transport-de-meubles` (canapé, armoire, achat Leboncoin…) — forte demande, peu de concurrence
- `/demenagement-longue-distance` (Île-de-France → province)
- `/demenagement-entreprise` (bureaux, commerces)
- `/garde-meubles`, `/monte-meubles`, `/demenagement-piano` **uniquement si le service existe**

Chaque page : 600-1 000 mots utiles, FAQ, CTA vers le calculateur avec le bon parcours pré-rempli (ex. `/devis?besoin=transport`).

## Phase 7 — Contenu « conseils » (à partir du mois 3)

Articles qui répondent aux questions que les gens tapent dans Google, avec lien vers le calculateur :
- Comment calculer le volume de son déménagement (avec tableau des meubles)
- Autorisation de stationnement pour un déménagement à Paris / Montreuil : démarches et délais
- Check-list déménagement : J-60 à J+7
- Combien de cartons pour un T2 / T3 ?
- Déménager un piano / un frigo américain / une armoire normande
- Déménagement : quels jours sont les moins chers ? (sans chiffres inventés)

Rythme réaliste : 1 à 2 articles par mois. 🛠 Prévoir un mini-blog (`/conseils`) dans le site quand on démarre.

## Phase 8 — Annuaires et liens (mois 1 à 6)

Inscriptions avec **exactement le même NAP** :
- 👤 PagesJaunes, Apple Plans (Apple Business Connect), Bing Places, Waze
- 👤 Annuaires spécialisés : déménageurs, sites de devis (avec prudence sur les plateformes payantes)
- 👤 Mairie de Montreuil / annuaire des entreprises locales, CCI
- 👤 Réseaux : page Facebook, Instagram (photos de chantiers) → liens vers le site
- Partenariats locaux : agences immobilières, syndics, gardiens d'immeubles, magasins de meubles (lien + recommandation)

## Phase 9 — Technique et suivi (mensuel)

| Contrôle | Outil | Fréquence |
|---|---|---|
| Pages indexées, erreurs, requêtes tapées | Search Console | mensuel |
| Vitesse (Core Web Vitals) | PageSpeed Insights / Search Console | mensuel |
| Visites, sources, demandes de devis | Google Analytics | mensuel |
| Appels, itinéraires, vues de la fiche | Google Business Profile | mensuel |
| Positions sur 10 mots-clés cibles | Search Console (onglet Performances) | mensuel |
| Nouveaux avis + réponses | Fiche Google | hebdomadaire |

Mots-clés à suivre : déménagement Montreuil · déménageur Montreuil · déménagement 93 · déménageur Seine-Saint-Denis · déménagement Paris pas cher · transport de meubles Paris · transport canapé Île-de-France · déménagement Île-de-France province · petit déménagement Paris · devis déménagement en ligne.

## Phase 10 — Option payante (si besoin de demandes rapidement)

- **Google Ads** ciblé (Montreuil + 10 km, mots-clés ci-dessus), conversion = `quote_submitted` / appel.
- **Annonces Services Locaux Google** (badge « Vérifié par Google ») si éligible.
- Budget test : 300 à 500 €/mois pendant 2 mois, puis ajuster selon le coût par demande.

---

## Planning résumé

| Quand | Actions |
|---|---|
| Semaine 1 | Domaine + indexation activée, Search Console, Analytics, création de la fiche Google |
| Mois 1 | Fiche Google complète + photos, 1ers avis, 4 pages villes, annuaires principaux |
| Mois 2 | Pages services (transport de meubles, longue distance), 4 pages villes, 10 avis |
| Mois 3 | Blog conseils (2 articles/mois), premiers partenariats locaux |
| Ensuite | 2 pages ou articles/mois, avis en continu, bilan mensuel |

## Ce dont on a besoin du client

- 👤 Choix du domaine + accès registrar
- 👤 Compte Google (Search Console, Analytics, fiche)
- 👤 **Code postal**, **horaires**, liste des **villes** et **services** réellement couverts
- 👤 Photos réelles régulières (avec accord des personnes)
- 👤 Envoi systématique du lien d'avis après chaque déménagement
- 👤 Infos terrain par ville (stationnement, immeubles, anecdotes) pour des pages uniques

> Délai réaliste : premiers résultats locaux (fiche Google) en 4 à 8 semaines, positions organiques solides sur les pages villes en 3 à 6 mois.
