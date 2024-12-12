import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { firstValueFrom } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private auth: AngularFireAuth, private firestore: AngularFirestore) { }
  async getUser() {
    const _user = await firstValueFrom (this.auth.authState);
    const __user = await firstValueFrom (this.firestore.collection('users').doc(_user?.uid).get());
    const ___user: any = __user.data();
    const  user = { uid: _user?.uid, email: ___user.email, name: ___user.name, conductor: ___user.conductor || false };
    return user; // Devuelve el usuario autenticado
  }

  async updateUser(user: any) {
    console.log('User:', user);
    // return await this.firestore.collection('users').doc(user.uid).update(user);
    return await this.firestore.collection('users').doc(user.uid).set(user, { merge: true });
  }

  logout() {
    return this.auth.signOut();
  }
}
