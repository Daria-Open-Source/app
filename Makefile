SHELL := /bin/bash

# Load environment variables
-include backend/.env
export

# Variables - Localized to the backend folder for Docker access
ADC_DIR = $(CURDIR)/backend/.gcloud_config
GOOGLE_CLOUD_PROJECT ?= $(shell grep GOOGLE_CLOUD_PROJECT backend/.env | cut -d '=' -f2)

.PHONY: all auth up down clean check-deps

all: auth up

check-deps:
	@command -v gcloud >/dev/null 2>&1 || { echo "❌ gcloud not found"; exit 1; }
	@command -v docker >/dev/null 2>&1 || { echo "❌ docker not found"; exit 1; }
	@docker info >/dev/null 2>&1 || { echo "❌ docker not running"; exit 1; }
	@[ -z "$(GOOGLE_CLOUD_PROJECT)" ] && { echo "❌ GOOGLE_CLOUD_PROJECT missing in backend/.env"; exit 1; } || true

auth: check-deps
	@echo "Checking credentials in $(ADC_DIR)..."
	@mkdir -p "$(ADC_DIR)"
	@CLOUDSDK_CONFIG="$(ADC_DIR)" gcloud auth application-default print-access-token > /dev/null 2>&1 || { \
		echo "Authenticating..."; \
		CLOUDSDK_CONFIG="$(ADC_DIR)" gcloud auth application-default login --project $(GOOGLE_CLOUD_PROJECT); \
		CLOUDSDK_CONFIG="$(ADC_DIR)" gcloud auth application-default set-quota-project $(GOOGLE_CLOUD_PROJECT); \
	}
	@echo "✅ Credentials ready."

up:
	docker-compose up --build -d

down:
	docker-compose down

clean:
	rm -rf backend/.gcloud_config
	docker-compose down --rmi local -v