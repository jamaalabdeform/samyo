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
| E-mail | oucharichafi@gmail.com | provisoire, en attendant une adresse au nom de domaine |
| Horaires | — | non communiqués, rien n'est affiché |
| SIRET, RCS, TVA, assurance | — | **à fournir** (extrait récent), rien n'est affiché |

Règle : une valeur inconnue reste à `null` et n'apparaît pas sur le site. Ne jamais compléter « au jugé ».
Quand les informations légales sont complètes, passer `provisional` à `false` dans `company.ts` (les pages légales deviennent indexables).

## 3. Réception des demandes par e-mail

Service utilisé : **Resend** (offre gratuite suffisante au démarrage).

1. Créer un compte sur resend.com avec l'adresse qui doit recevoir les demandes.
2. Créer une clé API → variable `RESEND_API_KEY`.
3. `LEAD_EMAIL_TO` = adresse(s) de réception, séparées par des virgules. Sans valeur, l'e-mail de `company.ts` est utilisé.
4. Tant qu'aucun domaine n'est vérifié dans Resend, l'expéditeur de test `onboarding@resend.dev` ne livre **qu'à l'adresse du compte Resend**. Une fois le domaine définitif acheté : Resend → Domains → ajouter le domaine, copier les enregistrements DNS (SPF, DKIM) chez le registrar, puis `LEAD_EMAIL_FROM="SAMYO devis <devis@votre-domaine.fr>"`.

L'e-mail contient : boutons **Appeler**, **WhatsApp** (conversation pré-remplie avec le client) et **Répondre par e-mail** ; puis client, projet, départ, arrivée, objets spécifiques, inventaire, points à vérifier, message. Le « Répondre » de la messagerie écrit directement au client.

Aperçu sans envoyer de demande (développement) : `/api/dev/email-preview` (devis), `?kind=callback` (rappel), `?format=text` (version texte).

## 4. WhatsApp et Jawabot

- Tous les boutons passent par `src/lib/whatsapp.ts` : lien `wa.me` vers le numéro de SAMYO, avec un message pré-rempli selon l'endroit (devis, rappel, suivi d'une demande avec sa référence…).
- Changer de numéro : `NEXT_PUBLIC_WHATSAPP_NUMBER=+33…` (ou `company.ts`).
- **Jawabot** : s'il répond sur le même numéro WhatsApp Business, rien à changer dans le site. S'il fournit un lien dédié, le mettre dans `NEXT_PUBLIC_JAWABOT_URL` : tous les boutons l'utiliseront. Ne pas annoncer d'assistant automatique sur le site tant qu'il n'est pas actif.

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
| `ADMIN_ACCESS_CODE` | si `/espace-pro` est utilisé | code d'accès au module démo |
| `LEAD_WEBHOOK_URL` | non | copie JSON de chaque demande (Make, n8n, futur CRM) |
| `NEXT_PUBLIC_GTM_ID` | non | Google Tag Manager (bandeau de consentement requis) |
| `ENABLE_EMAIL_PREVIEW` | non | aperçu e-mail en production (déconseillé) |
| `NEXT_PUBLIC_VAN_IMAGE` | non | autre image de fourgon pour le hero |

Aucune clé ne doit être écrite dans le dépôt : uniquement dans Vercel (ou `.env.local`, ignoré par git).

## 10. Pages locales (SEO)

`src/data/locations.ts` est vide : aucune zone d'intervention n'a été confirmée. Pour publier une page `/demenagement-{ville}`, ajouter une entrée avec un contenu réel (contraintes d'accès, quartiers, stationnement) et `published: true`. Elle entre automatiquement dans le sitemap et les données structurées.

## 11. Évolutions prévues (hors V1)

- CRM / base de données : implémenter `LeadRepository` (`src/features/admin/leads.ts`) côté serveur, ou brancher `LEAD_WEBHOOK_URL`.
- Calcul de prix : grille dans `src/config/pricing.config.ts`, moteur dans `src/lib/pricing/`.
- Avis clients : uniquement des avis réels et vérifiables (Google Business Profile).
