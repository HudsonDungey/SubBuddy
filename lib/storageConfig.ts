import { firebase } from './firebaseConfig'; 
import { getFirestore } from "firebase/firestore";

export const db = getFirestore(firebase);