import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

const itemsCollection = collection(db, "items");

export async function createItem(itemData) {
  const payload = {
    ...itemData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
  const created = await addDoc(itemsCollection, payload);
  return created.id;
}

export async function fetchItems() {
  const snapshot = await getDocs(itemsCollection);
  return snapshot.docs.map((itemDoc) => ({
    id: itemDoc.id,
    ...itemDoc.data(),
  }));
}

export async function fetchItemById(id) {
  const itemRef = doc(db, "items", id);
  const snapshot = await getDoc(itemRef);

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
}

export async function updateItem(id, itemData) {
  const itemRef = doc(db, "items", id);
  await updateDoc(itemRef, {
    ...itemData,
    updatedAt: serverTimestamp(),
  });
}

export async function removeItem(id) {
  const itemRef = doc(db, "items", id);
  await deleteDoc(itemRef);
}
