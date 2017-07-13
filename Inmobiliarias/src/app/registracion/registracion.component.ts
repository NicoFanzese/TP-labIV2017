import { Component, OnInit } from '@angular/core';
import { ServicioUsuariosService } from '../servicio-usuarios.service';
import { Usuario } from '../../clases/usuario.class';
import { ServicioClientesService } from '../servicio-clientes.service';
import { Cliente } from '../../clases/cliente.class';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registracion',
  templateUrl: './registracion.component.html',
  styleUrls: ['./registracion.component.css']
})
export class RegistracionComponent implements OnInit {
  // public idCliente;
  public nombreCliente;
  public mailCliente;
  public telefonoCliente;
  public direccionCliente;
  public usuarioLogueoCliente;
  public passwordCliente;


  constructor(public usuarioService: ServicioUsuariosService,
              private clienteService: ServicioClientesService,
              public router: Router) { }

  ngOnInit() {
  }

  CancelarRegistracion() {
    document.getElementById("altaUsuariosAdministrador").style.display = "none";
    // this.idCliente= "";
    this.nombreCliente = "";
    this.mailCliente = "";
    this.telefonoCliente = "";
    this.direccionCliente = "";
    this.usuarioLogueoCliente = "";
    this.passwordCliente = "";
  }


  GuardarCliente() {
    /*console.log("nombre"+this.nombreCliente);
    console.log("mail"+this.mailCliente);
    console.log("tel"+this.telefonoCliente);
    console.log("dir"+this.direccionCliente);
    console.log("usuario"+this.usuarioLogueoCliente);
    console.log("pass"+this.passwordCliente);*/
    
    if (((this.nombreCliente == "") || (this.nombreCliente == undefined) || (this.nombreCliente == null)) ||
      ((this.mailCliente == "") || (this.mailCliente == undefined) || (this.mailCliente == null)) ||
      ((this.telefonoCliente == "") || (this.telefonoCliente == undefined) || (this.telefonoCliente == null)) ||
      ((this.direccionCliente == "") || (this.direccionCliente == undefined) || (this.direccionCliente == null)) ||
      ((this.usuarioLogueoCliente == "") || (this.usuarioLogueoCliente == undefined) || (this.usuarioLogueoCliente == null)) ||
      ((this.passwordCliente == "") || (this.passwordCliente == undefined) || (this.passwordCliente == null))) {
        alert("Los Datos en pantalla son obligatorios");
    } else {
        let objUsuario: Usuario = new Usuario(0, this.nombreCliente, this.usuarioLogueoCliente, this.passwordCliente, 'cliente', 1);       
        this.usuarioService.GuardarUsuario(objUsuario).subscribe();

        let objCliente: Cliente = new Cliente(0, this.nombreCliente, this.mailCliente, this.telefonoCliente, this.direccionCliente, this.usuarioLogueoCliente);
        this.clienteService.GuardarCliente(objCliente).subscribe();

        alert("Registración efectuada con éxito");
        this.router.navigate(['/login']);
    }

  }

  cancelarRegistracion()
  {
    this.router.navigate(['/login']);
  }

}
