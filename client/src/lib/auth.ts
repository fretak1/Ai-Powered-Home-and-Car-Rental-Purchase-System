import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA0tLISNR4W2JSeZW0JZnzx9faTJnh1AaQ",
    authDomain: "rental-system-23d79.firebaseapp.com",
    projectId: "rental-system-23d79",
    storageBucket: "rental-system-23d79.firebasestorage.app",
    messagingSenderId: "433468559892",
    appId: "1:433468559892:web:b5be11fdfe9f9087d60d01",
    measurementId: "G-CPW41HHNDZ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
