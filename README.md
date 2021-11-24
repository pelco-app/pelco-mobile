# Pelco 1 Reminder App - Mobile

## Table of Contents

- [Technologies](#technologies)
- [System Requirements](#system-requirements)
- [Setup](#setup)
  - [Clone repository](#1-clone-repository-and-change-directory)
  - [Install dependencies](#2-install-compile-dependencies)
  - [Configure credentials in .env file](#3-configure-credentials-in-env-file)
  - [Run server](#4-run-server)
- [Live Reload](#live-reload)
- [Building](#building)

## Technologies

- Ionic v5.5.x
- ReactJs v17.0.x
- Android Studio SDK for building apk
  - minSdkVersion: 21
  - compileSdkVersion: 30
  - targetSdkVersion: 30

## System Requirements

- Android Version: Lollipop (v5-v5.1.1) and up
- Storage: 10MB minimum
- RAM: at least 2GB
- Stable Internet connection

## Setup

### 1. Clone repository and change directory

```sh
git clone https://github.com/pelco-app/pelco-mobile.git
```

### 2. Install dependencies

```sh
npm install
```

### 3. Configure credentials in .env file

- Get Firebase Credentials here: https://console.firebase.google.com (Download `google-services.json` and move to `./android/app/google-services.json`)

```
REACT_APP_ENV="development"
REACT_APP_API_URL="http://[ip_address_from_api]:8000"
```

### 4. Run server

- You can then visit using: http://localhost:3100

```
npm start
```

## Live Reload

- Make sure to connect your phone with USB debugging on and connected to the same network, then:

```
adb tcpip 5555
adb connect [mobile_ip_address]
npm run serve:live
```

## Building

- Android Studio will open, then click on "Build"
- Apk build is location in `./android/app/build/outputs/apk/debug` folder

```
ionic cap build android
```

Essential folders:

- android: auto-generated folder that is used when building an apk for android
- src
  - assets: contains the logos and images used across the app
  - components: contains the reusable components across the app. eg: Button
  - pages: contains the pages that the users can visit across the app
  - states: contains the application states or variables while the user uses the app. eg: if the OTP pane should be displayed
  - styles: contains the global styles for the app
  - utils: contains all the useful functions that can be used again and again
  - AppRoutes.tsx: list of pages that the user can visit while not logged in
  - Tabs.tsx: list of pages that the user can visit while logged in
- .env: file that contains the configurations for the project
