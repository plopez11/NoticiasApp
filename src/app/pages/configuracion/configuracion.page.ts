import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { contriesCode } from '../../interfaces/interfaces';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
})
export class ConfiguracionPage implements OnInit {
  // paises: contriesCode [] = [];
  paises: contriesCode [] = [];
  paisSelecc: contriesCode [] = [];
  textoBuscar = '';
  paisActual: string;
  

  constructor(private noticiasService: NoticiasService,
              public dataLocalSrv: DataLocalService) { }

  ngOnInit() {
    this.cargarPaises();
    this.paisSelecc = this.dataLocalSrv.pais;   
    this.obtenerPais();
   
  }

  cargarPaises() {
    this.noticiasService.getPaises()
    .subscribe( (resp: any) => {
      this.paises.push(...resp);
    });
  }

  paisSelect(pais: contriesCode) {
    this.dataLocalSrv.guardarPais(pais); 
    this.obtenerPais();
  }

  onSearchChange(event) {
    this.textoBuscar = event.detail.value;
  }	

  obtenerPais() {
    this.dataLocalSrv.cargarPais().then((resp: contriesCode) => {
      this.paisActual = resp.name.substr(0,25);     
    }).catch((error) => {
      console.log('Error obteniendo pais', error);
    });
  }
}
