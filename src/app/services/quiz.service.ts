import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { Pregunta } from '../models/Pregunta.model';
import { Cuestionario } from '../models/Cuestionario.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  tituloCuestionario: string = '';
  descripcion: string = '';
  private pregunta$ = new Subject<Pregunta>();


  constructor(private _firestore: AngularFirestore) { }


  agregarPregunta(pregunta: Pregunta) {
    this.pregunta$.next(pregunta);
  }

  getPreguntas(): Observable<Pregunta>{
    return this.pregunta$.asObservable();
  }

  crearCuestionario(cuestionario: Cuestionario): Promise<any> {

    return this._firestore.collection('cuestionarios')
      .add(cuestionario);


  }

  getCuestionarioByIdUser(id: string): Observable<any> {

    return this._firestore.collection('cuestionarios', ref => ref.where('uid', '==', id))
      .snapshotChanges();

  }

  eliminarCuestionario(idCuestionario: string): Promise<any> {
    return this._firestore.collection('cuestionarios').doc(idCuestionario).delete();
  }

  getCuestionario(id: string): Observable<any> {
    
    return this._firestore.collection('cuestionarios').doc(id).get();
  }

}
