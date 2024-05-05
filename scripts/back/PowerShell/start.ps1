### This script is used to start the backend
## It installs the required packages and starts the backend services (db and express-api)

# Install the required packages (docker desktop - includes docker cli and docker-compose) if not already installed
if (-not (Test-Path "C:\Program Files\Docker\Docker\Docker Desktop.exe")) {
    # Download the docker desktop installer
    Invoke-WebRequest -Uri "https://desktop.docker.com/win/stable/Docker%20Desktop%20Installer.exe" -OutFile "C:\Docker Desktop Installer.exe"

    # Install docker desktop
    Start-Process -FilePath "C:\Docker Desktop Installer.exe" -Wait
}

# Start the docker desktop
Start-Process -FilePath "C:\Program Files\Docker\Docker\Docker Desktop.exe" -Wait

# Change the directory to the backend folder
Set-Location .\back

# Run the docker-compose file
docker-compose up -d

# Change the directory to the project root
Set-Location .. 