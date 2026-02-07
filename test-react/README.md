# Frontend – Test technique

## Démarrage rapide

### Prérequis
- Node.js 18+ (recommandé)
- pnpm (gestionnaire de paquets)

### Installation
```bash
pnpm install
```

### Lancer en développement
```bash
pnpm dev
```
Puis ouvrir l’URL affichée dans le terminal (par défaut http://localhost:5173).

### Build de production
```bash
pnpm build
```

### Prévisualiser le build
```bash
pnpm preview
```

## Choix techniques

- **Vite + React + TypeScript** : démarrage rapide, HMR performant, typage strict pour fiabiliser l’UI.
- **Architecture par dossiers** :
	- `src/pages` pour les pages (Home, Add, Edit, Detail)
	- `src/components/common` pour les composants métiers (table, formulaire, pagination)
	- `src/components/ui` pour les composants UI réutilisables (shadcn/ui)
- **shadcn/ui** : composants accessibles, personnalisables, cohérents visuellement.
- **Hooks dédiés** (`src/hooks/use-campaigns.ts`) : centralisation des appels et de la logique de récupération.
- **Service API** (`src/services/campains.service.ts`) : couche d’accès aux données pour isoler l’API du reste de l’app.
- **CSS global léger** (`src/index.css`) : base de styles + variables si besoin.

## Améliorations possibles (avec plus de temps)

- **Tests** :
	- unitaires pour les composants et la logique (Vitest + Testing Library)
	- e2e pour les parcours clés (Playwright)
- **Expérience utilisateur** : états de chargement/skeletons, empty states, gestion d’erreurs plus fine.
- **Performance** : code-splitting, lazy loading des pages et optimisation des bundles.
- **Observabilité** : monitoring des erreurs (ex. Sentry) et logs front structurés.
- **Validation des formulaires** : schémas Zod + messages d’erreur UX.
- **Accessibilité** : audit complet (ARIA, focus management) + tests automatiques.
- **Internationalisation** : i18n pour préparer un usage multi-langues.
- **Qualité** : linting/formatting renforcés (ESLint + Prettier) et CI.
