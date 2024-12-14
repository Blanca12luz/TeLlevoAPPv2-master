import { Injectable, CUSTOM_ELEMENTS_SCHEMA, EventEmitter } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { firstValueFrom } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private USER_KEY = 'auth-user'; // Clave para el almacenamiento local
  _onDataChange: EventEmitter <any> = new EventEmitter()


  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private storage: Storage
  ) {
    this.storage.create(); // Inicializa Ionic Storage
  }

  async getUser() {
    // Intenta recuperar el usuario de Firebase
    const _user = await firstValueFrom(this.auth.authState);

    if (!_user) {
      // Si no hay usuario autenticado, verifica si hay un usuario almacenado localmente
      const localUser = await this.storage.get(this.USER_KEY);
      return localUser ? JSON.parse(localUser) : null;
    }

    // Recupera los datos adicionales del usuario en Firestore
    const __user = await firstValueFrom(this.firestore.collection('users').doc(_user.uid).get());
    const ___user: any = __user.data();
    const user = {
      uid: _user.uid,
      email: ___user.email,
      name: ___user.name,
      conductor: ___user.conductor || false,
      vehiculo: ___user.vehiculo,
      patente: ___user.patente,
    };

    // Guarda el usuario en el almacenamiento local de Ionic
    await this.storage.set(this.USER_KEY, JSON.stringify(user));

    return user; // Devuelve el usuario autenticado
  }

  async updateUser(user: any) {
    console.log('User:', user);
    const data = await this.firestore.collection('users').doc(user.uid).set(user, { merge: true });
    this._onDataChange.emit(data)
    return  data;
  }

  async logout() {
    // Limpia el almacenamiento local y cierra sesión en Firebase
    await this.storage.remove(this.USER_KEY);
    return this.auth.signOut();
  }

  async isLoggedIn(): Promise<boolean> {
    // Verifica si hay un usuario almacenado localmente en Ionic Storage
    const user = await this.storage.get(this.USER_KEY);
    return !!user;
  }


}
