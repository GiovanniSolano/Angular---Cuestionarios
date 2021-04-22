import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.css']
})
export class RecuperarPasswordComponent implements OnInit {


  recuperarForm: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private router: Router,
    private toastr: ToastrService,
    private _errorService: ErrorService) {

    this.recuperarForm = this.fb.group({

      correo: ['', [Validators.required, Validators.email]]

    });

   }

  ngOnInit(): void {
  }

  recuperarPassword() {

    this.loading = true;

    const correo = this.recuperarForm.get('correo')?.value;

    this.afAuth.sendPasswordResetEmail(correo)
      .then(() => {

        this.loading = false;
        this.toastr.info('Se envió un correo para restablecer su password', 'Restablecer password');
        this.router.navigate(['/usuario']);

      }).catch(error => {


        this.loading = false;
        this.toastr.error(this._errorService.error(error.code), 'Error');
        this.recuperarForm.reset();

      });

  }

  get correoRequerido(): boolean | undefined {
    return this.recuperarForm.get('correo')?.hasError('required') && this.recuperarForm.get('correo')?.touched;
  }

  get correoValido(): boolean | undefined {
    return this.recuperarForm.get('correo')?.hasError('email') && this.recuperarForm.get('correo')?.touched;
  }

}
