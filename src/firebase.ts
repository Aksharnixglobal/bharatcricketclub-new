import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDB8IItQips8_hByK2Xw41PSMgYUYTlvDg",
  authDomain: "bharatcricketclub-9beef.firebaseapp.com",
  projectId: "bharatcricketclub-9beef",
  storageBucket: "bharatcricketclub-9beef.firebasestorage.app",
  messagingSenderId: "748391379988",
  appId: "1:748391379988:web:1130d3bc420e85658fe301",
  measurementId: "G-6K0GGGYDCL"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;
