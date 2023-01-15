import { doc, setDoc, collection, query, where, getDocs, getFirestore } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';

export async function saveCompra(data, userEmail) {
  let db = getFirestore()

  await setDoc(doc(db, "users", userEmail, 'compras', uuidv4()), data, { merge: true });
}

export async function saveDeposito(data, userEmail) {
  let db = getFirestore()

  await setDoc(doc(db, "users", userEmail, 'depositos', uuidv4()), data, { merge: true });
}
