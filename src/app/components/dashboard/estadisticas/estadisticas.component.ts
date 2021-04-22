import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { RespuestaQuizService } from '../../../services/respuesta-quiz.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit, OnDestroy {

  id: string;
  loading = false;
  listRespuestasUsuario: any[] = [];
  respuestaQuiz: Subscription = new Subscription();

  constructor(private aRoute: ActivatedRoute,
     private _respuestaQuiz: RespuestaQuizService,
     private toastr: ToastrService) {

    this.id = this.aRoute.snapshot.paramMap.get('id')!;

   }

  ngOnInit(): void {

    this.getRespuestaByIdCuestionario();
  }

  ngOnDestroy(): void {

    this.respuestaQuiz.unsubscribe();

  }

  getRespuestaByIdCuestionario() {
    this.loading = true;    
    this.respuestaQuiz = this._respuestaQuiz.getRespuestaByIdCuestionario(this.id)
      .subscribe(data => {

        this.loading = false;
        this.listRespuestasUsuario = [];
        
        data.forEach((element: any) => {

          this.listRespuestasUsuario.push({
            id: element.payload.doc.id,
            ...element.payload.doc.data()
          });

        });        
        


      });
  }

  eliminarRespuestaUsuario(id: string) {

    this.loading = true;

    this._respuestaQuiz.deleteRespuestaUsuario(id)
      .then(() => {

        this.loading = false;
        this.toastr.info('La respuesta fue eliminada', 'Respuesta eliminada');

      }).catch(error => {

        console.log(error);
        this.loading = false;
        this.toastr.error('Ocurrió un error', 'Error');
        

      });

  }

}
