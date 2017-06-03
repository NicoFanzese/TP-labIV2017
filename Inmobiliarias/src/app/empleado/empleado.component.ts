import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  MostrarClientes()
  {
    document.getElementById("ClientesEmpleado").style.display = "inline";
    document.getElementById("ProductosEmpleado").style.display = "none";
    document.getElementById("OfertasEmpleado").style.display = "none";
    document.getElementById("ReservasEmpleado").style.display = "none";
  }

  MostrarProductos()
  {
    document.getElementById("ClientesEmpleado").style.display = "none";
    document.getElementById("ProductosEmpleado").style.display = "inline";
    document.getElementById("OfertasEmpleado").style.display = "none";
    document.getElementById("ReservasEmpleado").style.display = "none";
  }
    MostrarOfertas()
  {
    document.getElementById("ClientesEmpleado").style.display = "none";
    document.getElementById("ProductosEmpleado").style.display = "none";
    document.getElementById("OfertasEmpleado").style.display = "inline";
    document.getElementById("ReservasEmpleado").style.display = "none";
  }
    MostrarReservas()
  {
    document.getElementById("ClientesEmpleado").style.display = "none";
    document.getElementById("ProductosEmpleado").style.display = "none";
    document.getElementById("OfertasEmpleado").style.display = "none";
    document.getElementById("ReservasEmpleado").style.display = "inline";
  }

}
