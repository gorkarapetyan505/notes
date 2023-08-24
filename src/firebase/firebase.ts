// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getStorage} from 'firebase/storage'
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCYfTifEqiquNzktHOV38_3jrGCiiyRjlk",
  authDomain: "full-project-686b6.firebaseapp.com",
  projectId: "full-project-686b6",
  storageBucket: "full-project-686b6.appspot.com",
  messagingSenderId: "1083857591328",
  appId: "1:1083857591328:web:915b83c987a681e44bf045",
  measurementId: "G-HZLSE8YTSV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)
export const auth=getAuth(app)           
export const storage=getStorage(app)           