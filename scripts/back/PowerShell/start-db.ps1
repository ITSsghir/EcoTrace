# Change the directory to the backend folder
Set-Location .\back

# Run the docker-compose file
docker-compose up -d db

# Change the directory to the project root
Set-Location .. 