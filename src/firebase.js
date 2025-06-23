import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDBindbSAKLOhbNS3UOgngMqiEURVQcJyQ",
  authDomain: "billing-software-b9c06.firebaseapp.com",
  projectId: "billing-software-b9c06",
  storageBucket: "billing-software-b9c06.appspot.com",
  messagingSenderId: "164717243704",
  appId: "1:164717243704:web:47b6988901db3259e825cd",
  measurementId: "G-PPNSBL7LJY"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export { auth, db, provider };
