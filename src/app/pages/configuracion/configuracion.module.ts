import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ConfiguracionPageRoutingModule } from './configuracion-routing.module';
import { ConfiguracionPage } from './configuracion.page';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfiguracionPageRoutingModule,
    PipesModule
  ],
  declarations: [ConfiguracionPage]
})
export class ConfiguracionPageModule {}
