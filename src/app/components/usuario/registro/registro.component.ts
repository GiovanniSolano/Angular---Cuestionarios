import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from '../../../services/error.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {


  registroForm: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder,
     private afAuth: AngularFireAuth,
     private router: Router,
     private toastr: ToastrService,
     private _errorService: ErrorService) {

    this.registroForm = this.fb.group({
    
      correo: ['', [Validators.required, Validators.email]],
      contrasenia: ['', [Validators.required, Validators.minLength(6)]],
      contrasenia2: ['', Validators.required]

    }, {validator: this.checkPassword});

   }

  ngOnInit(): void {
  }

  checkPassword(group: FormGroup): any {

    const pass = group.controls.contrasenia?.value;
    const pass2 = group.controls.contrasenia2?.value;

    return pass === pass2 ? null : { notSame: true};
    

  }

  registro() {

    this.loading = true;

    const correo = this.registroForm.get('correo')?.value;
    const contrasenia = this.registroForm.get('contrasenia')?.value;

    this.afAuth.createUserWithEmailAndPassword(correo, contrasenia)
      .then(resp => {

        this.toastr.success('Verifica tu correo en el email que acabas de recibir', 'Verificar correo');
        resp.user?.sendEmailVerification();
        this.router.navigate(['/usuario']);
        this.loading = false;
        // this.toastr.success('información almacenada', 'Usuario registrado!');

        
        
      }).catch(error => { 
        console.log(error);
        this.loading = false;
        this.registroForm.reset();
        this.toastr.error(this._errorService.error(error.code), 'Error')
        
      });


    
  }


  // error(code: string): string {

  //   switch (code) {
  //     // email ya registrado
  //     case 'auth/email-already-in-use':
        
  //     return 'El correo ya está registrado'

      
  //     // email inválido
  //     case 'auth/invalid-email':
        
  //     return 'El correo ya está registrado'

  //     // Contraseña débil
  //     case 'auth/weak-password':
        
  //     return 'La contraseña es muy débil'

        
  //     default:
  //       return 'Error desconocido';
  //   }

  // }


  get correoRequerido(): boolean | undefined {
    return this.registroForm.get('correo')?.hasError('required') && this.registroForm.get('correo')?.touched;
  }
  get contraseniaRequerida(): boolean | undefined {
    return this.registroForm.get('contrasenia')?.hasError('required') && this.registroForm.get('contrasenia')?.touched;
  }
  get contraseniaValida(): boolean | undefined {
    return this.registroForm.get('contrasenia')?.hasError('minlength') && this.registroForm.get('contrasenia')?.touched;
  }

  get correoValido(): boolean | undefined {
    return this.registroForm.get('correo')?.hasError('email') && this.registroForm.get('correo')?.touched;
  }

}
