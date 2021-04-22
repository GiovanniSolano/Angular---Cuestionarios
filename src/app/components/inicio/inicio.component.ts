import { Component, OnInit, OnDestroy } from '@angular/core';
import { RespuestaQuizService } from '../../services/respuesta-quiz.service';
import { Cuestionario } from '../../models/Cuestionario.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit, OnDestroy {

  error = false;
  pin = ''; 
  errorText = '';
  loading = false;
  $suscriptionCode: Subscription = new Subscription();

  constructor(private _respuestaQuiz: RespuestaQuizService,
              private router: Router) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.$suscriptionCode.unsubscribe();
  }

  ingresar() {

    // Validar si ingreso algo

    if(this.pin === '') {

      this.errorMensaje('Ingresa un PIN');
      return;

    }
    this.loading = true;

    this.$suscriptionCode = this._respuestaQuiz.searchByCode(this.pin)
      .subscribe(data => {
        if(data.empty) {
          this.loading = false;
          this.errorMensaje('PIN no encontrado');

        } else {

          data.forEach((element: any) => {
            const cuestionario: Cuestionario = {
              id: element.id,
              ...element.data()
            };
            this._respuestaQuiz.cuestionario = cuestionario;
            // Crear quiz, quiz component

            this.router.navigate(['/jugar']);

          });

          

        }
      }, (error) => {
        this.loading = false;
        console.log(error);
        
      });


  }


  errorMensaje(texto: string) {

    this.errorText = texto;
    this.error = true;
    this.pin = '';

    setTimeout(() => {
      this.error = false;
    }, 4000);

  }

}
