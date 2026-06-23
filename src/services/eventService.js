import { doc, getDoc, updateDoc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase/firebase'

const eventRef = doc(db, 'event', 'current')

export const getEvent = async () => {
  const snap = await getDoc(eventRef)
  return snap.exists() ? snap.data() : null
}

export const updateEvent = async (data) => {
  await updateDoc(eventRef, data)
}

export const onEventSnapshot = (callback) => {
  return onSnapshot(eventRef, (snap) => {
    callback(snap.exists() ? { id: snap.id, ...snap.data() } : null)
  })
}
