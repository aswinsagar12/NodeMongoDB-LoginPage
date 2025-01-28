resource "google_compute_instance" "loginprofile" {
  name         = "loginprofile"
  zone         = "us-central1-a"
  machine_type = "e2-medium"
  tags         = ["loginprofile", "dev"]

  boot_disk { #define the boot disk for the instance
    initialize_params {
      image = "ubuntu-os-cloud/ubuntu-2004-lts"
      size  = 15
      type  = "pd-standard"
      labels = {
        envirmoment = "dev"
      }
    }
  }
  network_interface {   #define the network interface for the instance
    network = "default" #I'm using network default
    access_config {
    }
  }

  # metadata = {
  #   startup-script = file("startup.sh")
  # }
  labels = {
    envirmoment = "dev"
    name        = "loginprofile"
  }
}
