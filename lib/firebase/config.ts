import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBjn1VybEnyLr6uJCyFGwfbSva3k1tOErM",
  authDomain: "dtlive-22a03.firebaseapp.com",
  databaseURL: "https://dtlive-22a03-default-rtdb.firebaseio.com",
  projectId: "dtlive-22a03",
  storageBucket: "dtlive-22a03.appspot.com",
  messagingSenderId: "388888225316",
  appId: "1:388888225316:web:f7cdfdb106cb7910689ab1",
  measurementId: "G-4J3FCF7F32"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize services
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app

