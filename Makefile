.PHONY: app build cmd fix-permissions gen-key
app:
	docker compose up -d
stop:
	docker compose stop
build:
	docker compose up --build
cmd:
	docker compose exec -it app /bin/sh