.PHONY: app dev build cmd fix-permissions gen-key
app:
	docker compose up -d
dev:
	docker compose up
stop:
	docker compose stop
build:
	docker compose up --build
cmd:
	docker compose exec -it app /bin/sh