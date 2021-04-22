import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../../services/quiz.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Respuesta } from '../../../models/Respuesta.model';
import { Pregunta } from 'src/app/models/Pregunta.model';

@Component({
  selector: 'app-crear-preguntas',
  templateUrl: './crear-preguntas.component.html',
  styleUrls: ['./crear-preguntas.component.css']
})
export class CrearPreguntasComponent implements OnInit {


  agregarPregunta: FormGroup;
  mostrarError = false;

  constructor(private _quizService: QuizService, private fb: FormBuilder) {

    this.agregarPregunta = this.fb.group({
      titulo: ['', Validators.required],
      segundos: [10, Validators.required],
      puntos: [1000, Validators.required],
      respuesta1: this.fb.group({
        titulo: ['', Validators.required],
        esCorrecta: [false, Validators.required]
      }),
      respuesta2: this.fb.group({
        titulo: ['', Validators.required],
        esCorrecta: [false, Validators.required]
      }),
      respuesta3: this.fb.group({
        titulo: '',
        esCorrecta: false
      }),
      
      respuesta4: this.fb.group({
        titulo: '',
        esCorrecta: false
      }),
      
    })

   }

  ngOnInit(): void {
    
  }


  sumarRestarSegundos(numero: number) {

    let segundosTemp = this.seg;

    segundosTemp += numero;

    if(segundosTemp <= 5) {
      segundosTemp = 5; 
    }

    if(segundosTemp > 30) {
      segundosTemp = 30;
    }

    this.agregarPregunta.patchValue({
      segundos: segundosTemp
    });

  }

  esCorrecta(index: string) {    

    let stringRta = `respuesta${index}`;

    const estadoRta = this.obtenerEstadoRespuesta(stringRta);
    this.setFalseRespuestas(stringRta);

    this.agregarPregunta.get(stringRta)?.patchValue({
      esCorrecta: !estadoRta
    });

  }

  obtenerEstadoRespuesta(numrespuesta: string): boolean {
    return this.agregarPregunta.get(numrespuesta)?.get('esCorrecta')?.value;
  }

  setFalseRespuestas(numRespuesta: string) {

    const arr = ['respuesta1', 'respuesta2', 'respuesta3', 'respuesta4'];

    // Recorrer el array y seteamos todas las respuestas con false menos la seleccionada

    arr.forEach(resp => {      

      if(resp !== numRespuesta) {
        this.agregarPregunta.get(resp)?.patchValue({
          esCorrecta: false
        });
      }

      
    });


  }


  agregarPreg() {    
    
    if(this.agregarPregunta.invalid || this.todasIncorrectas()) {
      
      this.error();
      return;
    }

    // Verificar si la respuesta verdadera tiene titulo
   if(this.verificarCorrectaConTitulo()) {
     this.error();
     return;
   }


    let listRespuestas: Respuesta[] = [];

    // Obtener respuesta 1

    const rtaTitulo1 = this.agregarPregunta.get('respuesta1')?.get('titulo')?.value;
    const rtaEsCorrecta1 = this.agregarPregunta.get('respuesta1')?.get('esCorrecta')?.value;

    const respuesta1: Respuesta = {
      descripcion: rtaTitulo1,
      esCorrecta: rtaEsCorrecta1
    }

    listRespuestas.push(respuesta1);

    
    // Obtener respuesta 2

    const rtaTitulo2 = this.agregarPregunta.get('respuesta2')?.get('titulo')?.value;
    const rtaEsCorrecta2 = this.agregarPregunta.get('respuesta2')?.get('esCorrecta')?.value;

    const respuesta2: Respuesta = {
      descripcion: rtaTitulo2,
      esCorrecta: rtaEsCorrecta2
    }

    listRespuestas.push(respuesta2);

     // Obtener respuesta 3

     const rtaTitulo3 = this.agregarPregunta.get('respuesta3')?.get('titulo')?.value;
     const rtaEsCorrecta3 = this.agregarPregunta.get('respuesta3')?.get('esCorrecta')?.value;
 
     const respuesta3: Respuesta = {
       descripcion: rtaTitulo3,
       esCorrecta: rtaEsCorrecta3
     }

     if(rtaTitulo3 !== '') {

       listRespuestas.push(respuesta3);
     }

      // Obtener respuesta 4

      const rtaTitulo4 = this.agregarPregunta.get('respuesta4')?.get('titulo')?.value;
      const rtaEsCorrecta4 = this.agregarPregunta.get('respuesta4')?.get('esCorrecta')?.value;
  
      const respuesta4: Respuesta = {
        descripcion: rtaTitulo4,
        esCorrecta: rtaEsCorrecta4
      }
 
      if(rtaTitulo4 !== '') {
 
        listRespuestas.push(respuesta4);
      }


      // Crear pregunta

      const tituloPregunta = this.agregarPregunta.get('titulo')?.value;
      const segundosPregunta = this.agregarPregunta.get('segundos')?.value;
      const puntosPregunta = this.agregarPregunta.get('puntos')?.value;

      const pregunta: Pregunta = {
        titulo: tituloPregunta,
        segundos: segundosPregunta,
        puntos: puntosPregunta,
        listRespuestas: listRespuestas
      }

      this._quizService.agregarPregunta(pregunta);

      this.reset();
      
    
  }

  reset() {

    this.agregarPregunta.patchValue({
      titulo: '',
      segundos: 10,
      puntos: 1000,
      respuesta1: {
        titulo: '',
        esCorrecta: false
      },
      respuesta2: {
        titulo: '',
        esCorrecta: false
      },
      respuesta3: {
        titulo: '',
        esCorrecta: false
      },
      respuesta4: {
        titulo: '',
        esCorrecta: false
      },
    });

  }

  todasIncorrectas(): boolean {
    const arr = ['respuesta1', 'respuesta2', 'respuesta3', 'respuesta4'];
    for (let index = 0; index < arr.length; index++) {  
      if(this.agregarPregunta.get(arr[index])?.get('esCorrecta')?.value === true) {
        return false;
      }
     
    }
    return true;

  }

  verificarCorrectaConTitulo(): boolean {

    const arr = ['respuesta1', 'respuesta2', 'respuesta3', 'respuesta4'];
    for (let index = 0; index < arr.length; index++) {  
      if(this.agregarPregunta.get(arr[index])?.get('esCorrecta')?.value === true) {
        if(this.agregarPregunta.get(arr[index])?.get('titulo')?.value === ''){
          return true;
        }
      }
     
    }
    return false;
  }

  error() {
    this.mostrarError = true;

      setTimeout(() => {
        this.mostrarError = false;
      }, 3000);
  }

  get seg() {return this.agregarPregunta.get('segundos')?.value}
  get puntos() {return this.agregarPregunta.get('puntos')?.value}


}
