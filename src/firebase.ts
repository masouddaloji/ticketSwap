import {initializeApp} from "firebase/app"
import {getAuth} from "firebase/auth"

// const firebaseConfig = {
//   apiKey: "AIzaSyAuRAn2NGyZbul-lS3dleSvCN_kXFcKdCc",
//   authDomain: "blitpazar.firebaseapp.com",
//   projectId: "blitpazar",
//   storageBucket: "blitpazar.appspot.com",
//   messagingSenderId: "552644372668",
//   appId: "1:552644372668:web:ee6cb8cf4f2973b7a788b9",
//   measurementId: "G-T2DVD5K15Y"
// };

// const app = initializeApp(firebaseConfig);

const firebaseConfig = {
  apiKey: "AIzaSyCtTBMg5JddWz1v2Vs1bwl_MhHc27oFLmQ",
  authDomain: "pana-otp-test.firebaseapp.com",
  projectId: "pana-otp-test",
  storageBucket: "pana-otp-test.appspot.com",
  messagingSenderId: "97090414662",
  appId: "1:97090414662:web:15a4fdcbc7421db4234247"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
