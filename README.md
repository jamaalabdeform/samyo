# SAMYO Déménagement & Transport

Site vitrine, calculateur de volume et demande de devis (déménagement ou transport d'objets) pour SAMYO Déménagement, Montreuil.

**V1 :** site → calculateur → demande → e-mail récapitulatif et WhatsApp → traitement manuel par SAMYO. Pas de CRM, pas de paiement, aucun prix affiché.

```bash
npm install
cp .env.example .env.local
npm run dev            # http://localhost:3000
npm run build          # build de production
npm run lint && npm run typecheck
```

- Site : `/` · Calculateur : `/devis` (transport : `/devis?besoin=transport`)
- Aperçu de l'e-mail reçu par SAMYO : `/api/dev/email-preview` (hors production)
- Module démo hors V1 : `/espace-pro` (code `ADMIN_ACCESS_CODE` ; `samyo` en développement)
- Prévisualisation : https://samyo.stipway.com

Coordonnées et mentions : `src/config/company.ts` (source unique, valeurs inconnues laissées vides).

Documentation :
- [`docs/CLIENT-HANDOVER.md`](docs/CLIENT-HANDOVER.md) : **à lire en premier** — déploiement, coordonnées, domaine, e-mail, WhatsApp/Jawabot, photos, volumes, variables
- [`docs/DOCUMENTATION-TECHNIQUE.md`](docs/DOCUMENTATION-TECHNIQUE.md) : architecture, calculateur, tarification, SEO
- [`docs/CHARTE-GRAPHIQUE.md`](docs/CHARTE-GRAPHIQUE.md) : logo, couleurs, typographies, ton
- [`docs/DOMAINE-HEBERGEMENT.md`](docs/DOMAINE-HEBERGEMENT.md) : Vercel, Cloudflare, domaine définitif, VPS
- [`docs/SEO-PLAN.md`](docs/SEO-PLAN.md) : plan SEO complet, étape par étape
- [`docs/GOOGLE-COMPTE-FICHE-ANALYTICS.md`](docs/GOOGLE-COMPTE-FICHE-ANALYTICS.md) : compte Google, fiche Google, Google Analytics
- [`docs/CLIENT-INFO-NEEDED.md`](docs/CLIENT-INFO-NEEDED.md) : informations encore attendues de SAMYO
