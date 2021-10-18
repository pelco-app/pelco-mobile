# Pelco 1 Reminder App - Mobile

## Table of Contents

- [Technologies](#technologies)
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
REACT_APP_ENV="production"
REACT_APP_API_URL=
```

### 4. Run server

```
npm start
```

## Live Reload

- Make sure to connect your phone with USB debugging on

```
adb tcpip 5555
adb connect [mobile_ip_address]
npm run serve:live
```

## Building

```
ionic build
ionic cap add android
ionic cap build android
```
