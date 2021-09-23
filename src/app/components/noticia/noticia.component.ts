import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController, Platform } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia: Article;
  @Input() indice: number;
  @Input() enFavoritos;
  constructor(private iab: InAppBrowser,
              public actionSheetController: ActionSheetController,
              private socialSharing: SocialSharing,
              private dataLocalSrv: DataLocalService,
              private platform: Platform) { }

  ngOnInit() {
  }

  abrirNoticia() {
    const browser = this.iab.create(this.noticia.url, '_system');
  }

  async LanzarMenu() {
    let guardarBorrarBtn;
    if ( this.enFavoritos) {
      guardarBorrarBtn = {
        text: 'Borrar Favorito',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          this.dataLocalSrv.borrarNoticia(this.noticia);
        }
      };
    } else {
        guardarBorrarBtn = {
        text: 'Favorito',
        icon: 'star',
        cssClass: 'action-dark',
        handler: () => {
          this.dataLocalSrv.guardarNoticia(this.noticia);
        }
      };
    }

    const actionSheet = await this.actionSheetController.create({
      buttons: [
       {
        text: 'Compartir',
        icon: 'share',
        cssClass: 'action-dark',
        handler: () => {
          this.compartirNoticia();
        }
      }, guardarBorrarBtn,
      {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  compartirNoticia() {

    if ( this.platform.is('cordova')) {
      this.socialSharing.share(
        this.noticia.title,
        this.noticia.source.name,
        '',
        this.noticia.url
      );
    } else  {
      if (navigator['share']) {
          navigator['share']({
            title: this.noticia.title,
            text: this.noticia.description,
            url: this.noticia.url
          })
          .then(() => console.log('Share was successful.'))
          .catch((error) => console.log('Sharing failed', error));
      } else {
        console.log('No se pudo compartir porque no  se soporta');
      }
    }
  }
}
