import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
} from 'firebase/firestore'
import { db } from '../firebase/firebase'

const colRef = collection(db, 'participants')

export const getParticipantsRealtime = (callback) => {
  const q = query(colRef, orderBy('createdAt', 'asc'))
  return onSnapshot(q, (snap) => {
    const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
    callback(list)
  })
}

export const createParticipant = async (data) => {
  await addDoc(colRef, {
    ...data,
    paid: false,
    createdAt: serverTimestamp(),
  })
}

export const updateParticipant = async (id, data) => {
  await updateDoc(doc(db, 'participants', id), data)
}

export const deleteParticipant = async (id) => {
  await deleteDoc(doc(db, 'participants', id))
}
