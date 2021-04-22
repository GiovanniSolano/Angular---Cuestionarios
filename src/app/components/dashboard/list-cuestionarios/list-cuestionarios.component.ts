import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { QuizService } from '../../../services/quiz.service';
import { Cuestionario } from '../../../models/Cuestionario.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-cuestionarios',
  templateUrl: './list-cuestionarios.component.html',
  styleUrls: ['./list-cuestionarios.component.css']
})
export class ListCuestionariosComponent implements OnInit, OnDestroy {


  suscriptionUser: Subscription = new Subscription();
  suscriptionQuiz: Subscription = new Subscription();
  listCuestionarios: Cuestionario[] = [];
  loading = false;

  constructor(private afAuth: AngularFireAuth,
      private router: Router,
      private _quizService: QuizService,
      private toastr: ToastrService) { }

  ngOnInit(): void {

    this.loading = true;

    this.suscriptionUser = this.afAuth.user.subscribe(user => {            
      if(user && user.emailVerified) {
        // cargar los cuestionarios
        this.getcuestionarios(user.uid);

      } else {
        this.router.navigate(['/']);
      }
      
    });

  }
  ngOnDestroy() {
    this.suscriptionUser.unsubscribe();
    this.suscriptionQuiz.unsubscribe();
  }

  getcuestionarios(id: string) {

    this.suscriptionQuiz = this._quizService.getCuestionarioByIdUser(id)
      .subscribe(data => {
        this.loading = false;
        this.listCuestionarios = [];
       
        data.forEach((element: any) => {

           this.listCuestionarios.push({
             id: element.payload.doc.id,
             ...element.payload.doc.data()
           });
          
        });
        
        
      }, (error) => {
        console.log(error);
        this.toastr.error('Ocurrió un error!', 'Error');

        this.loading = false;
        
      });


  }

  eliminarCuestionario(id: string) {

    this.loading = true;

    this._quizService.eliminarCuestionario(id)
      .then(() => {

        this.toastr.error('El cuestionario fue eliminado!', 'Eliminado');
        this.loading = false;
      }).catch(error => {
        console.log(error);
        this.loading = false;

        this.toastr.error('Ocurrió un error!', 'Error');

      });

  }

}
