import firebase from 'firebase'
import '@firebase/firestore';
import { FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN, FIREBASE_PROJECT_ID } from 'react-native-dotenv'

console.log('PID', FIREBASE_PROJECT_ID)
const config = firebase.initializeApp({
  apiKey: "AIzaSyABnWWRCfPxeoUASV0a84879Fg-swiPpFk",
  authDomain: "spread-299e9.firebaseapp.com",
  projectId: "spread-299e9",
});


export { config as firebase };
