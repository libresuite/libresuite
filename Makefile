.PHONY: development-up development-down

development-up:
	@scripts/development/up.sh

development-down:
	@scripts/development/down.sh

up:
	@make development-up

down:
	@make development-down
