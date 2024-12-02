import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { sendPasswordResetEmail } from 'firebase/auth';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage {
  email: string = '';

  constructor(private auth: Auth, private toastController: ToastController) {}

  async sendResetEmail() {
    try {
      await sendPasswordResetEmail(this.auth, this.email);
      this.showToast('¡Correo de restablecimiento enviado!');
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
