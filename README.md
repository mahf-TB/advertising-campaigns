# advertising-campaigns

## Présentation
Ce dépôt contient deux applications :

- **Backend (Node.js/Express)** : API REST pour gérer les campagnes publicitaires.
- **Frontend (React/TypeScript)** : interface utilisateur pour la gestion et la consultation des campagnes.

## Démarrage rapide
- Backend : voir [test-node/README.md](test-node/README.md)
- Frontend : voir [test-react/README.md](test-react/README.md)

## Instructions pour lancer le projet

### Prérequis
- Node.js 18+
- pnpm (ou npm)
- MongoDB (local ou Atlas) pour le backend

### 1) Lancer le backend
```bash
cd test-node
pnpm install
# ou npm install

# créer un fichier .env à la racine de test-node
# exemple :
# MONGODB_URI=mongodb://localhost:27017/test-node
# PORT=3000

pnpm run dev
# ou npm run dev
```
L’API démarre par défaut sur http://localhost:3000 (ou le port défini dans `PORT`).

### 2) Lancer le frontend
Dans un autre terminal :
```bash
cd test-react
pnpm install
pnpm dev
```
L’application démarre par défaut sur http://localhost:5173.

### Documentation détaillée
- Backend : [test-node/README.md](test-node/README.md)
- Frontend : [test-react/README.md](test-react/README.md)
