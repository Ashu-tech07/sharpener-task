// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRx3N0KPnRdkNfNsP9EqaQbmpCDHnccS8",
  authDomain: "mail-box-client-559ae.firebaseapp.com",
  databaseURL: "https://mail-box-client-559ae-default-rtdb.firebaseio.com/",
  projectId: "mail-box-client-559ae",
  storageBucket: "mail-box-client-559ae.firebasestorage.app",
  messagingSenderId: "192518042655",
  appId: "1:192518042655:web:d794920d02a0fb4175112a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//  const database = getDatabase(app);