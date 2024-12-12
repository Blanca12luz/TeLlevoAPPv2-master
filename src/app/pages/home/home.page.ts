import { Itemlistcliente, ItemListConductor } from '../../interfaces/itemlist';
import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  user: any;
  loading: boolean = true;

  vinculos: Itemlistcliente[] = [{
    ruta: '/solicitar-viaje',
    titulo: 'Solicitar viaje',
    icono: 'add'
  },
  {
    ruta: '/rutas',
    titulo: 'Rutas',
    icono: 'calendar'
  },
  ];

  vinculoConductor: ItemListConductor[] = [{
    rutaconductor: '/crear-viajes',
    tituloconductor: 'Crear viaje',
    iconoconductor: 'car'
  },
  {
    rutaconductor: '/viajes',
    tituloconductor: 'Viajes',
    iconoconductor: 'globe'
  },
  {
    rutaconductor: '/historial',
    tituloconductor: 'Historial Conductor',
    iconoconductor: 'person'
  },
  ];

  constructor(private router: Router, private auth: AuthServiceService) { }

  async ngOnInit() {
    this.loading = true;
    this.user = await this.auth.getUser();
    this.loading = false;
  }

  async logout() {
    await this.auth.logout();
    this.router.navigate(['login']);
  }
}
