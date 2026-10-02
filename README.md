# SAMYO Déménagement & Transport

Site vitrine, calculateur de volume et demande de devis (déménagement ou transport d'objets), et espace entreprise. Pas de paiement en ligne : les acomptes sont encaissés hors site (SumUp).
**Les coordonnées affichées sont encore provisoires.**

```bash
npm install
cp .env.example .env.local
npm run dev
```

- Site : `/` · Calculateur : `/devis` (transport : `/devis?besoin=transport`) · Page locale : `/demenagement-lille`
- Espace entreprise : `/espace-pro` (code : variable `ADMIN_ACCESS_CODE` ; `samyo` en développement)
- Prévisualisation : https://samyo.stipway.com

Documentation :
- [`docs/DOCUMENTATION-TECHNIQUE.md`](docs/DOCUMENTATION-TECHNIQUE.md) : architecture, calculateur, réception des demandes, tarification, SEO
- [`docs/CHARTE-GRAPHIQUE.md`](docs/CHARTE-GRAPHIQUE.md) : logo, bleu roi, typographies, ton
- [`docs/DOMAINE-HEBERGEMENT.md`](docs/DOMAINE-HEBERGEMENT.md) : Vercel + Cloudflare (samyo.stipway.com), domaine définitif, OVH
- [`docs/CLIENT-INFO-NEEDED.md`](docs/CLIENT-INFO-NEEDED.md) : informations à collecter
- [`creative/higgsfield-prompts.md`](creative/higgsfield-prompts.md) : prompts des visuels et vidéos
