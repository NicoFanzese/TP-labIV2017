import { Component, OnInit } from '@angular/core';
import { ServicioUsuariosService} from '../servicio-usuarios.service';
import { Usuario } from '../../clases/usuario.class';

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

  private mensaje: string;  
  private success: boolean = false;
  private error: boolean = false;
  private operacion: string;

  constructor(private usuarioService: ServicioUsuariosService) { 
    this.TraerUsuarios();
  }

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
  altaUsuario()
  {  
    this.operacion = "Insertar";
    document.getElementById("altaUsuariosAdministrador").style.display = "inline";
  }


  TraerUsuarios()
  {
    this.usuarioService.getUsuarios().subscribe(
      data => this.usuarios = data,
      err =>
            {
              console.error(err);
              this.error = true;
            },
      () => console.log("Usuarios traidos con éxito")
    );
  }

  deleteUsuario(id: number)
  {
    this.usuarioService.deleteUsuario(id).subscribe(
       data => console.info('Id: ${data.id} borrado con éxito'),
       err => console.error(err),
       () => console.info('éxito')
     );
     this.TraerUsuarios();
  }

  mostrarUsuario(id, nom, usu, pass, tipo){
    this.operacion = "Modificar";
    this.idUsuarioAdministrador=id;
    this.nombreUsuarioAdministrador = nom;
    this.usuarioUsuarioAdministrador=usu;
    this.passwordUsuarioAdministrador=pass;
    this.tipoUsuarioAdministrador=tipo;
    console.info(this.tipoUsuarioAdministrador);
    document.getElementById("altaUsuariosAdministrador").style.display = "inline";
  }

  CancelarUsuario(){     
    document.getElementById("altaUsuariosAdministrador").style.display = "none";
    this.nombreUsuarioAdministrador = "";
    this.usuarioUsuarioAdministrador="";
    this.passwordUsuarioAdministrador="";
    this.tipoUsuarioAdministrador="";
  }

  GuardarUsuario()
  {
    if (this.operacion == "Insertar"){
     let objUsuario: Usuario = new Usuario(0,this.nombreUsuarioAdministrador, this.usuarioUsuarioAdministrador, this.passwordUsuarioAdministrador, this.tipoUsuarioAdministrador);
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
    }else if (this.operacion == "Modificar"){
      let objUsuario: Usuario = new Usuario(this.idUsuarioAdministrador, this.nombreUsuarioAdministrador, this.usuarioUsuarioAdministrador, this.passwordUsuarioAdministrador, this.tipoUsuarioAdministrador);
      console.log("se va a modificar: "+ objUsuario);
      this.usuarioService.putUsuario(objUsuario).subscribe();      
    }
    this.TraerUsuarios();
    this.CancelarUsuario();
  }
  /*CambiarEstado(id: number)
  {
    console.log(id);

    this.usuarioService.cambiarEstadoUsuario(id).subscribe(
       data => console.log("hola"),
       err => console.error(err),
       () => this.TraerUsuarios()
     );

  }*/

}
