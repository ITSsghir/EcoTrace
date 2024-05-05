### This script is used to clean up the backend folder
## It deletes the images and db data

# Change directory to the backend folder
cd ./back

# Delete the images
docker image rm back-api

# Delete db data
rm -rf db/

# Change directory to the project root
Set-Location ..