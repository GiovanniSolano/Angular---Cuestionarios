import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngresarNombreComponent } from './ingresar-nombre/ingresar-nombre.component';
import { ContadorComponent } from './contador/contador.component';
import { RealizarQuizComponent } from './realizar-quiz/realizar-quiz.component';
import { RespuestaUsuarioComponent } from '../shared/respuesta-usuario/respuesta-usuario.component';

const routes: Routes = [
  {path: '', component: IngresarNombreComponent},
  {path: 'iniciar-contador', component: ContadorComponent},
  {path: 'realizar-quiz', component: RealizarQuizComponent},
  {path: 'respuesta-usuario/:id', component: RespuestaUsuarioComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JugarRoutingModule { }
