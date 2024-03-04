# EcoTrace

EcoTrace is a web application that allows users to track their carbon footprint and make more sustainable choices. Users can input their daily activities and purchases, and the app will calculate their carbon footprint. The app will also provide suggestions for more sustainable alternatives.

## Installation

### Requirements

- npm (Node Package Manager) - [Download](https://www.npmjs.com/get-npm)

- yarn (Package Manager)

```bash
npm install --global yarn
```

- expo-cli (Expo Command Line Interface)

```bash
npm install --global expo-cli
```

- Android Studio (For Android Emulator) - [Download](https://developer.android.com/studio)

- Xcode (For iOS Emulator) - [Download](https://developer.apple.com/xcode) (Only available on macOS)

### Steps

1. Clone the repository

    ```bash
    git clone https://github.com/ITSsghir/EcoTrace.git
    ```

1. Install the dependencies

    ```bash
    yarn install
    ```

1. Quick start the app (We'll use expo go to run the app on an emulator for now)

> Make sure to have an emulator running

- Run the following commands

    ```bash
    yarn expo prebuild --clean
    yarn expo # This will start the development server
    ```

- Press 's' to change to expo go mode
- Press `a` to open the app on an Android emulator or `i` to open the app on an iOS emulator

> This will install expo go on your emulator and open the app

## Build

We'll use `eas build --local` to build the app.

I created some profiles for the build process. You can find them in the `eas.json` file.

### iOS

```bash
yarn eas build --platform ios --profile preview
```

### Android

```bash
yarn eas build --platform android --profile preview
```

> The `preview` profile is made for testing, it enables ios simulator and disables the development client.

