import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-pagina-inicio',
  templateUrl: './pagina-inicio.component.html',
  styleUrls: ['./pagina-inicio.component.css']
})
export class PaginaInicioComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  irBienvenida(){  
    this.router.navigate(['/bienvenida']);
  } 
  irLogin(){      
    this.router.navigate(['/login']);
  }     

}
