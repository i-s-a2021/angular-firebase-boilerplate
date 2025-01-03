import { Injectable } from '@angular/core';
import { addDoc, collection, deleteDoc, doc, Firestore, getDoc, getDocFromServer, setDoc, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private fireStore : Firestore) { }

  private async createDocument(docPath: string, data: any) {
    const docReference = doc(this.fireStore, docPath);
    await setDoc(docReference, data);
  }

  private async addDocument(collectionPath: string, data: any) {
    const collectionRef = collection(this.fireStore, collectionPath);
    const doc = await addDoc(collectionRef, data);
    return doc.id;
  }

  private async getDocument<T>(docPath: string): Promise<T | null> {
    const docReference = doc(this.fireStore, docPath);
    const docSnapshot = await getDocFromServer(docReference);
    if (docSnapshot.exists()) {
      return docSnapshot.data() as T;
    } else {
      return null;
    }
  }


  private async updateDocument(collectionPath: string, data:any): Promise<void> {
    const docRef = doc(this.fireStore, collectionPath);
    await setDoc(docRef, data, { merge: true });
    await updateDoc(docRef, data);
  }

  private async deleteDocument(docPath: string): Promise<void> {
    const docReference = doc(this.fireStore, docPath);
    await deleteDoc(docReference);
  }
}
