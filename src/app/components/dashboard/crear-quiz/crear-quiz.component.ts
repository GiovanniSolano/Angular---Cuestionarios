import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';

@Component({
  selector: 'app-crear-quiz',
  templateUrl: './crear-quiz.component.html',
  styleUrls: ['./crear-quiz.component.css']
})
export class CrearQuizComponent implements OnInit {


  cuestionarioForm: FormGroup;
  mostrarError = false;
  constructor(private fb: FormBuilder,
    private router: Router,
    private _quizService: QuizService
    ) { 
      this.cuestionarioForm = this.fb.group({
        titulo: ['', Validators.required],
        descripcion: ['', Validators.required],
      })
    }

  ngOnInit(): void {
  }

  siguiente() {
    
    if(this.cuestionarioForm.invalid) {
      this.mostrarError = true;
      setTimeout(() => {
        this.mostrarError = false;
      }, 3000);
    } else {

      // Si el formulario es valido..
      this._quizService.tituloCuestionario = this.cuestionarioForm.get('titulo')?.value;
      this._quizService.descripcion = this.cuestionarioForm.get('descripcion')?.value;
      this.router.navigate(['/dashboard/crear-preguntas']);
    }
  }

}
