import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private firestore: AngularFirestore, // Servicio Firestore
    private navCtrl: NavController
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onRegister() {
    if (this.registerForm.valid) {
      const { name, email, password } = this.registerForm.value;

      try {
        // Guardar datos del usuario en Firestore
        const user = { name, email, password };
        await this.firestore.collection('users').doc(email).set(user);

        alert('¡Registro exitoso!');
        this.navCtrl.navigateBack('/login'); // Redirigir a la página de login
      } catch (error) {
        console.error('Error al guardar en Firebase:', error);
        alert('Hubo un error al registrar. Por favor, intenta nuevamente.');
      }
    } else {
      alert('Por favor, completa todos los campos correctamente.');
    }
  }
}
