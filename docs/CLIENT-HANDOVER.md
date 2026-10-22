# SAMYO Déménagement — guide de passation

Ce document permet à n'importe quel développeur (ou à SAMYO) de reprendre, déployer et faire évoluer le site sans dépendre de l'équipe qui l'a construit.

## 1. Ce que fait le site (V1)

```
Visiteur → site → calculateur de volume → demande de devis
        → e-mail récapitulatif à SAMYO (+ WhatsApp possible à tout moment)
        → traitement manuel : appel, WhatsApp ou e-mail, devis envoyé par SAMYO
```

- **Pas de CRM, pas de paiement, pas de facturation** dans la V1.
- **Aucun prix n'est calculé ni affiché** : le volume est déclaratif, SAMYO chiffre après vérification.
- L'**e-mail reçu fait foi**. L'espace `/espace-pro` est un module de démonstration (données enregistrées dans le navigateur), il n'est pas lié dans la navigation publique.

## 2. Coordonnées de l'entreprise

Un seul fichier : **`src/config/company.ts`**. Tout le site (en-tête, pied de page, WhatsApp, e-mails, mentions légales, données structurées Google) le lit.

| Donnée | Valeur actuelle | Statut |
|---|---|---|
| Nom | SAMYO Déménagement | reçu |
| Adresse | 17 place Général de Gaulle, Montreuil | code postal **non transmis**, laissé vide |
| Téléphone / WhatsApp | 07 44 63 02 06 | reçu |
| E-mail affiché | contact@samyo-demenagement.fr | **la boîte (ou une redirection) doit exister avant la mise en ligne** |
| Réception des demandes | oucharichafi@gmail.com (`company.leadInbox`) | non affiché, remplaçable par `LEAD_EMAIL_TO` |
| Horaires | — | non communiqués, rien n'est affiché |
| SIREN / forme | 519 804 330 · Chafi Ouchari, EI, micro-entreprise · APE 4942Z | confirmé par le client, affiché (`provisional: false`) |
| SIRET, TVA, assurance | — | **à fournir**, rien n'est affiché |

Règle : une valeur inconnue reste à `null` et n'apparaît pas sur le site. Ne jamais compléter « au jugé ».
Quand les informations légales sont complètes, passer `provisional` à `false` dans `company.ts` (les pages légales deviennent indexables).

## 3. E-mails envoyés à chaque demande

