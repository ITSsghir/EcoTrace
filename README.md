# EcoTrace

EcoTrace is a mobile application that allows users to track their carbon footprint and make more sustainable choices. Users can input their daily activities and purchases, as well as automate the process, and the app will calculate their carbon footprint. The app will also provide suggestions for more sustainable alternatives.

This repository contains the source code for the EcoTrace mobile application.
It consists of two main parts:

- [Frontend](./front/)
- [Backend](./back/)

But first, let's set up the project.

## Setup

### Prerequisites

- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/en/download/), Better to use the LTS version and install it via NVM Windows.
- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [Android Studio](https://developer.android.com/studio) or [Xcode](https://developer.apple.com/xcode/)

### Prepare the environment

1. Clone the repository

    ```bash
    git clone https://github.com/ITSsghir/EcoTrace.git
    cd EcoTrace
    ```

2. Install the prerequisites

    - First, run the [setup.ps1](./setup.ps1) script to install Winget, NVM.

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
        nvm on
        nvm install lts
        nvm use lts
        ```

        Setup yarn as the default package manager.

        ```bash
        npm install -g yarn
        ```

        Update yarn to the latest stable version.

        ```bash
        yarn set version stable
        ```

        > You may need to enable corepack to upgrade yarn.
        >
        > ```bash
        > corepack enable
        > yarn set version latest
        > ```

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
