#!/usr/bin/env bash

set -euo pipefail

bash infra/docker/development/build-base.sh

docker compose -f infra/docker/development/compose.yml up -d --build