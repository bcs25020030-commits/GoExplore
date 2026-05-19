import { doc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { handleFirestoreError, OperationType } from './firestore';

export async function logActivity(userId: string, type: 'save_destination' | 'unsave_destination' | 'profile_update', title: string, description?: string) {
  try {
    const activitiesRef = collection(db, 'users', userId, 'activities');
    await addDoc(activitiesRef, {
      type,
      title,
      description,
      timestamp: serverTimestamp()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, `users/${userId}/activities`);
  }
}
