import { LocalStorageService } from './../../services/local-storage-service.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
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
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private navCtrl: NavController,
    private localStorage: LocalStorageService // Inyectamos el servicio de almacenamiento local
  ) {
    // Inicializa el formulario con validaciones
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Método para registrar un usuario
  async onRegister() {
    if (this.registerForm.valid) {
      const { name, email, password } = this.registerForm.value;

      try {
        // Registrar en Firebase Authentication
        const userCredential = await this.auth.createUserWithEmailAndPassword(email, password);

        const userUid = userCredential.user?.uid;
        if (!userUid) {
          throw new Error('No se pudo obtener el UID del usuario.');
        }

        // Guardar información adicional en Firestore
        const userData = {
          uid: userUid,
          name,
          email,
          conductor: false, // Valores por defecto
          vehiculo: '',
          patente: '',
        };

        await this.firestore.collection('users').doc(userUid).set(userData);

        // Guardar los datos del usuario en LocalStorage usando el servicio
        this.localStorage.guardar('user', userData);  // Guardamos el usuario en LocalStorage

        alert('¡Registro exitoso!');

        // Navegar a la página de inicio de sesión
        this.navCtrl.navigateBack('/login');
      } catch (error: any) {
        // Manejo de errores de Firebase Authentication
        switch (error.code) {
          case 'auth/email-already-in-use':
            alert('El correo electrónico ya está en uso.');
            break;
          case 'auth/weak-password':
            alert('La contraseña es demasiado débil.');
            break;
          default:
            alert('Hubo un error al registrar. Por favor, intenta nuevamente.');
            console.error('Error al registrar:', error);
        }
      }
    } else {
      alert('Por favor, completa todos los campos correctamente.');
    }
  }
}
