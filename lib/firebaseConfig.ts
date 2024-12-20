import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyD3s9k5wVgjlff6m3B6ZIn-k0-ZiJ-JS7M",
    authDomain: "paymate-92d44.firebaseapp.com",
    projectId: "paymate-92d44",
    storageBucket: "paymate-92d44.firebasestorage.app",
    messagingSenderId: "710637426114",
    appId: "1:710637426114:web:c1f6402db95e4a7deab25b",
    measurementId: "G-NMFSY9TH5E"
};

export const firebase = initializeApp(firebaseConfig);

const auth = initializeAuth(firebase, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth };
