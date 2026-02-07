# Mini plateforme de gestion de campagnes publicitaires

## 🎯 Objectif
Créer une mini plateforme AdTech permettant de gérer des campagnes
publicitaires et de suivre leurs performances (CTR, CPC).

---

## 🛠️ Stack technique
# Mini plateforme de gestion de campagnes publicitaires

## Description
Ce dépôt contient une API Node.js/Express minimale pour gérer des campagnes publicitaires (CRUD), avec validation et tests unitaires.

## Prérequis
- Node.js 18+ (ou version compatible)
- pnpm ou npm
- MongoDB (local ou URI MongoDB Atlas)

## Installation
1. Cloner le dépôt

2. Installer les dépendances

```bash
cd test-node
pnpm install
# ou npm install
```

3. Configurer les variables d'environnement

Créer un fichier `.env` à la racine (exemple):

```
MONGODB_URI=mongodb://localhost:27017/test-node
PORT=3000
```

## Lancer le projet

- Mode développement (avec redémarrage automatique):

```bash
pnpm run dev
# ou npm run dev
```

- Mode production:

```bash
pnpm start
# ou npm start
```

Le serveur écoute par défaut sur le port indiqué dans `PORT` (ex: http://localhost:5000).

## Tests

```bash
pnpm test
# ou npm test
```

## Choix techniques (explication)
- Node.js + Express: léger et approprié pour une API REST simple.
- MongoDB + Mongoose: stockage de documents flexible pour les campagnes.
- Joi: validation des payloads côté serveur pour garder la logique claire.
- Jest + Supertest: tests unitaires et d'intégration pour les routes et la couche service.
- Nodemon (dev): redémarrage automatique pendant le développement.

Ces choix visent la simplicité, la rapidité de prototypage et la facilité d'écriture de tests.

## Structure notable du projet
- `server.js` : point d'entrée.
- `src/app.js` : configuration Express.
- `src/routes/campaign.routes.js` : routes HTTP.
- `src/controllers/campaign.controller.js` : logique des endpoints.
- `src/services/campaign.service.js` : logique métier.
- `src/models/Campaign.js` : schéma Mongoose.
- `src/validators/campaign.validator.js` : règles de validation Joi.
- `test/` : tests existants pour le contrôleur et le service.

## Améliorations possibles (avec plus de temps)
- Ajouter authentification (JWT) et autorisation par rôle.
- Pagination, filtrage et recherches avancées pour les listes de campagnes.
- Ajout d'une interface frontend (React/Next) et d'une API publique documentée (OpenAPI/Swagger).
- Meilleure observabilité : logs structurés, métriques et tracing distribué.
- CI/CD : linting, tests et déploiement automatisés.

## Notes finales
Si vous voulez, je peux :
- Lancer les tests et partager les résultats.
- Ajouter un fichier `.env.example`.
- Générer une documentation OpenAPI.
