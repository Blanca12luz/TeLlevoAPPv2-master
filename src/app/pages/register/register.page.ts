import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Storage } from '@ionic/storage-angular';  // Importamos Storage correctamente
import { Users, Usuario } from 'src/app/interfaces/user';  // Importamos los tipos de usuario

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  registerForm: FormGroup;  // Formulario de registro
  // No es necesario crear una propiedad `usuario` si ya manejas los valores del formulario directamente
  db: any;

  constructor(
    private fb: FormBuilder,
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private navCtrl: NavController,
    private storage: Storage // Inyectamos el servicio de Storage
  ) {
    // Inicializa el formulario con validaciones
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    // Inicializa el almacenamiento
    this.storage.create();
  }

  // Método para registrar un usuario
  async onRegister() {
    if (this.registerForm.valid) {
      const { name, email, password } = this.registerForm.value;  // Extraemos los datos del formulario

      try {
        // Registrar en Firebase Authentication
        const userCredential = await this.auth.createUserWithEmailAndPassword(email, password);

        const userUid = userCredential.user?.uid;
        if (!userUid) {
          throw new Error('No se pudo obtener el UID del usuario.');
        }

        // Guardar información adicional en Firestore
        const userData= {
          uid: userUid,
          name,
          email,
          conductor: false, // Valores por defecto
          vehiculo: '',
          patente: '',
        };

        await this.firestore.collection('users').doc(userUid).set(userData);

        // Guardar los datos del usuario en LocalStorage usando el servicio de Storage
        await this.storage.set('user', userData);  // Guardamos el usuario en LocalStorage

        alert('¡Registro exitoso!');

        // Navegar a la página de inicio de sesión
        this.navCtrl.navigateBack('/login');  // O usa navigateForward si prefieres redirigir de inmediato
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
