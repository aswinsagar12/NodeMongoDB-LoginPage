# Node.js MongoDB Application

## Overview
This repository contains a **Node.js MongoDB** application that serves as a simple login page for an eCommerce webpage. Users can:
- **Sign up** and **log in** securely.
- Use a **MongoDB database** (Atlas or local cluster) for user data storage.

---

## Features
- **Node.js Backend**: Handles authentication and routing.
- **MongoDB Integration**: Stores and retrieves user information.
- **Dockerized Deployment**: Containerize and run the app efficiently.
- **Infrastructure as Code (IaC)**: Provision GKE clusters using Terraform.
- **CI/CD Pipeline**: Automate the entire process with GitHub Actions.

---

## Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the application locally:
   ```bash
   npm run src/index.js
   ```

---

## Docker Deployment
1. Build the Docker image:
   ```bash
   docker build -t <image-name> .
   ```

2. Run the container:
   ```bash
   docker run -p 3000:3000 <image-name>
   ```

Access the application at: `http://localhost:3000`

---

## Terraform Deployment to GKE
1. Navigate to the Terraform configuration folder:
   ```bash
   cd terraform
   ```

2. Initialize Terraform:
   ```bash
   terraform init
   ```

3. Apply the configuration to provision the GKE cluster:
   ```bash
   terraform apply
   ```

---

## GitHub Actions CI/CD Pipeline
This repository includes a GitHub Actions workflow for complete automation:

1. **CI/CD Steps:**
   - Build and push the Docker image to a container registry.
   - Provision the GKE cluster using Terraform.
   - Deploy the containerized application on GKE.

2. **Secrets Management:**
   - Store your GKE Service Account key in the **GitHub Secrets** section as `GCP_SA_KEY`.
   - Use local `.env` files or secrets securely during Terraform deployments.

---

## Notes
- **MongoDB Configuration**: Use MongoDB Atlas for production or a local MongoDB cluster for development.
- Ensure your Terraform backend is properly configured for state management.
- For secure deployments, manage all sensitive information via `.env` files or GitHub Secrets.

---

## Contribution
Feel free to fork this repository and open pull requests to enhance functionality or fix issues.

---

## License
This project is licensed under the [MIT License](LICENSE).

---

### Happy Coding! 🚀