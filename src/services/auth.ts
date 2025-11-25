import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    onAuthStateChanged,
    type User,
} from 'firebase/auth'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from './firebase'
import { AuthResponse, RegisterData } from '@/types'

class AuthService {
    async register(userData: RegisterData): Promise<AuthResponse> {
        try {
            const { email, password, username } = userData

            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            )
            const user = userCredential.user

            await updateProfile(user, {
                displayName: username,
            })

            await setDoc(doc(db, 'users', user.uid), {
                username,
                email,
                createdAt: serverTimestamp(),
                todosCount: 0,
            })

            return { success: true, user }
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error',
            }
        }
    }

    async login(email: string, password: string): Promise<AuthResponse> {
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            )
            return { success: true, user: userCredential.user }
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error',
            }
        }
    }

    async logout(): Promise<{ success: boolean; error?: string }> {
        try {
            await signOut(auth)
            return { success: true }
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error',
            }
        }
    }

    onAuthChange(callback: (user: User | null) => void) {
        return onAuthStateChanged(auth, callback)
    }

    getCurrentUser(): User | null {
        return auth.currentUser
    }
}

export const authService = new AuthService()
