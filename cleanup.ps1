### This script is used to clean up the backend folder
## It deletes the images and db data

# Change directory to the backend folder
Set-Location .\back

# Delete the images
docker rm express-api

# Delete db data
Remove-Item -Recurse -Force .\db\

# Change directory to the project root
Set-Location ..