### This script stops the backend services
## It stops the backend services (db and express-api)

# Change directory to the backend
cd back

# Stop the backend server using docker-compose
docker-compose down

# Change directory back
cd ..