import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article, contriesCode } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  noticias: Article[] = [];
  pais: contriesCode[] = [];
  constructor(private storage: Storage,
    public toastController: ToastController) {
    this.cargarFavoritos();
  }

  guardarNoticia( noticia: Article) {
    const existe = this.noticias.find(noti => noti.title === noticia.title);
    if (!existe) {
      this.noticias.unshift(noticia);
      this.storage.set('favoritos', this.noticias);
      this.presentToast('Agregado a favoritos', 'primary');
    }

  }

  guardarPais(pais: contriesCode) {
    this.storage.set('pais',pais);
    this.presentToast(`Cambiado el país a ${pais.alpha2Code}`, 'primary');
  }

  async cargarFavoritos() {
    const favorito =  await this.storage.get('favoritos');

    if (favorito) {
      this.noticias = favorito;
    } 
  }

  async cargarPais(){
    const paiss: contriesCode =  await this.storage.get('pais');

    return await this.storage.get('pais');

  }

  borrarNoticia(noticia: Article) {
    this.noticias = this.noticias.filter( noti => noti.title !== noticia.title);
    this.storage.set('favoritos', this.noticias);
    this.presentToast('Borrado de favoritos', 'danger');
  }

  async presentToast(mensaje: string, color: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 1500,
      position: 'bottom',
      // tslint:disable-next-line: object-literal-shorthand
      color: color
    });
    toast.present();
  }
}
