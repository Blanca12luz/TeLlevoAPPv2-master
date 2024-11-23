import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private storage: Storage,
    private navCtrl: NavController
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.initStorage();
  }

  async initStorage() {
    await this.storage.create();
  }

  async onRegister() {
    if (this.registerForm.valid) {
      const { name, email, password } = this.registerForm.value;

      // Guardar datos del usuario en Ionic Storage
      const user = { name, email, password };
      await this.storage.set(email, user);

      alert('¡Registro exitoso!');
      this.navCtrl.navigateBack('/login'); // Redirigir a la página de login
    } else {
      alert('Por favor, completa todos los campos correctamente.');
    }
  }
}
