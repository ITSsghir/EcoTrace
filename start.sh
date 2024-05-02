### This script is used to start the backend
## It installs the required packages and starts the backend services (db and express-api)

# Install required packages
sudo apt-get update && sudo apt-get install -y docker.io docker-compose

# Change directory to the backend
cd back

# Launch docker daemon
sudo systemctl start docker

# Start the backend server using docker-compose
docker-compose up -d

# Change directory back
cd ..