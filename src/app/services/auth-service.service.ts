import { Injectable, EventEmitter } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { firstValueFrom } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  _onDataChange: EventEmitter<any> = new EventEmitter();

  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  // Obtener el usuario actual autenticado y sus datos adicionales en Firestore
  async getUser() {
    // Recupera el estado del usuario autenticado desde Firebase Authentication
    const _user = await firstValueFrom(this.auth.authState);

    if (!_user) {
      // Si no hay un usuario autenticado, retorna null
      return null;
    }

    // Recupera datos adicionales del usuario desde Firestore
    const __user = await firstValueFrom(this.firestore.collection('users').doc(_user.uid).get());
    const ___user: any = __user.data();

    // Retorna el objeto usuario con los datos de autenticación y Firestore
    return {
      uid: _user.uid,
      email: ___user.email,
      name: ___user.name,
      conductor: ___user.conductor || false,
      vehiculo: ___user.vehiculo,
      patente: ___user.patente,
    };
  }

  // Actualizar información del usuario en Firestore
  async updateUser(user: any) {
    console.log('User:', user);
    const data = await this.firestore.collection('users').doc(user.uid).set(user, { merge: true });
    this._onDataChange.emit(data);
    return data;
  }

  // Cerrar sesión del usuario
  async logout() {
    return this.auth.signOut();
  }

  // Verificar si el usuario está autenticado
  async isLoggedIn(): Promise<boolean> {
    const user = await firstValueFrom(this.auth.authState);
    return !!user; // Retorna true si el usuario está autenticado
  }
}
