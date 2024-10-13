import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCL1Yv2y7Gzu1vJYt57PpWB3U7hNw6XJFk",
  authDomain: "tarefasplus-9a45e.firebaseapp.com",
  projectId: "tarefasplus-9a45e",
  storageBucket: "tarefasplus-9a45e.appspot.com",
  messagingSenderId: "1049189055222",
  appId: "1:1049189055222:web:621b48e82673279b5ccad7",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

export { db };
