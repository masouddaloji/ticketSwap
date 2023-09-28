import {initializeApp} from "firebase/app"
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAuRAn2NGyZbul-lS3dleSvCN_kXFcKdCc",
  authDomain: "blitpazar.firebaseapp.com",
  projectId: "blitpazar",
  storageBucket: "blitpazar.appspot.com",
  messagingSenderId: "552644372668",
  appId: "1:552644372668:web:0d6ce8f051d63e2aa788b9",
  measurementId: "G-2741SVBDB9"
};

const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)