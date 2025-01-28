# Configure the Google Cloud provider
terraform {
  backend "gcs" {
    bucket = "loginprofile-bucket"
    prefix = "terraform/state"
  }
  required_providers {
    google = {
      source = "hashicorp/google"
    }
  }
}

provider "google" {
  project     = "loginprofile123"
  region      = "us-central1"
  zone        = "us-central1-a"
  # credentials = file("loginprofile.json")
}

# Create a GKE cluster
resource "google_container_cluster" "loginprofile_cluster" {
  name     = "loginprofile-cluster"
  location = "us-central1-a"

  # Set initial node count to at least 1
  initial_node_count = 1

  # Node pool configuration
  node_config {
    preemptible  = false
    machine_type = "e2-medium"
    disk_size_gb = 100
    oauth_scopes = [
      "https://www.googleapis.com/auth/cloud-platform"
    ]
  }

  # Kubernetes version
  release_channel {
    channel = "REGULAR"
  }

  # Networking configuration
  networking_mode = "VPC_NATIVE"

  # Use the default VPC network and its subnetwork
  network             = "default"
  subnetwork          = "default"
  deletion_protection = true

  # Cluster auto-scaling
  cluster_autoscaling {
    enabled = true
    resource_limits {
      resource_type = "cpu"
      minimum       = 1
      maximum       = 10
    }
    resource_limits {
      resource_type = "memory"
      minimum       = 1
      maximum       = 30
    }
  }

  # Remove the default node pool if desired
  remove_default_node_pool = true
  # Enable deletion protection

}


#Gooogle Bucket

resource "google_storage_bucket" "loginprofile_bucket" {
  name          = "loginprofile-bucket"
  location      = "us-central1"
  storage_class = "standard"
  # Optional configurations
  versioning {
    enabled = true # Enables versioning of the files in the bucket
  }

  lifecycle {
    prevent_destroy = true # Prevents accidental deletion of the bucket
  }
  labels = {
    environment = "dev"
    owner       = "loginprofile"
  }
  # Optional: Define uniform bucket-level access (for IAM permissions)
  uniform_bucket_level_access = true
}
