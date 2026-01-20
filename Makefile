# Load environment variables from .env file
# The "-" before include tells Make to ignore it if the file doesn't exist
-include .env
export

# Variables
ADC_DIR = $(shell pwd)/.gcloud_config
GCLOUD_BIN := $(shell command -v gcloud 2> /dev/null)
DOCKER_BIN := $(shell command -v docker 2> /dev/null)

.PHONY: all auth up down clean check-deps

# Default target when you just type 'make'
all: check-deps auth up

# --- Dependency Checks ---

check-deps:
# 1. check for google cloud cli
ifndef GCLOUD_BIN
	$(error "ERROR: 'gcloud' is not installed. Install it here: https://cloud.google.com/sdk/docs/install")
endif
# 2. check for docker cli
ifndef DOCKER_BIN
	$(error "ERROR: 'docker' is not installed. Install it here: https://www.docker.com/products/docker-desktop/")
endif
# 3. check for project id in .env
ifndef GCP_PROJECT_ID
	$(error "ERROR: PROJECT_ID is not set. Please check your .env for a PROJECT_ID=your-id")
endif
# 4. check that docker is running
	@docker info > /dev/null 2>&1 || (echo "ERROR: Docker is installed but not running. Please start Docker Desktop."; exit 1)
	@echo "✅ All dependencies (gcloud & docker) are verified."

auth: check-deps
	@echo "Setting up local Google Cloud credentials for project: $(GCP_PROJECT_ID)"
	@mkdir -p $(ADC_DIR)
	CLOUDSDK_CONFIG=$(ADC_DIR) gcloud auth application-default login
	@echo "Setting quota project to $(GCP_PROJECT_ID)..."
	CLOUDSDK_CONFIG=$(ADC_DIR) gcloud auth application-default set-quota-project $(GCP_PROJECT_ID)

up:
	@echo "Starting the application..."
	docker-compose up --build

down:
	docker-compose down

clean:
	@echo "Cleaning up credentials and docker artifacts..."
	rm -rf $(ADC_DIR)
	docker-compose down --rmi local --volumes --remove-orphans