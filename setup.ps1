# Check if winget is installed
if (-not (Get-Command winget -ErrorAction SilentlyContinue)) {
    # Install winget
    $URL = "https://api.github.com/repos/microsoft/winget-cli/releases/latest"
    $URL = (Invoke-WebRequest -Uri $URL).Content | ConvertFrom-Json |
            Select-Object -ExpandProperty "assets" |
            Where-Object "browser_download_url" -Match '.msixbundle' |
            Select-Object -ExpandProperty "browser_download_url"

    # download 
    Invoke-WebRequest -Uri $URL -OutFile "Setup.msix" -UseBasicParsing

    # install
    Add-AppxPackage -Path "Setup.msix"

    # delete file
    Remove-Item "Setup.msix"
}

# Check if nvm is installed
if (-not (Get-Command nvm -ErrorAction SilentlyContinue)) {
    # Install nvm
    winget install -e --id CoreyButler.NVMforWindows

    # Add nvm to PATH
    $env:Path += ";$env:USERPROFILE\.nvm"

    # Enable nvm
    nvm on
}

# Install node using nvm (lts)
# Check the current node version
$nodeVersion = node --version
$latestNodeVersionLTS = 'v20.13.0'

# If it doesn't includes the node version, install it
#
if ($nodeVersion -notlike "*$latestNodeVersionLTS*") {
    nvm install lts
    nvm use lts
}


# Install yarn
if (-not (Get-Command yarn -ErrorAction SilentlyContinue)) {
    npm install -g yarn
}

# Install corepack
if (-not (Get-Command corepack -ErrorAction SilentlyContinue)) {
    npm install -g corepack --force
}

# Enable corepack
corepack enable

# Update yarn
# If yarn version is < 4.0.0, update yarn
$yarnVersion = yarn --version
if ($yarnVersion -lt "4.0.0") {
    yarn set version stable
}

yarn --version

# Install the required packages (docker desktop - includes docker cli and docker-compose) if not already installed
if (-not (Test-Path "C:\Program Files\Docker\Docker\Docker Desktop.exe")) {
    # Download the docker desktop installer
    Invoke-WebRequest -Uri "https://desktop.docker.com/win/stable/Docker%20Desktop%20Installer.exe" -OutFile "C:\Docker Desktop Installer.exe"

    # Install docker desktop
    Start-Process -FilePath "C:\Docker Desktop Installer.exe" -Wait
}
else {
    # Start the docker desktop
    Start-Process -FilePath "C:\Program Files\Docker\Docker\Docker Desktop.exe" -Wait
}