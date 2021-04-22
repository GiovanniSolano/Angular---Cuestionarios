import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from '../../../services/error.service';
import { User } from '../../../interfaces/User.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginForm: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder,
     private afAuth: AngularFireAuth,
     private _errorService: ErrorService,
     private toastr: ToastrService,
     private router: Router) {
    
    this.loginForm =  this.fb.group({

      correo: ['', [Validators.required, Validators.email]],
      contrasenia: ['', Validators.required],

    });

   }

  ngOnInit(): void {
  }

  login() {
    this.loading = true;

    const correo = this.loginForm.get('correo')?.value;
    const contrasenia = this.loginForm.get('contrasenia')?.value;
    
    this.afAuth.signInWithEmailAndPassword(correo, contrasenia)
      .then(resp => {

        if(resp.user?.emailVerified === false) {
          this.router.navigate(['/usuario/verificar-correo']);

        } else {
          // Redirección al dashboard
          this.guardarEnStorage(resp.user);
          this.router.navigate(['/dashboard']);

        }
        this.loading = false;
        

      }).catch(error => {

        this.loading = false;
        this.toastr.error(this._errorService.error(error.code), 'Error');
        this.loginForm.reset();


      });


  }


  guardarEnStorage(user: any) {

    const usuario: User = {
      uid: user.uid,
      email: user.email
    };

    localStorage.setItem('user', JSON.stringify(usuario));

  }

  get correoRequerido(): boolean | undefined {
    return this.loginForm.get('correo')?.hasError('required') && this.loginForm.get('correo')?.touched;
  }
  get contraseniaRequerida(): boolean | undefined {
    return this.loginForm.get('contrasenia')?.hasError('required') && this.loginForm.get('contrasenia')?.touched;
  }

  get correoValido(): boolean | undefined {
    return this.loginForm.get('correo')?.hasError('email') && this.loginForm.get('correo')?.touched;
  }

}
