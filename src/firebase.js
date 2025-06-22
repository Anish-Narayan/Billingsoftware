import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyDBindbSAKLOhbNS3UOgngMqiEURVQcJyQ",
  authDomain: "billing-software-b9c06.firebaseapp.com",
  projectId: "billing-software-b9c06",
  storageBucket: "billing-software-b9c06.firebasestorage.app",
  messagingSenderId: "164717243704",
  appId: "1:164717243704:web:47b6988901db3259e825cd",
  measurementId: "G-PPNSBL7LJY"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);