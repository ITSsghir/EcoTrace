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

# Install PowerShell latest version if not installed
if (-not (Get-Command pwsh -ErrorAction SilentlyContinue)) {
    # Install PowerShell
    winget install -e --id Microsoft.PowerShell
}

# Check if nvm is installed
if (-not (Get-Command nvm -ErrorAction SilentlyContinue)) {
    # Install nvm
    winget install -e --id CoreyButler.NVMforWindows

    # Add nvm to PATH
    $env:Path += ";$env:USERPROFILE\.nvm"
}