À chaque demande de devis, le site envoie **deux e-mails** via **Resend** :
1. **à SAMYO** (`LEAD_EMAIL_TO`, par défaut `contact@samyo-demenagement.com`) : fiche complète avec boutons Appeler / WhatsApp / Répondre ; « Répondre » écrit directement au client ;
2. **au client** : récapitulatif de sa demande (référence, trajet, date, volume estimé, formule, options) et la suite. **Pas de prix** : le devis chiffré est établi et envoyé par SAMYO.
La demande de rappel n'envoie que l'e-mail à SAMYO (pas d'adresse e-mail demandée).

Mise en place (une seule fois) :
1. Créer un compte sur resend.com.
2. **Domains → Add domain → `samyo-demenagement.com`** → recopier les enregistrements DNS indiqués (TXT/MX sur un sous-domaine `send`, DKIM) dans Cloudflare, en **DNS only**. Ils ne touchent pas à la messagerie Outlook existante. Attendre « Verified ».
3. **API Keys → Create** (permission « Sending access »).
4. Vercel → projet `samyo` → Settings → Environment Variables (Production) :
   - `RESEND_API_KEY` = la clé
   - `LEAD_EMAIL_FROM` = `SAMYO Déménagement <devis@samyo-demenagement.com>`
   - `LEAD_EMAIL_TO` = `contact@samyo-demenagement.com` (facultatif, c'est la valeur par défaut)
   puis **Redeploy**.
5. Faire une vraie demande sur le site avec une adresse personnelle : SAMYO et le client doivent recevoir chacun leur e-mail.

Sans domaine vérifié, Resend n'envoie qu'à l'adresse du compte Resend : le client ne reçoit rien.
Aperçus (hors production ou avec `ENABLE_EMAIL_PREVIEW=1`) : `/api/dev/email-preview` (SAMYO), `?kind=client` (client), `?kind=callback` (rappel).

## 4. WhatsApp et Jawabot

- Tous les boutons passent par `src/lib/whatsapp.ts` : lien `wa.me` vers le numéro de SAMYO, avec un message pré-rempli selon l'endroit (devis, rappel, suivi d'une demande avec sa référence…).
- Changer de numéro : `NEXT_PUBLIC_WHATSAPP_NUMBER=+33…` (ou `company.ts`).
- **Widget Jawabot** : la fenêtre de discussion est chargée sur les pages publiques (pas sur le calculateur, où la bulle masquerait le bouton « Continuer » sur mobile) (`src/components/JawabotWidget.tsx`, script `jawabot.stipway.com/widget.js`). Clé : `NEXT_PUBLIC_JAWABOT_WIDGET_KEY` (valeur par défaut intégrée), `off` pour le désactiver. Il n'est pas chargé dans `/espace-pro`.
- **Jawabot sur WhatsApp** : s'il répond sur le même numéro WhatsApp Business, rien à changer dans le site. S'il fournit un lien dédié, le mettre dans `NEXT_PUBLIC_JAWABOT_URL` : tous les boutons l'utiliseront. Ne pas annoncer d'assistant automatique sur le site tant qu'il n'est pas actif.

## 5. Photos

- Photos terrain : `public/media/terrain/*.webp`, déclarées dans `src/config/media.ts` (chaque emplacement a un texte alternatif et un point de cadrage `position`).
- Elles sont produites à partir des originaux du client par `python3 scripts/build-photos.py <dossier des originaux>` : floutage des plaques et des lettrages tiers, recadrage, légère harmonisation, export WebP. Les originaux ne sont pas versionnés.
- Ajouter une photo : l'ajouter dans `JOBS` du script (ou exporter un WebP ≤ 1600 px), puis la référencer dans `media.ts`.
- Les textes restent neutres (« Transporter », « Charger ») : ne pas affirmer que tous les véhicules visibles appartiennent à SAMYO.
- **Ne jamais publier** d'images de référence ou issues d'autres entreprises.

## 6. Catalogue des volumes

`src/data/furnitureCatalog.ts` : pièces, meubles et volume en m³, objets du parcours « transport », objets spécifiques (piano, coffre-fort…). Les volumes sont indicatifs : les remplacer par la grille de SAMYO si elle existe. Les objets spécifiques déclenchent la mention « étude spécifique » dans le parcours et dans l'e-mail.

## 7. Nom de domaine

Adresse de prévisualisation : `samyo.stipway.com`. Pour le domaine définitif (voir `docs/DOMAINE-HEBERGEMENT.md`) :
1. Acheter le domaine (OVH ou autre).
2. Vercel → Settings → Domains → ajouter le domaine, recopier les DNS indiqués chez le registrar.
3. `NEXT_PUBLIC_SITE_URL=https://www.domaine.fr` et `NEXT_PUBLIC_INDEXABLE=1`.
4. Créer une adresse e-mail pro sur le domaine, puis `NEXT_PUBLIC_CONTACT_EMAIL` et `LEAD_EMAIL_TO`.

## 8. Déploiement

**Vercel (recommandé)** : importer le dépôt GitHub, renseigner les variables (§9), Deploy. Chaque push sur `main` redéploie.
**Serveur Node (VPS)** : `npm ci && npm run build`, puis `node .next/standalone/server.js` (copier `public/` et `.next/static` dans `.next/standalone/`, détail dans `DOMAINE-HEBERGEMENT.md`). Node 20+ requis. Un hébergement mutualisé PHP ne convient pas.

Commandes : `npm run dev` · `npm run build` · `npm run lint` · `npm run typecheck`.

## 9. Variables d'environnement

| Variable | Obligatoire | Rôle |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | oui | URL publique (canonical, sitemap) |
| `RESEND_API_KEY` | oui en production | envoi des demandes par e-mail |
| `LEAD_EMAIL_TO` | conseillé | destinataire(s) des demandes |
| `LEAD_EMAIL_FROM` | dès qu'un domaine est vérifié | expéditeur |
| `NEXT_PUBLIC_INDEXABLE` | domaine définitif | `1` pour autoriser Google |
| `NEXT_PUBLIC_CONTACT_EMAIL` | non | remplace l'e-mail public |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | non | remplace le numéro WhatsApp |
| `NEXT_PUBLIC_JAWABOT_URL` | non | lien Jawabot dédié |
| `NEXT_PUBLIC_JAWABOT_WIDGET_KEY` | non | clé du widget Jawabot (`off` pour le masquer) |
| `ADMIN_ACCESS_CODE` | si `/espace-pro` est utilisé | code d'accès au module démo |
| `LEAD_WEBHOOK_URL` | non | copie JSON de chaque demande (Make, n8n, futur CRM) |
| `NEXT_PUBLIC_GA_ID` | non | Google Analytics 4, chargé après accord du bandeau cookies |
| `NEXT_PUBLIC_GTM_ID` | non | Google Tag Manager, même règle |
| `ENABLE_EMAIL_PREVIEW` | non | aperçu e-mail en production (déconseillé) |
| `NEXT_PUBLIC_VAN_IMAGE` | non | autre image de fourgon pour le hero |

Aucune clé ne doit être écrite dans le dépôt : uniquement dans Vercel (ou `.env.local`, ignoré par git).

## 10. Mesure d'audience

- **Vercel Web Analytics** (déjà intégré, sans cookie donc sans bandeau) : l'activer dans Vercel → projet → onglet **Analytics** → Enable. Visites, pages vues, provenance, appareils.
- **Google Analytics 4** (procédure complète, avec la fiche Google : `docs/GOOGLE-COMPTE-FICHE-ANALYTICS.md`) : créer une propriété GA4, copier l'ID `G-…` dans `NEXT_PUBLIC_GA_ID`, redéployer. Un bandeau de consentement apparaît alors automatiquement (obligatoire en France, CNIL) ; GA n'est chargé qu'après « Accepter ». Lien « Gestion des cookies » en bas de page.

## 11. Pages du site

Accueil · `/devis` (calculateur) · `/qui-sommes-nous` · `/contact` · `/mentions-legales` · `/cgu` · `/confidentialite`. Menu : Services, Formules, Fonctionnement, Qui sommes-nous, Contact.

## 12. Pages locales (SEO)

`src/data/locations.ts` est vide : aucune zone d'intervention n'a été confirmée. Pour publier une page `/demenagement-{ville}`, ajouter une entrée avec un contenu réel (contraintes d'accès, quartiers, stationnement) et `published: true`. Elle entre automatiquement dans le sitemap et les données structurées.

## 13. Évolutions prévues (hors V1)

- CRM / base de données : implémenter `LeadRepository` (`src/features/admin/leads.ts`) côté serveur, ou brancher `LEAD_WEBHOOK_URL`.
- Calcul de prix : grille dans `src/config/pricing.config.ts`, moteur dans `src/lib/pricing/`.
- Avis clients : uniquement des avis réels et vérifiables (Google Business Profile).
