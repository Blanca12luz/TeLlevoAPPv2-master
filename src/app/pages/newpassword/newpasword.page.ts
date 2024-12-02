import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { updatePassword, confirmPasswordReset } from 'firebase/auth';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-newpasword',
  templateUrl: './newpasword.page.html',
  styleUrls: ['./newpasword.page.scss'],
})
export class NewpaswordPage implements OnInit {
  newPassword: string = '';
  oobCode: string = '';

  constructor(private toastController: ToastController, private auth: Auth) {}

  ngOnInit() {}

  async resetPassword() {
    try {
      if (this.oobCode) {
        // Si se proporcionó un código, usa confirmPasswordReset
        await confirmPasswordReset(this.auth, this.oobCode, this.newPassword);
        this.showToast('¡Contraseña actualizada exitosamente!');
      } else {
        // Si el usuario está autenticado, cambia directamente la contraseña
        const user = this.auth.currentUser;
        if (user) {
          await updatePassword(user, this.newPassword);
          this.showToast('¡Contraseña cambiada con éxito!');
        } else {
          this.showToast('Por favor, inicie sesión para cambiar su contraseña.', true);
        }
      }
    } catch (error) {
      this.showToast(`Error: ${error.message}`, true);
    }
  }

  private async showToast(message: string, error: boolean = false) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color: error ? 'danger' : 'success',
    });
    toast.present();
  }
}
