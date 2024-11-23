import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage-angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private storage: Storage,
    private navCtrl: NavController
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.initStorage();
  }

  async initStorage() {
    await this.storage.create();
  }

  async onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      // Intentar recuperar el usuario desde Ionic Storage
      const storedUser = await this.storage.get(email);

      if (storedUser && storedUser.password === password) {
        // Si el usuario existe y la contraseña coincide
        alert('Inicio de sesión exitoso');
        this.navCtrl.navigateForward('/home'); // Redirigir a la página principal
      } else {
        alert('Correo o contraseña incorrectos');
      }
    } else {
      alert('Por favor completa todos los campos correctamente');
    }
  }
}
