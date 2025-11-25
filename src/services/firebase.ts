import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: 'AIzaSyCEWFgB2aTlyBpesf3ZhFHYqV8MIZGzTrE',
    authDomain: 'todo-app-auth-dc476.firebaseapp.com',
    projectId: 'todo-app-auth-dc476',
    storageBucket: 'todo-app-auth-dc476.firebasestorage.app',
    messagingSenderId: '157300377512',
    appId: '1:157300377512:web:8177888b8e45ac25c07f9d',
}

// Инициализация Firebase
const app = initializeApp(firebaseConfig)

// Инициализация сервисов
export const auth = getAuth(app)
export const db = getFirestore(app)
