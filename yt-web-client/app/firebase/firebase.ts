// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  User,
} from 'firebase/auth'
import { getFunctions } from 'firebase/functions'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBl26BCR3HBiYFSeYhKarEoUWdUWIkEgt8',
  authDomain: 'yt-clone-6ee22.firebaseapp.com',
  projectId: 'yt-clone-6ee22',
  appId: '1:88900171417:web:a8604fbc52dd078d4b2a08',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
export const functions = getFunctions()

/**
 * Signs the user in with a Google popup.
 * @returns A promise that resolves with the user's credentials.
 */
export function signInWithGoogle() {
  const provider = new GoogleAuthProvider()
  return signInWithPopup(auth, provider)
}

/**
 * Signs the user out.
 * @returns A promise that resolves when the user is signed out.
 */
export function signOut() {
  return auth.signOut()
}

/**
 *
 * Triggers a callback when user auth changes.
 * @returns A function to unsubscribe callback.
 */
export function onAuthStateChangedHelper(
  callback: (user: User | null) => void
) {
  return onAuthStateChanged(auth, callback)
}
