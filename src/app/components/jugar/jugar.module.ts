import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JugarRoutingModule } from './jugar-routing.module';
import { IngresarNombreComponent } from './ingresar-nombre/ingresar-nombre.component';
import { ContadorComponent } from './contador/contador.component';
import { RealizarQuizComponent } from './realizar-quiz/realizar-quiz.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [IngresarNombreComponent, ContadorComponent, RealizarQuizComponent],
  imports: [
    CommonModule,
    JugarRoutingModule,
    SharedModule
  ]
})
export class JugarModule { }
