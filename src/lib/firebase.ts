
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: "fir-crud-4078f",
  storageBucket: 'fir-crud-4078f.appspot.com',
  messagingSenderId: process.env.FIREBASE_MSG_ID,
  appId: process.env.FIREBASE_APP_ID,
};

export const app = initializeApp(firebaseConfig);


