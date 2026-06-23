import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyC75Q-_6ckn8CSpSbGwVjEJNbI9MbJCvU4',
  authDomain: 'finca-evento.firebaseapp.com',
  projectId: 'finca-evento',
  storageBucket: 'finca-evento.firebasestorage.app',
  messagingSenderId: '614719633616',
  appId: '1:614719633616:web:b0023d1520e3b50e6006d5',
}

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app)
