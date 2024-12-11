import { OnInit } from '@angular/core';
// profile.page.ts
import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  profile = {
    nombre: '',
    email: '',
    conductor: false,
    uid: ''
  };
  loading = true;

  constructor(private alertController: AlertController, private authService: AuthServiceService) {}

  async ngOnInit() {
    const user: any = await this.authService.getUser();
    console.log('User:', user);
    
    if (user) {
      this.profile.nombre = user.name;
      this.profile.email = user.email;
      this.profile.conductor = user.conductor;
      this.profile.uid = user.uid;
      this.loading = false;
    }
  }

  async convertirEnConductor() {
    const alert = await this.alertController.create({
      header: 'Convertirse en Conductor',
      message: '¿Estás seguro de que deseas convertirte en conductor?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Aceptar',
          handler: async() => {
            this.loading = true;
            this.profile.conductor = true;
            await this.authService.updateUser(this.profile);
            console.log('El usuario ahora es conductor');
            this.loading = false;
          },
        },
      ],
    });

    await alert.present();
  }
}
