### This script is used to start the backend
## It installs the required packages and starts the backend services (db and express-api)

# Install required packages
sudo apt-get update && sudo apt-get install -y docker.io docker-compose 2>&1 /dev/null && echo "Packages installed successfully" || echo "Failed to install packages"

# Change directory to the backend
cd ./back 2>&1 /dev/null && echo "Changed directory to back" || echo "Failed to change directory to back"

# Launch docker daemon
sudo systemctl start docker 2>&1 /dev/null && echo "Docker daemon started successfully" || echo "Failed to start docker daemon"

# Start the backend server using docker-compose
docker-compose up -d 2>&1 /dev/null && echo "Backend services started successfully" || echo "Failed to start backend"

# Change directory back
cd .. 2>&1 /dev/null && echo "Changed directory to project root" || echo "Failed to change directory to project root"