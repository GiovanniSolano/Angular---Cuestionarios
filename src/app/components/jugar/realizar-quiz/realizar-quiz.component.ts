import { Component, OnInit, OnDestroy } from '@angular/core';
import { RespuestaQuizService } from '../../../services/respuesta-quiz.service';
import { Cuestionario } from '../../../models/Cuestionario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-realizar-quiz',
  templateUrl: './realizar-quiz.component.html',
  styleUrls: ['./realizar-quiz.component.css']
})
export class RealizarQuizComponent implements OnInit, OnDestroy {

  //36ENFE

  cuestionario!: Cuestionario;
  nombreParticipante = '';
  indexPregunta = 0;
  segundos = 0;
  setInterval: any;
  loading = false;

  opcionSeleccionada: any;
  indexSeleccionado: any;
  cantidadCorrectas = 0;
  cantidadIncorrectas = 0;
  puntosTotales = 0;
  listRespuestaUsuario: any[] = [];

  constructor(private _respuestaQuizService: RespuestaQuizService,
      private router: Router) { }

  ngOnInit(): void {

    this.cuestionario = this._respuestaQuizService.cuestionario;
    this.nombreParticipante = this._respuestaQuizService.nombreParticipante;
    this.validateRefresh();
     this.iniciarContador();

  }

  ngOnDestroy(): void {

    clearInterval(this.setInterval);

  }


  validateRefresh() {
    
    if(this.cuestionario === undefined) {

      this.router.navigate(['/']);

    }


  }

  obtenerSegundos(): number{

    return this.segundos;
  }

  obtenerTitulo(): string {

    return this.cuestionario.listPreguntas[this.indexPregunta].titulo;

  }

  iniciarContador() {

    this.segundos = this.cuestionario.listPreguntas[this.indexPregunta].segundos;

    this.setInterval = setInterval(() =>{

      if(this.segundos === 0) {
        this.agregarRespuesta();


      }

      this.segundos = this.segundos - 1;


    }, 1000);
    
  }

  respuestaSeleccionada(respuesta: any, index: number) {

    this.opcionSeleccionada = respuesta;
    this.indexSeleccionado = index;
  }

  addClassOption(respuesta: any): string {  

    if(respuesta === this.opcionSeleccionada) {
      return 'classSeleccionada';
    } else {
      return '';
    }

  }

  siguiente() {

    clearInterval(this.setInterval);
    this.agregarRespuesta();
    this.iniciarContador();

  }

  agregarRespuesta() {

    // incrementar contador correcta e incorrecta

    this.contadorCorrectaIncorrecta();

    // Crear objeto respuesta y agregar al array

    const respuestaUsuario: any = {

        titulo: this.cuestionario.listPreguntas[this.indexPregunta].titulo,
        puntosObtenidos: this.obtenerPuntosPregunta(),
        segundos: this.obtenerSegundosPregunta(),
        indexRespuestaSeleccionada: this.obtenerIndexSeleccionado(),
        listRespuestas: this.cuestionario.listPreguntas[this.indexPregunta].listRespuestas

    }

    this.listRespuestaUsuario.push(respuestaUsuario);
    this.opcionSeleccionada = undefined;
    this.indexSeleccionado = undefined;



    // Validar última pregunta
    if(this.cuestionario.listPreguntas.length - 1 === this.indexPregunta) {

      // Guardar respuestas

      this.guardarRespuestaCuestionario();

    } else {
      this.indexPregunta++;
      this.segundos = this.cuestionario.listPreguntas[this.indexPregunta].segundos;
    }




  }


  obtenerPuntosPregunta(): number {

    // Si el usuario no selecciona una respuesta
    if(this.opcionSeleccionada === undefined) {

      return 0;

    }

    const puntosPregunta = this.cuestionario.listPreguntas[this.indexPregunta].puntos;

    // Validar si la pregunta es correcta

    if(this.opcionSeleccionada.esCorrecta == true) {

      // Incrementar puntos totales
      this.puntosTotales = this.puntosTotales + puntosPregunta;
      return puntosPregunta;

    } else {
      return 0;
    }

  }

  obtenerSegundosPregunta(): string | number {

    // Validar si el usuario respondio la pregunta

    if(this.opcionSeleccionada === undefined) {

      return 'NO RESPONDIDA';

    } else {

      const segundosPregunta = this.cuestionario.listPreguntas[this.indexPregunta].segundos;
      const segundosRespondidos = segundosPregunta - this.segundos;

      return segundosRespondidos;
      // return segundosRespondidos.toString();

    }

  }

  obtenerIndexSeleccionado(): any {

    if(this.opcionSeleccionada === undefined) {

      return '';

    } else {
      return this.indexSeleccionado;
    }

  }

  contadorCorrectaIncorrecta() {

    // Validar si el usuario selecciono una pregunta

    if(this.opcionSeleccionada === undefined) {
      this.cantidadIncorrectas++;
      return;
    }

      // La opción es incorrecta

      if(this.opcionSeleccionada.esCorrecta === false) {

        this.cantidadIncorrectas++;

      } else {

        this.cantidadCorrectas++;

      }

    

  }

  guardarRespuestaCuestionario() {

    const respuestaCuestionario: any = {

      idCuestionario: this.cuestionario.id,
      nombreParticipante: this.nombreParticipante,
      fecha: new Date(),
      cantidadPreguntas: this.cuestionario.cantPreguntas,
      cantidadCorrectas: this.cantidadCorrectas,
      cantidadIncorrectas: this.cantidadIncorrectas,
      puntosTotales: this.puntosTotales,
      listRespuestaUsuario: this.listRespuestaUsuario

    }

    this.loading = true;


    // Almacenar respuesta en firebase

    this._respuestaQuizService.setRespuestaUsuario(respuestaCuestionario)
      .then(data => {
        
        this.loading = false;
        // Redireccionar proximo componente      
        this.router.navigate(['/jugar/respuesta-usuario', data.id]);
  

      }, (error) => {
        this.loading = false;

        console.log('error', error);
        this.router.navigate(['/']);

        
      });
    


  }


}
