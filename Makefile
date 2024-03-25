.PHONY: dev

dev:
	docker compose up
stop:
	docker compose stop
build:
	docker compose up --build
cmd:
	docker compose exec -it giole-app /bin/sh

# Production cmd
production:
	docker stop giole-app-production || true \
	&& docker rm giole-app-production || true \
	&& docker compose -f docker-compose.prod.yml down \
	&& docker compose -f docker-compose.prod.yml up -d --build --remove-orphans
