import { Component } from '@angular/core';
import { LocalStorageService } from './services/local-storage-service.service'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private localStorage: LocalStorageService) {
    this.checkUserSession();
  }

  // Método para comprobar si hay un usuario en el LocalStorage
  async checkUserSession() {
    const user = await this.localStorage.leer('user');
    if (user) {
      console.log('Usuario encontrado en LocalStorage:', user);
      // Aquí puedes realizar alguna acción, como redirigir al usuario a la página principal, etc.
    } else {
      console.log('No hay usuario registrado.');
      // O redirigir al login
    }
  }
}
