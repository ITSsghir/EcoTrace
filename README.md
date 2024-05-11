# EcoTrace

EcoTrace is a mobile application that allows users to track their carbon footprint and make more sustainable choices. Users can input their daily activities and purchases, as well as automate the process, and the app will calculate their carbon footprint. The app will also provide suggestions for more sustainable alternatives.

This repository contains the source code for the EcoTrace mobile application.
It consists of two main parts:

- [Frontend](./front/)
- [Backend](./back/)

But first, let's set up the project.

## Setup

### Prerequisites

- [Git](https://git-scm.com/downloads) (Mandatory for the project)
- [Node.js](https://nodejs.org/en/download/), Better to use the LTS version and install it via NVM Windows.
- [Yarn](https://yarnpkg.com/getting-started/install) (Mandatory for the project)
- [Winget](https://docs.microsoft.com/en-us/windows/package-manager/winget/) (Required for the setup script)
- [WSL2](https://docs.microsoft.com/en-us/windows/wsl/install) (Required for Docker Desktop)
- [Docker Desktop](https://www.docker.com/products/docker-desktop) (Required for the backend)
- [Android Studio](https://developer.android.com/studio) or [Xcode](https://developer.apple.com/xcode/) (Optional, you can use Expo Go on your device instead of an emulator, but it's recommended to have an emulator for testing purposes)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (Optional)
- [gcloud CLI](https://cloud.google.com/sdk/docs/install) (for the backend Google API)
- [PowerShell 7](https://learn.microsoft.com/fr-fr/powershell/scripting/install/installing-powershell-on-windows) (Optional but recommended for running the scripts)

### Prepare the environment

1. Clone the repository

    ```bash
    git clone https://github.com/ITSsghir/EcoTrace.git
    cd EcoTrace
    ```

2. Install the prerequisites

    - First, run the [setup.ps1](./setup.ps1) script to install Winget, NVM, and PowerShell 7.

        > You may need to run the script as an administrator, and enable the execution of PowerShell scripts.
        >
        > You can do this by running the following command in PowerShell as an administrator.
        >
        > ```bash
        > Set-ExecutionPolicy -ExecutionPolicy Unrestricted -Scope CurrentUser
        > ```

    - Then you need Docker Desktop for the backend side
    - For that, you'll need WSL2, you can follow the instructions [here](https://docs.microsoft.com/en-us/windows/wsl/install) to install it.
    - Now you're ready to install Docker Desktop, you can download it from the [official website](https://www.docker.com/products/docker-desktop).

    - Download and install Android Studio or Xcode from the links above.

    - Enable NVM, and install Node.js LTS version using NVM (You have it already installed if you ran the setup script).

        ```bash
        # Enable NVM
        nvm on
        # Install Node.js LTS version
        nvm install lts
        # Use Node.js LTS version
        nvm use lts
        ```

        > If NVM is not recognized as a command, you may need to reinstall it manually by running the following commands:
        >
        > ```bash
        > # Install NVM for Windows
        > winget install -e --id CoreyButler.NVMforWindows
        >
        > # Add nvm to PATH
        > $env:Path += ";$env:USERPROFILE\.nvm"
        > ```

    - Setup yarn as the default package manager.

        ```bash
        npm install -g yarn
        ```

    - Update yarn to the latest stable version.

        ```bash
        yarn set version stable
        ```

        > You may need to enable corepack to upgrade yarn.
        >
        > ```bash
        > corepack enable
        > yarn set version latest
        > ```

    - Install Expo CLI globally (Optional, we're using `yarn expo` instead of `expo` anyway).

        ```bash
        # It doesn't matter if you use npm or yarn to install it, it will work with both.
        yarn global add expo-cli
        # Or
        npm install -g expo-cli
        ```

    - Install gcloud CLI for the backend Google API.

        ```bash
        gcloud init
        ```

        > We'll provide the necessary credentials for the backend later.

3. Install the project dependencies in the root directory, front, and back.

    ```bash
    yarn install
    cd front
    yarn install
    cd ../back
    yarn install
    cd ..
    ```

4. Start the backend server

    ```bash
    yarn start-back
    ```

5. Start the frontend server

    ```bash
    cd front
    yarn start
    ```

6. Open Android Studio or Xcode and start your emulator, then run `a - Open on Android` or `i - Open on iOS` respectively in the Expo Metro Bundler to start the mobile application on the emulator.

    > Make sure to have the backend server running before starting the frontend server.
    >
    > You need to have the Metro Bundler on Expo Go mode to run the application.
    >
    > If you wanna run the application on a real device, you can scan the QR code provided by the Metro Bundler, but you need to start the app in tunnel mode, and have the expo go app installed on your device, and your device needs to be on the same network as your computer.
    >
    > To start the app in tunnel mode, run `yarn start --tunnel`.
