import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../../services/quiz.service';
import { Pregunta } from '../../../models/Pregunta.model';
import { Cuestionario } from '../../../models/Cuestionario.model';
import { Router } from '@angular/router';
import { nanoid } from 'nanoid';
import { User } from '../../../interfaces/User.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-preguntas',
  templateUrl: './list-preguntas.component.html',
  styleUrls: ['./list-preguntas.component.css']
})
export class ListPreguntasComponent implements OnInit {


  listPreguntas: Pregunta[] = [];
  tituloCuestionario: string;
  descripcion: string;
  loading = false;

  constructor(private _quizService: QuizService,
    private router: Router,
    private toastr: ToastrService) {


    this._quizService.getPreguntas().subscribe(data => {
      this.listPreguntas.push(data);
      
    });

    this.tituloCuestionario = this._quizService.tituloCuestionario;
    this.descripcion = this._quizService.descripcion;

   }

  ngOnInit(): void {

    if(this.tituloCuestionario === '' || this.descripcion === '' ) {
        this.router.navigate(['/dashboard']);
    }

  }

  eliminarPregunta(index: number) {    
    this.listPreguntas.splice(index, 1);
  }

  finalizarCuestionario() {

    const codigo = this.generarCodigo();
    const usuario: User = JSON.parse(localStorage.getItem('user') || '{}');

    

    const cuestionario: Cuestionario = {
      uid: usuario.uid,
      titulo: this.tituloCuestionario,
      desripcion: this.descripcion,
      codigo: codigo,
      cantPreguntas: this.listPreguntas.length,
      fechaCreacion: new Date(),
      listPreguntas: this.listPreguntas
    };

    this.loading = true;

    this._quizService.crearCuestionario(cuestionario)
      .then(data => {

        this.loading = false;
        this.toastr.success('El cuestionario fue registrado con exito!', 'Cuestionario registrado');
        this.router.navigate(['/dashboard']);


      }).catch(error => {

        this.loading = false;
        console.log(error);
        

      });

    

  }

  generarCodigo(): string {
    return nanoid(6).toUpperCase();
  }

}
