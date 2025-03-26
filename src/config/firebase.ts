import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBeiVDDzEcNEBPdb6QpoXdLFNoxe8yHrZY",
    authDomain: "property-prime-f99fa.firebaseapp.com",
    projectId: "property-prime-f99fa",
    storageBucket: "property-prime-f99fa.firebasestorage.app",
    messagingSenderId: "469062937379",
    appId: "1:469062937379:web:34aa4ebe64b5e98e027a96",
    measurementId: "G-0HPWYE3VRC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;