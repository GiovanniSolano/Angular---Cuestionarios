import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { ListCuestionariosComponent } from './list-cuestionarios/list-cuestionarios.component';
import { DashboardComponent } from './dashboard.component';
import { CrearQuizComponent } from './crear-quiz/crear-quiz.component';
import { SharedModule } from '../shared/shared.module';
import { CrearPreguntasComponent } from './crear-preguntas/crear-preguntas.component';
import { ListPreguntasComponent } from './list-preguntas/list-preguntas.component';
import { VerCuestionarioComponent } from './ver-cuestionario/ver-cuestionario.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';


@NgModule({
  declarations: [NavbarComponent, ListCuestionariosComponent, DashboardComponent, CrearQuizComponent, CrearPreguntasComponent, ListPreguntasComponent, VerCuestionarioComponent, EstadisticasComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ], exports: [
    NavbarComponent, ListCuestionariosComponent, DashboardComponent
  ]
})
export class DashboardModule { }
