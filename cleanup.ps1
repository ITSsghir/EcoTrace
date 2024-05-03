### This script is used to clean up the backend folder
## It deletes the images and db data

# Change directory to the backend folder
Set-Location .\back 2>&1 $null && Write-Host "Changed the directory to the backend folder"

# Delete the images of the docker-compose
# Get the images of the docker-compose
docker image rm back-api 2>&1 $null && Write-Host "Deleted the back-api image"

# Delete db data
Remove-Item -Recurse -Force .\db\ 2>&1 $null && Write-Host "Deleted the db data"

# Change directory to the project root
Set-Location .. 2>&1 $null && Write-Host "Changed the directory to the project root"