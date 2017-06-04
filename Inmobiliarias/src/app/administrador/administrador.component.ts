import { Component, OnInit } from '@angular/core';
import { ServicioUsuariosService } from '../servicio-usuarios.service';
import { Usuario } from '../../clases/usuario.class';
import { ServicioLocalesService } from '../servicio-locales.service';
import { Local } from '../../clases/local.class';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {
  private usuarios;
  private nombreUsuarioAdministrador: string;
  private usuarioUsuarioAdministrador: string;
  private passwordUsuarioAdministrador: string;
  private tipoUsuarioAdministrador: any;
  private idUsuarioAdministrador: any;

  private locales;
  private idLocalAdministrador: any;
  private nombreLocalAdministrador: any;
  private direccionLocalAdministrador: any;
  private localidadLocalAdministrador: any;
  private provinciaLocalAdministrador: any;
  private paisLocalAdministrador: any;

  private mensaje: string;
  private success: boolean = false;
  private error: boolean = false;
  private operacion: string;

  constructor(private usuarioService: ServicioUsuariosService, private localService: ServicioLocalesService) {
    this.TraerUsuarios();
    this.TraerLocales();
  }

  ngOnInit() {
  }

  MostrarLocales() {
    console.log("Hola");
    document.getElementById("LocalesAdministrador").style.display = "inline";
    document.getElementById("UsuariosAdministrador").style.display = "none";
    document.getElementById("EstadisticasAdministrador").style.display = "none";
  }
  MostrarUsuarios() {
    document.getElementById("LocalesAdministrador").style.display = "none";
    document.getElementById("UsuariosAdministrador").style.display = "inline";
    document.getElementById("EstadisticasAdministrador").style.display = "none";
  }
  MostrarEstadisticas() {
    document.getElementById("LocalesAdministrador").style.display = "none";
    document.getElementById("UsuariosAdministrador").style.display = "none";
    document.getElementById("EstadisticasAdministrador").style.display = "inline";
  }
  altaUsuario() {
    this.operacion = "Insertar";
    document.getElementById("altaUsuariosAdministrador").style.display = "inline";
  }
  altaLocal() {
    this.operacion = "Insertar";
    document.getElementById("altaLocalesAdministrador").style.display = "inline";
  }

  //USUARIOS
  TraerUsuarios() {
    this.usuarioService.getUsuarios().subscribe(
      data => this.usuarios = data,
      err => {
        console.error(err);
        this.error = true;
      },
      () => console.log("Usuarios traidos con éxito")
    );
  }

  deleteUsuario(id: number) {
    this.usuarioService.deleteUsuario(id).subscribe(
      data => console.info('Id: ${data.id} borrado con éxito'),
      err => console.error(err),
      () => console.info('éxito')
    );
    this.TraerUsuarios();
  }

  mostrarUsuario(id, nom, usu, pass, tipo) {
    this.operacion = "Modificar";
    this.idUsuarioAdministrador = id;
    this.nombreUsuarioAdministrador = nom;
    this.usuarioUsuarioAdministrador = usu;
    this.passwordUsuarioAdministrador = pass;
    this.tipoUsuarioAdministrador = tipo;
    console.info(this.tipoUsuarioAdministrador);
    document.getElementById("altaUsuariosAdministrador").style.display = "inline";
  }

  CancelarUsuario() {
    document.getElementById("altaUsuariosAdministrador").style.display = "none";
    this.nombreUsuarioAdministrador = "";
    this.usuarioUsuarioAdministrador = "";
    this.passwordUsuarioAdministrador = "";
    this.tipoUsuarioAdministrador = "";
  }

  GuardarUsuario() {
    if (((this.nombreUsuarioAdministrador == "") || (this.nombreUsuarioAdministrador == undefined) || (this.nombreUsuarioAdministrador == null)) ||
      ((this.usuarioUsuarioAdministrador == "") || (this.usuarioUsuarioAdministrador == undefined) || (this.usuarioUsuarioAdministrador == null)) ||
      ((this.passwordUsuarioAdministrador == "") || (this.passwordUsuarioAdministrador == undefined) || (this.passwordUsuarioAdministrador == null)) ||
      ((this.tipoUsuarioAdministrador == "") || (this.tipoUsuarioAdministrador == undefined) || (this.tipoUsuarioAdministrador == null))) {
        alert("Los Datos en pantalla son obligatorios");
    } else {
      if (this.operacion == "Insertar") {
        let objUsuario: Usuario = new Usuario(0, this.nombreUsuarioAdministrador, this.usuarioUsuarioAdministrador, this.passwordUsuarioAdministrador, this.tipoUsuarioAdministrador);
        console.log(this.nombreUsuarioAdministrador);
        console.log(this.usuarioUsuarioAdministrador);
        console.log(this.passwordUsuarioAdministrador);
        console.log(this.tipoUsuarioAdministrador);
        //console.log(objUsuario);
        /*this.usuarioService.GuardarUsuario(objUsuario).subscribe(
          data => {
                    console.log("Usuario insertado");
                    this.mensaje = "Usuario agregado con éxito.";
                    this.CancelarUsuario();
                  },
          err => {  
                    console.error(err);
                    this.mensaje = "No se pudo agregar al usuario, por favor verifique los campos y su conexión a internet.";
                    this.error = true;
                  },
            () => this.TraerUsuarios()
        );*/
        this.usuarioService.GuardarUsuario(objUsuario).subscribe();


        /*this.usuarioService.GuardarUsuario(objUsuario).subscribe(
          data => console.info(`Id: ${data.usuario} Insertado con éxito`),
          err => console.error(err),
          () => this.TraerUsuarios()
        );*/
      } else if (this.operacion == "Modificar") {
        let objUsuario: Usuario = new Usuario(this.idUsuarioAdministrador, this.nombreUsuarioAdministrador, this.usuarioUsuarioAdministrador, this.passwordUsuarioAdministrador, this.tipoUsuarioAdministrador);
        console.log("se va a modificar: " + objUsuario);
        this.usuarioService.putUsuario(objUsuario).subscribe();
      }
      this.TraerUsuarios();
      this.CancelarUsuario();
    }

  }
    //LOCALES
  TraerLocales() {
    this.localService.getLocales().subscribe(
      data => this.locales = data,
      err => {
        console.error(err);
        this.error = true;
      },
      () => console.log("Locales traidos con éxito")
    );
  }

  deleteLocal(id: number) {
    this.localService.deleteLocal(id).subscribe(
      data => console.info('Id: ${data.id} borrado con éxito'),
      err => console.error(err),
      () => console.info('éxito')
    );
    this.TraerLocales();
  }

  mostrarLocal(id, nom, dir, loc, pro, pais) {
    this.operacion = "Modificar";
    this.idLocalAdministrador = id;
    this.nombreLocalAdministrador = nom;
    this.direccionLocalAdministrador = dir;
    this.localidadLocalAdministrador = loc;
    this.provinciaLocalAdministrador = pro;
    this.paisLocalAdministrador = pais;
    
    document.getElementById("altaLocalesAdministrador").style.display = "inline";
  }

  CancelarLocal() {
    document.getElementById("altaLocalesAdministrador").style.display = "none";
    this.idLocalAdministrador = "";
    this.nombreLocalAdministrador = "";
    this.direccionLocalAdministrador = "";
    this.localidadLocalAdministrador = "";
    this.provinciaLocalAdministrador = "";
    this.paisLocalAdministrador = "";
  }

  GuardarLocal() {
    if (((this.nombreLocalAdministrador == "") || (this.nombreLocalAdministrador == undefined) || (this.nombreLocalAdministrador == null)) ||
      ((this.direccionLocalAdministrador == "") || (this.direccionLocalAdministrador == undefined) || (this.direccionLocalAdministrador == null)) ||
      ((this.localidadLocalAdministrador == "") || (this.localidadLocalAdministrador == undefined) || (this.localidadLocalAdministrador == null)) ||
      ((this.provinciaLocalAdministrador == "") || (this.provinciaLocalAdministrador == undefined) || (this.provinciaLocalAdministrador == null)) ||
      ((this.paisLocalAdministrador == "") || (this.paisLocalAdministrador == undefined) || (this.paisLocalAdministrador == null))) {
        alert("Los Datos en pantalla son obligatorios");
    } else {
      if (this.operacion == "Insertar") {
        let objLocal: Local = new Local(0, this.nombreLocalAdministrador, this.direccionLocalAdministrador, this.localidadLocalAdministrador, this.provinciaLocalAdministrador, this.paisLocalAdministrador);

        this.localService.GuardarLocal(objLocal).subscribe();

      } else if (this.operacion == "Modificar") {
        let objLocal: Local = new Local(this.idLocalAdministrador, this.nombreLocalAdministrador, this.direccionLocalAdministrador, this.localidadLocalAdministrador, this.provinciaLocalAdministrador, this.paisLocalAdministrador);
        console.log("se va a modificar: " + objLocal);
        this.localService.putLocal(objLocal).subscribe();
      }
      this.TraerLocales();
      this.CancelarLocal();
    }

  }

}
