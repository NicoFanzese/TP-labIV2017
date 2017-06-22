import { Component, OnInit } from '@angular/core';
import { ServicioUsuariosService } from '../servicio-usuarios.service';
import { Usuario } from '../../clases/usuario.class';
import { ServicioLocalesService } from '../servicio-locales.service';
import { Local } from '../../clases/local.class';
import { EmpleadoLocal } from '../../clases/empleadoLocal.class';
import { ServicioEmpleadosService } from '../servicio-empleados.service';

import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { CarouselModule } from 'ngx-bootstrap';

const URL = 'http://nfranzeseutn.hol.es/miAPIRest/index.php/uploadFoto';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {
  private contImagen;    

  private usuarios;
  private nombreUsuarioAdministrador: string;
  private usuarioUsuarioAdministrador: string;
  private passwordUsuarioAdministrador: string;
  private tipoUsuarioAdministrador: any;
  private idUsuarioAdministrador: any;
  private estadoUsuarioAdministrador: any;

  private locales;
  private idLocalAdministrador: any;
  private nombreLocalAdministrador: any;
  private direccionLocalAdministrador: any;
  private usuariosEncargados: any;
  private encargadoLocalAdministrador: any;
  private foto1LocalAdministrador: any;
  private foto2LocalAdministrador: any;
  private foto3LocalAdministrador: any;
  private empleadosLocales;
  private localEmpleado;
  private idLocalEmpleado;
  private EmpleadoLocalAdministrador;
  private empleados;

  private mensaje: string;
  private success: boolean = false;
  private error: boolean = false;
  private operacion: string;

  public uploaderLocal:FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;
 
  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
 
  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }

  constructor(private usuarioService: ServicioUsuariosService, 
              private localService: ServicioLocalesService,
              private empleadoService: ServicioEmpleadosService) {
    this.TraerUsuarios();
    this.TraerLocales();
    this.TraerUsuariosLocales();
    this.TraerEmpleados();    

    this.uploaderLocal.onBeforeUploadItem=(item)=>
    {
      //Extraigo el nombre de la imagen, luego la extensión.
      ///console.log((this.TomarUltimoId() + "") + '.' + extension);
      //Le asigno un nuevo nombre a la imagen compuesta por el proximo id de la tabla
      //console.log(item['file']);
      console.log(this.contImagen);
          
      if (this.contImagen == 1){       
          console.log("entró 1");     
          this.foto1LocalAdministrador = item['file'].name;
          this.contImagen = this.contImagen + 1;  
          item.withCredentials = false;   
      }else if (this.contImagen == 2){
        console.log("entró 2");
        this.foto2LocalAdministrador = item['file'].name;
        this.contImagen = this.contImagen + 1;  
        item.withCredentials = false;           
      }else if (this.contImagen == 3){
        console.log("entró 3");
        this.foto3LocalAdministrador = item['file'].name;        
        //this.contImagen = 1;
        item.withCredentials = false;   
      }
    
    }
  }

  ngOnInit() {
  }

  MostrarLocales() {
    document.getElementById("LocalesAdministrador").style.display = "inline";
    document.getElementById("altaEmpleadosLocalesAdministrador").style.display = "none";      
    document.getElementById("UsuariosAdministrador").style.display = "none";
    document.getElementById("EstadisticasAdministrador").style.display = "none";
    this.TraerUsuariosLocales();
    this.TraerEmpleados();
  }
  MostrarUsuarios() {
    document.getElementById("LocalesAdministrador").style.display = "none";
    document.getElementById("altaEmpleadosLocalesAdministrador").style.display = "none";          
    document.getElementById("UsuariosAdministrador").style.display = "inline";
    document.getElementById("EstadisticasAdministrador").style.display = "none";
  }
  MostrarEstadisticas() {
    document.getElementById("LocalesAdministrador").style.display = "none";
    document.getElementById("altaEmpleadosLocalesAdministrador").style.display = "none";          
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
    this.foto1LocalAdministrador="";
    this.foto2LocalAdministrador="";
    this.foto3LocalAdministrador="";
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
    this.TraerUsuarios();    
  }

  mostrarUsuario(id, nom, usu, pass, tipo,est) {
    this.operacion = "Modificar";
    this.idUsuarioAdministrador = id;
    this.nombreUsuarioAdministrador = nom;
    this.usuarioUsuarioAdministrador = usu;
    this.passwordUsuarioAdministrador = pass;
    this.tipoUsuarioAdministrador = tipo;
    console.log(est);
    if((est == "true") || (est == 1)){
      this.estadoUsuarioAdministrador = 1;
    }else{
      this.estadoUsuarioAdministrador = 0;
    }
    
    document.getElementById("altaUsuariosAdministrador").style.display = "inline";
  }

  CancelarUsuario() {
    document.getElementById("altaUsuariosAdministrador").style.display = "none";
    this.nombreUsuarioAdministrador = "";
    this.usuarioUsuarioAdministrador = "";
    this.passwordUsuarioAdministrador = "";
    this.tipoUsuarioAdministrador = "";
    this.estadoUsuarioAdministrador = false;
  }

  GuardarUsuario() {
    console.log(this.estadoUsuarioAdministrador);
    if (((this.nombreUsuarioAdministrador == "") || (this.nombreUsuarioAdministrador == undefined) || (this.nombreUsuarioAdministrador == null)) ||
      ((this.usuarioUsuarioAdministrador == "") || (this.usuarioUsuarioAdministrador == undefined) || (this.usuarioUsuarioAdministrador == null)) ||
      ((this.passwordUsuarioAdministrador == "") || (this.passwordUsuarioAdministrador == undefined) || (this.passwordUsuarioAdministrador == null)) ||
      ((this.tipoUsuarioAdministrador == "") || (this.tipoUsuarioAdministrador == undefined) || (this.tipoUsuarioAdministrador == null))) {
        alert("Los Datos en pantalla son obligatorios");
    } else {
      if (this.operacion == "Insertar") {
        if((this.estadoUsuarioAdministrador == "true") || (this.estadoUsuarioAdministrador == 1)){
          this.estadoUsuarioAdministrador = 1;
        }else{
          this.estadoUsuarioAdministrador = 0;
        }
        let objUsuario: Usuario = new Usuario(0, this.nombreUsuarioAdministrador, this.usuarioUsuarioAdministrador, this.passwordUsuarioAdministrador, this.tipoUsuarioAdministrador, this.estadoUsuarioAdministrador);
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
        if((this.estadoUsuarioAdministrador == "true") || (this.estadoUsuarioAdministrador == 1)){
          this.estadoUsuarioAdministrador = 1;
        }else{
          this.estadoUsuarioAdministrador = 0;
        }

        let objUsuario: Usuario = new Usuario(this.idUsuarioAdministrador, this.nombreUsuarioAdministrador, this.usuarioUsuarioAdministrador, this.passwordUsuarioAdministrador, this.tipoUsuarioAdministrador, this.estadoUsuarioAdministrador);
        this.usuarioService.putUsuario(objUsuario).subscribe();
      }
      this.TraerUsuarios();
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

  TraerUsuariosLocales() {
    this.localService.getUsuariosEncargados().subscribe(
      data => this.usuariosEncargados = data,
      err => {
        console.error(err);
        this.error = true;
      },
      () => console.log("usuarios traidos con éxito")
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

  mostrarLocal(id, nom, dir, enc, f1, f2, f3) {
    this.operacion = "Modificar";
    this.idLocalAdministrador = id;
    this.nombreLocalAdministrador = nom;
    this.direccionLocalAdministrador = dir;
    this.encargadoLocalAdministrador = enc;
    this.foto1LocalAdministrador = f1;
    this.foto2LocalAdministrador = f2;
    this.foto3LocalAdministrador = f3;    
    document.getElementById("altaLocalesAdministrador").style.display = "inline";
  }

  CancelarLocal() {
    document.getElementById("altaLocalesAdministrador").style.display = "none";
    this.idLocalAdministrador = "";
    this.nombreLocalAdministrador = "";
    this.direccionLocalAdministrador = "";
    this.encargadoLocalAdministrador = "";
    this.foto1LocalAdministrador = "";
    this.foto2LocalAdministrador = "";
    this.foto3LocalAdministrador = "";    
    this.uploaderLocal.clearQueue();    
  }

    subirImagenesLocal() {
        this.contImagen = 1;
        this.foto1LocalAdministrador = "";
        this.foto2LocalAdministrador ="";
        this.foto3LocalAdministrador ="";
        this.uploaderLocal.uploadAll();      
        //this.uploader.clearQueue();
        //document.getElementById("fileUploadFotos").innerHTML="";
    }

  GuardarLocal() {
    if (((this.nombreLocalAdministrador == "") || (this.nombreLocalAdministrador == undefined) || (this.nombreLocalAdministrador == null)) ||
      ((this.direccionLocalAdministrador == "") || (this.direccionLocalAdministrador == undefined) || (this.direccionLocalAdministrador == null))) {
        alert("Los Datos en pantalla son obligatorios");
    } else {
      if (this.operacion == "Insertar") {
        let objLocal: Local = new Local(0, this.nombreLocalAdministrador, this.direccionLocalAdministrador, this.encargadoLocalAdministrador, this.foto1LocalAdministrador, this.foto2LocalAdministrador, this.foto3LocalAdministrador);
        this.localService.GuardarLocal(objLocal).subscribe();

      } else if (this.operacion == "Modificar") {
        let objLocal: Local = new Local(this.idLocalAdministrador, this.nombreLocalAdministrador, this.direccionLocalAdministrador, this.encargadoLocalAdministrador, this.foto1LocalAdministrador, this.foto2LocalAdministrador, this.foto3LocalAdministrador);
        console.log("se va a modificar: " + objLocal);
        this.localService.putLocal(objLocal).subscribe();
      }
      this.TraerLocales();
      this.TraerLocales();
      this.CancelarLocal();
      this.uploaderLocal.clearQueue();
    }

  }


//DETALLE EMPLEADO
  TraerEmpleados() {
    this.empleadoService.getEmpleados().subscribe(
      data => this.empleados = data,
      err => {
        console.error(err);
        this.error = true;
      },
      () => console.log("Empleados traidos con éxito")
    );
  }

  getDetalleEmpleadosLocales(id: number) {
    this.localService.getDetalleEmpleadosLocales(id).subscribe(
      data => this.empleadosLocales = data,
      err => {
        console.error(err);
        this.error = true;
      },
      () => console.log("empleados de Local traidos con éxito")
    );
    console.log("Empleados:" +this.empleadosLocales);
  }

agregarEmpleadosLocal(id, nom){
    console.log(id);
    document.getElementById("altaEmpleadosLocalesAdministrador").style.display = "inline";
    document.getElementById("altaLocalesAdministrador").style.display = "none";    
    this.localEmpleado = nom;
    this.idLocalEmpleado = id;
    this.getDetalleEmpleadosLocales(id);    
  }

  AddEmpleadoLocal() {

    if ((this.EmpleadoLocalAdministrador == "") || (this.EmpleadoLocalAdministrador == undefined) || (this.EmpleadoLocalAdministrador == null)) {
        alert("Debe elegir un empleado en el Combo de empleados");
    } else {   
        let objEmpleadoLocal: EmpleadoLocal = new EmpleadoLocal(0, this.idLocalEmpleado, this.EmpleadoLocalAdministrador);
        console.log(this.localService);
        this.localService.GuardarEmpleadoLocal(objEmpleadoLocal).subscribe();  
    }    
    this.getDetalleEmpleadosLocales(this.idLocalEmpleado);   
    this.getDetalleEmpleadosLocales(this.idLocalEmpleado);         
  }
  
  deleteEmpleadoLocal(id: number) {
    this.localService.deleteEmpleadoLocal(id).subscribe(
      data => console.info('Id: ${data.id} borrado con éxito'),
      err => console.error(err),
      () => console.info('éxito')
    )
    this.getDetalleEmpleadosLocales(this.idLocalEmpleado);
    this.getDetalleEmpleadosLocales(this.idLocalEmpleado);
  }

  CerrarEmpleadoLocal(){
     document.getElementById("altaEmpleadosLocalesAdministrador").style.display = "none";
  }

}
