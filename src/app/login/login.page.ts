import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NavController } from '@ionic/angular';

interface User {
  name: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private firestore: AngularFirestore, // Servicio Firestore
    private navCtrl: NavController
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      try {
        // Buscar el usuario en Firestore
        const userDoc = await this.firestore.collection('users').doc(email).get().toPromise();

        if (userDoc && userDoc.exists) {
          // Usar un cast explícito para tratar los datos como de tipo 'User'
          const userData = userDoc.data() as User;

          // Verificar si la contraseña coincide
          if (userData.password === password) {
            alert('Inicio de sesión exitoso');
            this.navCtrl.navigateForward('/home'); // Redirigir a la página principal
          } else {
            alert('Contraseña incorrecta');
          }
        } else {
          alert('No se encontró un usuario con ese correo');
        }
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        alert('Hubo un error al iniciar sesión. Intenta nuevamente.');
      }
    } else {
      alert('Por favor completa todos los campos correctamente');
    }
  }
}
