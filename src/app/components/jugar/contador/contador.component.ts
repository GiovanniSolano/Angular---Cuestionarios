import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contador',
  templateUrl: './contador.component.html',
  styleUrls: ['./contador.component.css']
})
export class ContadorComponent implements OnInit, OnDestroy {


  contador = 3;
  setInterval: any;

  constructor(private router: Router) { }

  ngOnInit(): void {

    this.playContadorInicial();

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

    clearInterval(this.setInterval);
    
  }

  playContadorInicial() {

    this.setInterval = setInterval(() => {

      if(this.contador === 0) {
        this.router.navigate(['/jugar/realizar-quiz']);

      }

      this.contador = this.contador -1;



    }, 1000);

  }

}
