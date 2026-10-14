# Informations encore attendues de SAMYO

Mise à jour du 14/10/2026. Chaque ligne indique où l'information sera branchée. Tant qu'elle manque, **rien n'est affiché** à la place.

## Déjà reçu
- Nom commercial SAMYO Déménagement, interlocuteur Chafi Ouchari
- Adresse : 17 place Général de Gaulle, Montreuil
- Téléphone et WhatsApp : 07 44 63 02 06
- E-mail : oucharichafi@gmail.com (provisoire)
- Photos de camions (4 utilisées après floutage des plaques et lettrages)

## Prioritaire avant mise en production
- [ ] **Extrait d'immatriculation récent** (Kbis ou avis de situation SIRENE) : raison sociale, forme juridique, SIRET, RCS, TVA → `company.legal`. Le document de cessation de 2023 ne peut pas servir de source.
- [ ] Inscription au registre des transporteurs / capacité de transport (si applicable) → `company.legal.transportRegistry`
- [ ] Assurance : assureur, type de contrat → `company.legal.insurance`
- [ ] **Code postal** de l'adresse de Montreuil → `company.address.postalCode`
- [ ] Compte **Resend** (ou accès à la boîte qui recevra les demandes) → `RESEND_API_KEY`, `LEAD_EMAIL_TO`
- [ ] **Nom de domaine** définitif (.fr et/ou .com) et accès au registrar
- [ ] **Adresse e-mail professionnelle** sur ce domaine → `NEXT_PUBLIC_CONTACT_EMAIL`
- [ ] Autorisation écrite d'utiliser les photos fournies (droits, personnes visibles)

## Contenu à valider
- [ ] Horaires de joignabilité → `company.hours` (format prévu dans `company.ts`)
- [ ] Zones d'intervention réelles (villes, départements, longue distance, étranger ?) → `src/data/locations.ts`
- [ ] Services réellement proposés et ceux à retirer (garde-meubles, monte-meubles, emballage…) → `src/data/services.ts`
- [ ] Formules (contenu exact, inclus/exclu) → `formulas`, options → `quoteOptions`
- [ ] Objets acceptés / refusés (piano, coffre-fort…) → `specialItems`
- [ ] Grille de volumes interne si elle existe → `src/data/furnitureCatalog.ts`
- [ ] Délai de réponse réaliste (ne sera affiché qu'une fois validé)
- [ ] Réseaux sociaux, fiche Google Business Profile → `company.social`

## Jawabot
- [ ] Jawabot répondra-t-il sur le même numéro WhatsApp Business ?
- [ ] Lien ou widget dédié éventuel → `NEXT_PUBLIC_JAWABOT_URL`
- [ ] Date de mise en service (aucune mention d'assistant automatique avant)

## Plus tard (hors V1)
- [ ] Grille tarifaire et modèle de devis réel (calcul de prix)
- [ ] CRM éventuel (webhook `LEAD_WEBHOOK_URL`)
- [ ] Avis clients réels et vérifiables
- [ ] Comptes marketing (GTM, GA4, Google Ads, Meta) et bandeau de consentement
- [ ] CGV, conditions d'annulation
