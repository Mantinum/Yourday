# Yourday

Monorepo pour l'application Yourday. Le socle est prêt pour les futures implémentations.

## Run in Codespaces

Cliquez sur "Open in Codespaces" pour lancer l'environnement cloud. Les dépendances, migrations et seed sont exécutés automatiquement. Ensuite lancez :

```bash
pnpm -w dev
```

L'API est exposée sur http://localhost:4000 et le Web sur http://localhost:3000.

## Run in CI locally (when network ok)

Pour reproduire le pipeline CI en local :

```bash
pnpm install
pnpm prisma generate
pnpm prisma migrate dev -n local
pnpm exec ts-node prisma/seed.ts
pnpm -w build
pnpm -w test
```

## Scripts

- `pnpm dev` – démarre toutes les apps
- `pnpm build` – build des apps
- `pnpm test` – lance les tests
