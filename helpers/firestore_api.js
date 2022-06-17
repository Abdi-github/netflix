import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";

const productCollectionRef = collection(db, "products");

export const getAllProducts = () => {
  return getDocs(productCollectionRef);
};
