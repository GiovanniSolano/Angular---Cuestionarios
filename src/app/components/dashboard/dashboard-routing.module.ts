import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCuestionariosComponent } from './list-cuestionarios/list-cuestionarios.component';
import { CrearQuizComponent } from './crear-quiz/crear-quiz.component';
import { CrearPreguntasComponent } from './crear-preguntas/crear-preguntas.component';
import { VerCuestionarioComponent } from './ver-cuestionario/ver-cuestionario.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { RespuestaUsuarioComponent } from '../shared/respuesta-usuario/respuesta-usuario.component';

const routes: Routes = [
  {path: '', component: ListCuestionariosComponent},
  {path: 'crear-quiz', component: CrearQuizComponent},
  {path: 'crear-preguntas', component: CrearPreguntasComponent},
  {path: 'ver-cuestionario/:id', component: VerCuestionarioComponent},
  {path: 'estadisticas/:id', component: EstadisticasComponent},
  {path: 'respuesta-usuario-admin/:id', component: RespuestaUsuarioComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
