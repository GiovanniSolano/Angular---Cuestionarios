import { Pregunta } from './Pregunta.model';
export class Cuestionario {

    constructor( 
        public uid: string,
        public titulo: string,
        public desripcion: string,
        public codigo: string,
        public cantPreguntas: number,
        public fechaCreacion: Date,
        public listPreguntas: Pregunta[],
        public id?: string,) {}

}