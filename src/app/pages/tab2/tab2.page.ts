import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';
import { Article, contriesCode } from '../../interfaces/interfaces';
import { Storage } from '@ionic/storage';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  @ViewChild(IonSegment) segment: IonSegment;

  categoriasEn =  ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  categorias =  ['negocio', 'entretenimiento', 'general', 'salud', 'ciencia', 'deporte', 'tecnologia'];
  categoriaCambio = '';
  indiceCambio = 0;
  noticias: Article[] = [];
  pais: any;
  paisSelecc: string;

  constructor( private noticiasSrv: NoticiasService,
               private sto: Storage,
               private dataLocalService: DataLocalService) {}

  ngOnInit() { 
      this.cargarNoticias(this.categoriasEn[0]);
  }

  cambioCategoria(event) {
    this.noticias = [];
    this.categoriaCambio = this.categoriasEn[this.categorias.findIndex(element => element === event.detail.value)]
    this.cargarNoticias(this.categoriaCambio );
  }

  cargarNoticias( categoria: string, event?) {

    this.dataLocalService.cargarPais().then((resp: contriesCode) => {

      const pais: any = resp;
      this.obtenerNoticias(categoria,resp.alpha2Code);
      this.paisSelecc = resp.name.substr(0,25);     
            
    
    }).catch((error) => {
        console.log('Error obteniendo pais', error);
    });

  }

  loadData( event ) {
    this.cargarNoticias(this.segment.value, event);
  }

  obtenerNoticias( categoria:string, pais: any, event?) {
    
   this.noticiasSrv.getTopHeadLinesCategorias(categoria, pais)
      .subscribe( resp => {
        this.noticias.push( ...resp.articles );
        if ( event ) {
          event.target.complete();
        }
      });
  }
}
