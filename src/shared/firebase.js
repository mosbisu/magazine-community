import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDAp_rN6uYcNDsuaRZSq17OB-WU_ytj9aQ",
  authDomain: "magazine-community-f44d5.firebaseapp.com",
  projectId: "magazine-community-f44d5",
  storageBucket: "magazine-community-f44d5.appspot.com",
  messagingSenderId: "267610031126",
  appId: "1:267610031126:web:fd8816737df30b62552137",
  measurementId: "G-YTDJ8ZMBM7",
};

firebase.initializeApp(firebaseConfig);

const apiKey = firebaseConfig.apiKey;
const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

export { auth, apiKey, firestore, storage };
