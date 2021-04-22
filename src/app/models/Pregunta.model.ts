import { Respuesta } from './Respuesta.model';
export class Pregunta {

    constructor(public titulo: string, 
        public puntos: number,
        public segundos: number,
        public listRespuestas: Respuesta[]
        ) {}

}