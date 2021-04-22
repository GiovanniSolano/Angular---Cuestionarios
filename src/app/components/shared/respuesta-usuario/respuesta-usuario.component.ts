import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RespuestaQuizService } from '../../../services/respuesta-quiz.service';

@Component({
  selector: 'app-respuesta-usuario',
  templateUrl: './respuesta-usuario.component.html',
  styleUrls: ['./respuesta-usuario.component.css']
})
export class RespuestaUsuarioComponent implements OnInit {


  id: string;
  loading = false;
  respuestaCuestionario: any;
  rutaAnterior = '';

  constructor(private activatedRoute: ActivatedRoute,
     private _respuestaQuizService: RespuestaQuizService,
     private router: Router) {

      this.rutaAnterior = this.activatedRoute.snapshot.url[0].path;
      
    this.id = this.activatedRoute.snapshot.paramMap.get('id')!;

   }

  ngOnInit(): void {
    this.obtenerRespuestaUsuario();
  }

  obtenerRespuestaUsuario() {
    this.loading = true;
    this._respuestaQuizService.getRespuestaUsuario(this.id)
      .subscribe(doc => {
        this.loading = false;
        this.respuestaCuestionario = doc.data();
        
        if(!doc.exists) {
          this.router.navigate(['/']);
          return;
        }
      }, (error) => {
        this.loading = false;
        console.log(error);
        
      });

  }

  volver() {

    if(this.rutaAnterior === 'respuesta-usuario-admin') {

      this.router.navigate(['/dashboard/estadisticas', this.respuestaCuestionario.idCuestionario]);
      return;
      
    }

    this.router.navigate(['/']);

  }

}
