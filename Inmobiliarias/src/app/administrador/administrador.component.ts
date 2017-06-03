import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  MostrarLocales()
  {
    console.log("Hola");
    document.getElementById("LocalesAdministrador").style.display = "inline";
    document.getElementById("UsuariosAdministrador").style.display = "none";
    document.getElementById("EstadisticasAdministrador").style.display = "none";
  }
  MostrarUsuarios()
  {
    document.getElementById("LocalesAdministrador").style.display = "none";
    document.getElementById("UsuariosAdministrador").style.display = "inline";
    document.getElementById("EstadisticasAdministrador").style.display = "none";
  }
  MostrarEstadisticas()
  {
    document.getElementById("LocalesAdministrador").style.display = "none";
    document.getElementById("UsuariosAdministrador").style.display = "none";
    document.getElementById("EstadisticasAdministrador").style.display = "inline";
  }
}
