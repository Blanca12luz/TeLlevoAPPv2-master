import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  // Guardar datos en LocalStorage
  guardar(key: string, value: Usuario | any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Leer datos de LocalStorage
  async leer(key: string): Promise<Usuario | null> {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) as Usuario : null; // Se tipa la salida como Usuario o null
  }

  // Eliminar datos de LocalStorage
  async eliminar(key: string): Promise<void> {
    localStorage.removeItem(key);
  }
}
