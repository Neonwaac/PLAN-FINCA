import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { db, storage } from '../firebase/firebase'

const colRef = collection(db, 'products')

export const getProductsRealtime = (callback) => {
  const q = query(colRef, orderBy('createdAt', 'asc'))
  return onSnapshot(q, (snap) => {
    const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
    callback(list)
  })
}

export const createProduct = async (data) => {
  await addDoc(colRef, {
    ...data,
    units: Number(data.units) || 1,
    unitPrice: Number(data.unitPrice) || 0,
    totalPrice: Number(data.totalPrice) || 0,
    createdAt: Date.now(),
  })
}

export const updateProduct = async (id, data) => {
  await updateDoc(doc(db, 'products', id), data)
}

export const deleteProduct = async (id) => {
  await deleteDoc(doc(db, 'products', id))
}

export const uploadProductImage = (file, onProgress, onComplete, onError) => {
  const storageRef = ref(storage, `products/${Date.now()}_${file.name}`)
  const task = uploadBytesResumable(storageRef, file)

  task.on(
    'state_changed',
    (snap) => {
      const pct = (snap.bytesTransferred / snap.totalBytes) * 100
      if (onProgress) onProgress(pct)
    },
    (err) => {
      if (onError) onError(err)
    },
    async () => {
      const url = await getDownloadURL(task.snapshot.ref)
      if (onComplete) onComplete(url)
    }
  )

  return task
}
