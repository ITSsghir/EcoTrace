# Change directory to the backend folder
Set-Location .\back 

# Delete db data
Remove-Item -Recurse -Force .\db\

# Change the directory to the project root
Set-Location ..