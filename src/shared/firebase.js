import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDAp_rN6uYcNDsuaRZSq17OB-WU_ytj9aQ",
  authDomain: "magazine-community-f44d5.firebaseapp.com",
  projectId: "magazine-community-f44d5",
  storageBucket: "magazine-community-f44d5.appspot.com",
  messagingSenderId: "267610031126",
  appId: "1:267610031126:web:fd8816737df30b62552137",
  measurementId: "G-YTDJ8ZMBM7",
};

const Fbase = initializeApp(firebaseConfig);

export default Fbase;

export const dbService = getFirestore();

export const storageService = getStorage();

export const authService = getAuth();
