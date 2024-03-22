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
	docker compose -f docker-compose.prod.yml down && docker compose -f docker-compose.prod.yml up -d --build
