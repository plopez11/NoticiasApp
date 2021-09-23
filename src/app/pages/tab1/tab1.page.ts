import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { Article, contriesCode } from '../../interfaces/interfaces';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  pais: contriesCode[] = [];
  paisSelecc: string;
  noticias: Article[] = [];

  slideOpts = {
    allowSlidePrev: false,
    allowSlideNext: false
  };

  constructor( private noticiasSrv: NoticiasService,
                private navController: NavController,
                private sto: Storage,
                private dataLocalService: DataLocalService) {
  }

  ngOnInit() {
    // this.cargarNoticias();
  }

  
  ionViewDidEnter() {
    this.noticias = [];
    this.noticiasSrv.headLinesPage=0;
    // this.pais = this.sto.get('pais');

    
      this.dataLocalService.cargarPais().then((resp: contriesCode) => {

        const pais: any = resp;
        this.cargarNoticias(resp.alpha2Code);
        this.paisSelecc = resp.name.substr(0,25);   
      
      }).catch((error) => {
          console.log('Error obteniendo pais', error);
      });
        
  }

  loadData( pais:any ) {
    this.cargarNoticias(pais);
  }

  cargarNoticias( pais: any, event? ) {
    this.noticiasSrv.getTopHeadLines(pais).subscribe( resp => {

    if (resp.articles.length === 0) {
          event.target.disabled = true;
          event.target.complete();
          return;
    }
    // this.noticias = resp.articles;
    this.noticias.push( ...resp.articles);

    if ( event ) {
        event.target.complete();
      }
  });
}

cargarPais() {
  this.dataLocalService.cargarPais().finally;
}

setting() {
    this.navController.navigateRoot('/configuracion');
}

}
