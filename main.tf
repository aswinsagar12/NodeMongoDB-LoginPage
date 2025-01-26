# Configure the Google Cloud provider
provider "google" {
  project     = "loginprofile123"
  region      = "us-central1"
  zone        = "us-central1-a"
  #credentials = file("loginprofile.json")
}

# Create a GKE cluster
resource "google_container_cluster" "loginprofile_cluster" {
  name               = "loginprofile-cluster"
  location           = "us-central1-a"

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
  network    = "default"
  subnetwork = "default"

  # Cluster auto-scaling
  cluster_autoscaling {
    enabled = true
    resource_limits {
      resource_type = "cpu"
      minimum      = 1
      maximum      = 10
    }
    resource_limits {
      resource_type = "memory"
      minimum      = 1
      maximum      = 30
    }
  }

  # Remove the default node pool if desired
  remove_default_node_pool = true
}


