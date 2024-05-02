
### This script stops the backend services
## It stops the backend services (db and express-api)

# Change the directory to the backend folder
Set-Location .\back

# Stop the backend services
docker-compose down

# Change the directory to the project root
Set-Location ..