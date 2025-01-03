import { Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, User, UserCredential } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FireAuthService {
  private user: User | null = null;
  constructor(private auth:Auth) { }


  private listenToAuthStateChanges():void {
    authState(this.auth).subscribe(user => {
      if (user) {
        console.log('User is logged in');
      } else {
        console.log('User is logged out');
      }
    });
  }


  public async signUpWithEmailAndPassword(email:string, password:string):Promise<UserCredential> {

    const cred =  await createUserWithEmailAndPassword(this.auth,email, password);
    if(cred?.user) {
      this.user = cred?.user;
    }

    return cred;
  }


  public async signInWithEmailAndPassword(email:string, password:string):Promise<UserCredential> {
     return signInWithEmailAndPassword(this.auth,email, password);
  }

  public async signOut():Promise<void> {
    await this.auth.signOut();
  }

  public async sendPasswordResetEmail(email:string):Promise<void> {
    return sendPasswordResetEmail(this.auth, email);
  }

}
