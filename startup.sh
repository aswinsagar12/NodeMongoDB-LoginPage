#!/bin/bash

# Update system packages
apt-get update
apt-get upgrade -y

# Install dependencies
apt-get install -y apt-transport-https ca-certificates curl software-properties-common

# Install Docker
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -
add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
apt-get update
apt-get install -y docker-ce

# Start and enable Docker service
systemctl start docker
systemctl enable docker

# Install kubectl
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
chmod +x kubectl
mv kubectl /usr/local/bin/

# Install Minikube
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
chmod +x minikube-linux-amd64
mv minikube-linux-amd64 /usr/local/bin/minikube

# Configure Minikube
# Note: Replace these values based on your needs
minikube config set driver docker
minikube config set memory 4096
minikube config set cpus 2

# Start Minikube
minikube start --driver=docker

# Verify installation
minikube status
kubectl get nodes