import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  MostrarOfertas()
  {
    document.getElementById("OfertasCliente").style.display = "inline";
    document.getElementById("OperacionesAnterioresCliente").style.display = "none";
    document.getElementById("ReservarCliente").style.display = "none";
  }

  MostrarOperacionesAnteriores()
  {
    document.getElementById("OfertasCliente").style.display = "none";
    document.getElementById("OperacionesAnterioresCliente").style.display = "inline";
    document.getElementById("ReservarCliente").style.display = "none";
  }
    MostrarReservar()
  {
    document.getElementById("OfertasCliente").style.display = "none";
    document.getElementById("OperacionesAnterioresCliente").style.display = "none";
    document.getElementById("ReservarCliente").style.display = "inline";
  }

}
