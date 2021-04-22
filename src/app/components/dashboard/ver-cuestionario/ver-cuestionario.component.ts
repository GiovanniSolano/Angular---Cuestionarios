import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import { Cuestionario } from '../../../models/Cuestionario.model';

@Component({
  selector: 'app-ver-cuestionario',
  templateUrl: './ver-cuestionario.component.html',
  styleUrls: ['./ver-cuestionario.component.css']
})
export class VerCuestionarioComponent implements OnInit {

  id: string;
  loading = false;
  cuestionario: Cuestionario | undefined;

  constructor(private activatedRoute: ActivatedRoute, private _quizService: QuizService) {

    this.id = this.activatedRoute.snapshot.paramMap.get('id') || '';
    this.getQuiz();
   }

  ngOnInit(): void {
  }

  getQuiz() {
    this.loading = true;
    this._quizService.getCuestionario(this.id) 
      .subscribe(doc => {
        this.loading = false;
        this.cuestionario = doc.data();        
      }, (error) => {
        this.loading = false;
        console.log(error);
        
      });

  }

}
