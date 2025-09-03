dev:
	docker-compose up -d && pnpm -w dev

db:migrate:
	pnpm prisma migrate dev

test:
	pnpm -w test
