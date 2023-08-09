### Chat App
## Table of Contents:
* [Overview](#overview)
* [How to Run](#how-to-run)
* [Technologies Used](#technologies-used)
* [Dependencies](#dependencies)
* [API](#api)
* [User Sotries](#user-stories)
* [Features](#features)
* [Credits](#credentials)
## Overview
Chat App an App for mobile devices that will provide users a chat interface and options to share images and their location (similar to Whats App or Telegram per se).
A short video to demonstrate how it works:
![Video of Chat-App](./assets/images%20&%20videos/final-version.MP4)

## How To Run
Prerequisites:

Before running the React Native app on Expo, ensure you have the following prerequisites:

* Node.js (16.13.2)
* npm
* Expo and Expo CLI (to install, run npm install -g expo-cli)
* Expo Account
* Testing

To test the app you can use:

* Android Studio and Android SDK (for Android development)
* Celphone (can suffice)
* Expo Go App (to test on your own mobile device)
* Xcode (for iOS development, macOS only)

Installation

Run following commands in your terminal:

1. To clone the repository... git clone https://github.com/HerRA17/Chat-App

2. To navigate to the project directory... cd Chat-App

3. To install dependencies... npm install

Configuration

4. Open the folder and create a config.js file in the root directory of the project.
5. (Optional) If you don't have a Firebase account yet, create one.
6. Create a Firebase project by following steps 1 through 5.

7. Next, register your app by following steps 1 through 3. Copy the firebaseConfig code block provided after // Your web app's Firebase configuration 

8. Open the config.js file you created earlier. Paste and export the firebaseConfig object as follows:

// Replace placeholders with your Firebase project configuration
const firebaseConfig = {
   apiKey: "YOUR_API_KEY",
   authDomain: "YOUR_AUTH_DOMAIN",
   projectId: "YOUR_PROJECT_ID",
   storageBucket: "YOUR_STORAGE_BUCKET",
   messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
   appId: "YOUR_APP_ID"
};

export default firebaseConfig;
Then save the file.

Note: Do not share your config.js file or commit it to version control systems as it contains sensitive information, including your Firebase API key. Keep it secure and accessible only to authorized individuals.

Running the app

9. Start the Expo development server by running npx expo start in your terminal.
10. Scan the QR code with the Expo Go app on your iOS or Android device, or select an emulator to run the app!

## Technologies Used
* React Native
* Expo
* Google Firestore Database
* Google Firebase
* Firebase Cloud Storage

## Dependencies
* "@expo/react-native-action-sheet": "^4.0.1",
* "@react-native-async-storage/async-storage": "1.17.11",
* "@react-native-community/netinfo": "9.3.7",
* "@react-navigation/native": "^6.1.6",
* "@react-navigation/native-stack": "^6.9.12",
* "expo": "^48.0.0",
* "expo-image-picker": "~14.1.1",
* "expo-location": "~15.1.1",
* "expo-status-bar": "~1.4.4",
* "firebase": "^9.13.0",
* "react": "18.2.0",
* "react-native": "0.71.8",
* "react-native-debugger": "^1.1.0",
* "react-native-gifted-chat": "^2.1.0",
* "react-native-maps": "1.3.2",
* "react-native-safe-area-context": "4.5.0",
* "react-native-screens": "~3.20.0",
* "expo-camera": "~13.2.1",
* "expo-media-library": "~15.2.3"
And dev-dependency:
* "@babel/core": "^7.20.0"
## User Stories
● As a new user, I want to be able to easily enter a chat room so I can quickly start talking to my
friends and family.
● As a user, I want to be able to send messages to my friends and family members to exchange
the latest news.
● As a user, I want to send images to my friends to show them what I’m currently doing.
● As a user, I want to share my location with my friends to show them where I am.
● As a user, I want to be able to read my messages offline so I can reread conversations at any
time.
● As a user with a visual impairment, I want to use a chat app that is compatible with a screen
reader so that I can engage with a chat interface.

## Features
● A page where users can enter their name and choose a background color for the chat screen
before joining the chat.
● A page displaying the conversation, as well as an input field and submit button.
● The chat must provide users with two additional communication features: sending images
and location data.
● Data gets stored online and offline.
## Credits
Tutor: Adewunmi bamishigbin
Mentor: Joel Cross