import { Component, OnInit } from '@angular/core';
import { RespuestaQuizService } from '../../../services/respuesta-quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingresar-nombre',
  templateUrl: './ingresar-nombre.component.html',
  styleUrls: ['./ingresar-nombre.component.css']
})
export class IngresarNombreComponent implements OnInit {

  nombre: string = '';
  errorText = '';
  error = false;

  constructor(private _respuestaService: RespuestaQuizService,
    private router: Router) { }

  ngOnInit(): void {
    this.validarRefresh();
  }

  ingresarNombre() {

    if(this.nombre === '') {
      this.errorMensaje('Ingresa tu nombre');
      return;
    }

    this._respuestaService.nombreParticipante = this.nombre;
    this.router.navigate(['/jugar/iniciar-contador']);
  }

  validarRefresh() {
    if(this._respuestaService.cuestionario === undefined) {
      this.router.navigate(['/']);
    }
  }


  errorMensaje(texto: string) {

    this.errorText = texto;
    this.error = true;

    setTimeout(() => {
      this.error = false;
    }, 4000);

  }

}
