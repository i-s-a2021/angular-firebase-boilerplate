import { Injectable } from '@angular/core';
import { ref, Storage, uploadBytes } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class FireStorageService {

  constructor(private storage: Storage) { }

  // Uplpoad File

  async uploadFile(file: File, path: string): Promise<string> {
    const storageRef = ref(this.storage, path);
    const result = await uploadBytes(storageRef, file);
    return result.metadata.fullPath;
  }
}
