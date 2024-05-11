### This script is used to start the backend
## It installs the required packages and starts the backend services (db and express-api)

# Change the directory to the backend folder
Set-Location .\back

# Run the docker-compose file
docker-compose up -d --build -V

# Change the directory to the project root
Set-Location .. 