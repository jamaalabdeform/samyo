# Google : compte, fiche d'établissement et Google Analytics

Objectif : SAMYO possède **son** compte Google, **sa** fiche Google (Maps / recherche) et **son** tableau de bord Google Analytics. L'agence y est ajoutée comme gestionnaire, jamais comme propriétaire.

## 1. Compte Google du client
1. Créer un compte sur accounts.google.com (« Pour gérer mon entreprise »).
   - Idéalement avec l'adresse pro `contact@samyo-demenagement.fr` une fois créée (« Utiliser mon adresse e-mail actuelle ») ; à défaut, le Gmail du gérant.
2. Activer la validation en deux étapes et noter les codes de secours. Le client garde le mot de passe.

## 2. Fiche Google (Google Business Profile, ex « Google My Business »)
1. business.google.com → « Gérer maintenant » → nom : **SAMYO Déménagement**.
2. Catégorie principale : **Déménageur** (secondaires possibles : Service de transport de meubles, Garde-meubles seulement si le service existe).
3. Adresse : 17 place Général de Gaulle, Montreuil (code postal à indiquer). Si les clients ne viennent pas sur place : choisir « Je livre des produits et services à mes clients » et **masquer l'adresse**, puis zones desservies : Paris, Seine-Saint-Denis, Val-de-Marne, Hauts-de-Seine, Île-de-France.
4. Téléphone 07 44 63 02 06, site web (URL définitive), horaires.
5. Validation : Google propose vidéo, appel ou courrier. Prévoir de filmer le local / camion / document au nom de l'entreprise si la vidéo est demandée.
6. Ajouter les photos réelles (camions, chargement), une description factuelle, les services.
7. Gestionnaires → ajouter l'adresse de l'agence en **Gestionnaire**.
8. Une fois la fiche publiée : copier son lien (« Partager le profil ») et le transmettre → il sera ajouté au site (`company.social.googleBusiness`, données structurées Google).

## 3. Google Analytics 4
1. analytics.google.com, **connecté avec le compte du client** → « Commencer la mesure ».
2. Compte : `SAMYO Déménagement` · Propriété : `samyo-demenagement.fr` · Fuseau Europe/Paris · Devise EUR · Catégorie Services aux particuliers.
3. Flux de données → Web → URL du site → copier l'**ID de mesure** `G-XXXXXXXXXX`.
4. Dans Vercel (projet samyo) → Settings → Environment Variables : `NEXT_PUBLIC_GA_ID = G-XXXXXXXXXX` → Redeploy.
   Le bandeau de consentement apparaît alors automatiquement ; GA n'est chargé qu'après « Accepter » (obligation CNIL).
5. Admin → Gestion des accès → ajouter l'agence en **Éditeur** (ou Lecteur).
6. Admin → Événements → marquer `quote_submitted` (demande de devis envoyée) et `callback_requested` comme **événements clés** : ce sont les conversions du site. `phone_click` et `whatsapp_click` sont aussi remontés.
   Le site envoie directement ces événements à GA4 (après consentement) : ils apparaissent dans Rapports → Engagement → Événements quelques heures après les premières visites.
7. Lier la fiche Google et, plus tard, Google Ads et la Search Console à cette propriété.

## 4. Search Console (recommandé)
search.google.com/search-console → propriété « Domaine » `samyo-demenagement.fr` → enregistrement TXT à ajouter chez le registrar → envoyer `https://samyo-demenagement.fr/sitemap.xml`.

## Ce que le client voit
- Analytics → Rapports : visiteurs, pages vues, provenance (Google, réseaux, direct), appareils, villes, demandes de devis.
- Application mobile **Google Analytics** et **Google Business Profile** (gérer les avis, voir les appels et itinéraires depuis la fiche).
