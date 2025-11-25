import { authService } from '@/services/auth'
import { db } from '@/services/firebase'
import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    serverTimestamp,
    setDoc,
} from 'firebase/firestore'

export const forceFixAllData = async (): Promise<{
    deleted: number
    fixed: number
    total: number
}> => {
    const user = authService.getCurrentUser()
    if (!user) {
        throw new Error('Пользователь не авторизован')
    }

    try {
        const querySnapshot = await getDocs(collection(db, 'todos'))
        let deletedCount = 0
        let fixedCount = 0

        for (const docSnap of querySnapshot.docs) {
            const data = docSnap.data()
            const docId = docSnap.id

            // Если документ не принадлежит пользователю - удаляем
            if (data.userId && data.userId !== user.uid) {
                try {
                    await deleteDoc(doc(db, 'todos', docId))
                    deletedCount++
                } catch (error) {
                    console.error(`❌ Failed to delete ${docId}:`, error)
                }
            }
            // Если userId отсутствует или неверный - исправляем
            else if (!data.userId || data.userId !== user.uid) {
                try {
                    await setDoc(doc(db, 'todos', docId), {
                        ...data,
                        userId: user.uid,
                        updatedAt: serverTimestamp(),
                    })
                    fixedCount++
                } catch (error) {
                    console.error(`❌ Failed to fix ${docId}:`, error)
                }
            }
        }
        return {
            deleted: deletedCount,
            fixed: fixedCount,
            total: querySnapshot.size,
        }
    } catch (error) {
        console.error('❌ FORCE FIX: Error:', error)
        throw error
    }
}
