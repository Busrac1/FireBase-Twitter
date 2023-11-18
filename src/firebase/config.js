// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth, GoogleAuthProvider, GithubAuthProvider} from 'firebase/auth'
import {getFirestore} from "firebase/firestore"
import{getStorage} from "firebase/storage"
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCIWG6iTf-qL9FLLPN2AkqPksW58DjdTcs",
  authDomain: "twitter-8cc95.firebaseapp.com",
  projectId: "twitter-8cc95",
  storageBucket: "twitter-8cc95.appspot.com",
  messagingSenderId: "537844455626",
  appId: "1:537844455626:web:c33445e71047bf4226bc33",

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// yetkilendirme kurulumu
export const auth= getAuth(app);

// google sağlayıcı kurulum
export const googleProvider= new GoogleAuthProvider();

// github kurulum
export const githubProvider= new GithubAuthProvider();

// veri tabanı kurulum
export const db= getFirestore(app)

// medya depolama alanı
export const storage= getStorage(app);