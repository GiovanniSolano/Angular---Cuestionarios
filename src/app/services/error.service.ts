import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  error(code: string): string {

    switch (code) {
      // email ya registrado
      case 'auth/email-already-in-use':
        
      return 'El correo ya está registrado';

      
      // email inválido
      case 'auth/invalid-email':
        
      return 'El correo ya está registrado';

      // Contraseña débil
      case 'auth/weak-password':
        
      return 'La contraseña es muy débil';

      // Usuario inválido
      case 'auth/user-not-found':
        
      return 'Datos incorrectos';


      // Contraseña inválido
      case 'auth/wrong-password':
        
      return 'Datos incorrectos';

        
      default:
        return 'Error desconocido';
    }

  }

}
