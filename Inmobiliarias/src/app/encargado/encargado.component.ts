import { Component, OnInit } from '@angular/core';
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { CarouselModule } from 'ngx-bootstrap';

import { ServicioClientesService } from '../servicio-clientes.service';
import { Cliente } from '../../clases/cliente.class';
import { ServicioProductosService } from '../servicio-productos.service';
import { Producto } from '../../clases/producto.class';
import { ServicioLocalesService } from '../servicio-locales.service';
import { Local } from '../../clases/local.class';
import { ServicioUsuariosService } from '../servicio-usuarios.service';
import { Usuario } from '../../clases/usuario.class';
import { ServicioEmpleadosService } from '../servicio-empleados.service';
import { Empleado } from '../../clases/empleado.class';

const URL = 'http://nfranzeseutn.hol.es/miAPIRest/index.php/uploadFoto';

@Component({
  selector: 'app-encargado',
  templateUrl: './encargado.component.html',
  styleUrls: ['./encargado.component.css']
})
export class EncargadoComponent implements OnInit {
  private contImagen;    

  private clientes;
  private usuariosClientes;
  private idClienteEncargado: string;
  private nombreClienteEncargado: string;
  private mailClienteEncargado: string;
  private telefonoClienteEncargado: string;
  private direccionClienteEncargado: string;
  private usuarioLoginClienteEncargado: string;

  private productos;
  private idProductoEncargado: string;
  private nombreProductoEncargado: string;
  private descripcionProductoEncargado: string;
  private foto1ProductoEncargado: string;
  private foto2ProductoEncargado: string;
  private foto3ProductoEncargado: string;
  private monedaProductoEncargado: string;
  private precioProductoEncargado: string;

  private locales;
  private idLocalEncargado: any;
  private nombreLocalEncargado: any;
  private direccionLocalEncargado: any;
  private encargadoLocalEncargado: any;
  private foto1LocalEncargado: any;
  private foto2LocalEncargado: any;
  private foto3LocalEncargado: any;


  private usuarios;
  private nombreUsuarioEncargado: string;
  private usuarioUsuarioEncargado: string;
  private passwordUsuarioEncargado: string;
  private tipoUsuarioEncargado: any;
  private idUsuarioEncargado: any;
  private estadoUsuarioEncargado: any;

  private empleados;
  private usuariosEmpleados;
  private idEmpleadoEncargado: any;
  private nombreEmpleadoEncargado: any;
  private direccionEmpleadoEncargado: any;
  private usuarioLoginEmpleadoEncargado: any;

  private mensaje: string;
  private success: boolean = false;
  private error: boolean = false;
  private operacion: string;

  public uploader:FileUploader = new FileUploader({url: URL});
  public uploaderLocal:FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;
 
  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
 
  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }

  constructor(private clienteService: ServicioClientesService, private productoService: ServicioProductosService, private localService: ServicioLocalesService,private usuarioService: ServicioUsuariosService,private empleadoService: ServicioEmpleadosService) { 
    this.TraerClientes();
    this.TraerProductos();
    this.TraerLocales();
    this.TraerUsuarios();
    this.TraerEmpleados();
    this.TraerUsuariosClientes();
    this.TraerUsuariosEmpleados();
    this.contImagen = 1;
    //************************************************
   //***************FILE UPLOAD**********************
   //************************************************

    //Esto se ejecutará cuando voy a la api.
    this.uploader.onBeforeUploadItem=(item)=>
    {
      //Extraigo el nombre de la imagen, luego la extensión.
      ///console.log((this.TomarUltimoId() + "") + '.' + extension);
      //Le asigno un nuevo nombre a la imagen compuesta por el proximo id de la tabla
      //console.log(item['file']);
      console.log(this.contImagen);
      //console.log(item);
            
      if (this.contImagen == 1){       
          /*var nombreFoto =  item['file'].name;
          let extension = nombreFoto.split('.').pop();
          this.foto1ProductoEncargado = this.proxIdF1 + '.' + extension;
          item['file'].name = this.foto1ProductoEncargado; */
          console.log("entró 1");     
          this.foto1ProductoEncargado = item['file'].name;
          this.contImagen = this.contImagen + 1;  
          item.withCredentials = false;   
      }else if (this.contImagen == 2){
        /*var nombreFoto =  item['file'].name;
        let extension = nombreFoto.split('.').pop();
        this.foto2ProductoEncargado = this.proxIdF2 + '.' + extension;
        item['file'].name = this.foto2ProductoEncargado;*/
        console.log("entró 2");
        this.foto2ProductoEncargado = item['file'].name;
        this.contImagen = this.contImagen + 1;  
        item.withCredentials = false;           
      }else if (this.contImagen == 3){
        /*var nombreFoto =  item['file'].name;
        let extension = nombreFoto.split('.').pop();
        this.foto3ProductoEncargado = this.proxIdF3 + '.' + extension;
        item['file'].name = this.foto3ProductoEncargado;*/
        console.log("entró 3");
        this.foto3ProductoEncargado = item['file'].name;        
        //this.contImagen = 1;
        item.withCredentials = false;   
      }
    
    }

    this.uploaderLocal.onBeforeUploadItem=(item)=>
    {
      //Extraigo el nombre de la imagen, luego la extensión.
      ///console.log((this.TomarUltimoId() + "") + '.' + extension);
      //Le asigno un nuevo nombre a la imagen compuesta por el proximo id de la tabla
      //console.log(item['file']);
      console.log(this.contImagen);
          
      if (this.contImagen == 1){       
          console.log("entró 1");     
          this.foto1LocalEncargado = item['file'].name;
          this.contImagen = this.contImagen + 1;  
          item.withCredentials = false;   
      }else if (this.contImagen == 2){
        console.log("entró 2");
        this.foto2LocalEncargado = item['file'].name;
        this.contImagen = this.contImagen + 1;  
        item.withCredentials = false;           
      }else if (this.contImagen == 3){
        console.log("entró 3");
        this.foto3LocalEncargado = item['file'].name;        
        //this.contImagen = 1;
        item.withCredentials = false;   
      }
    
    }

  }

  ngOnInit() {
  }

  MostrarClientes()
  {
    document.getElementById("ClientesEncargado").style.display = "inline";
    document.getElementById("ProductosEncargado").style.display = "none";
    //document.getElementById("ReservasEncargado").style.display = "none";
    document.getElementById("LocalesEncargado").style.display = "none";
    document.getElementById("UsuariosEncargado").style.display = "none";
    document.getElementById("EmpleadosEncargado").style.display = "none";
  }

  MostrarProductos()
  {
    document.getElementById("ClientesEncargado").style.display = "none";
    document.getElementById("ProductosEncargado").style.display = "inline";
    //document.getElementById("ReservasEncargado").style.display = "none";
    document.getElementById("LocalesEncargado").style.display = "none";
    document.getElementById("UsuariosEncargado").style.display = "none";
    document.getElementById("EmpleadosEncargado").style.display = "none";
  }
    MostrarOfertas()
  {
    document.getElementById("ClientesEncargado").style.display = "none";
    document.getElementById("ProductosEncargado").style.display = "none";
    //document.getElementById("ReservasEncargado").style.display = "none";
    document.getElementById("LocalesEncargado").style.display = "none";
    document.getElementById("UsuariosEncargado").style.display = "none";
    document.getElementById("EmpleadosEncargado").style.display = "none";
  }
    MostrarReservas()
  {
    document.getElementById("ClientesEncargado").style.display = "none";
    document.getElementById("ProductosEncargado").style.display = "none";
    //document.getElementById("ReservasEncargado").style.display = "inline";
    document.getElementById("LocalesEncargado").style.display = "none";
    document.getElementById("UsuariosEncargado").style.display = "none";
    document.getElementById("EmpleadosEncargado").style.display = "none";
  }

  MostrarLocales() {
    document.getElementById("ClientesEncargado").style.display = "none";
    document.getElementById("ProductosEncargado").style.display = "none";
    //document.getElementById("ReservasEncargado").style.display = "none";
    document.getElementById("LocalesEncargado").style.display = "inline";
    document.getElementById("UsuariosEncargado").style.display = "none";
    document.getElementById("EmpleadosEncargado").style.display = "none";
  }

  MostrarUsuarios() {
    document.getElementById("ClientesEncargado").style.display = "none";
    document.getElementById("ProductosEncargado").style.display = "none";
    //document.getElementById("ReservasEncargado").style.display = "none";
    document.getElementById("LocalesEncargado").style.display = "none";
    document.getElementById("UsuariosEncargado").style.display = "inline";
    document.getElementById("EmpleadosEncargado").style.display = "none";
  }  

  MostrarEmpleados() {
    document.getElementById("ClientesEncargado").style.display = "none";
    document.getElementById("ProductosEncargado").style.display = "none";
    //document.getElementById("ReservasEncargado").style.display = "none";
    document.getElementById("LocalesEncargado").style.display = "none";
    document.getElementById("UsuariosEncargado").style.display = "none";
    document.getElementById("EmpleadosEncargado").style.display = "inline";
  }  

  //CLIENTES
  TraerClientes() {
    this.clienteService.getClientes().subscribe(
      data => this.clientes = data,
      err => {
        console.error(err);
        this.error = true;
      },
      () => console.log("Clientes traidos con éxito")
    );
  }

  TraerUsuariosClientes() {
    this.clienteService.getUsuariosClientes().subscribe(
      data => this.usuariosClientes = data,
      err => {
        console.error(err);
        this.error = true;
      },
      () => console.log("usuarios traidos con éxito")
    );
  }  

  altaCliente() {
    this.operacion = "Insertar";
    document.getElementById("altaClientesEncargado").style.display = "inline";
  }

  deleteCliente(id: number) {
    this.clienteService.deleteCliente(id).subscribe(
      data => console.info('Id: ${data.id} borrado con éxito'),
      err => console.error(err),
      () => console.info('éxito')
    );
    this.TraerClientes();
  }

  mostrarCliente(id, nom, mail, tel, dir, usuLog) {
    this.operacion = "Modificar";
    this.idClienteEncargado = id;
    this.nombreClienteEncargado = nom;
    this.mailClienteEncargado = mail;
    this.telefonoClienteEncargado = tel;
    this.direccionClienteEncargado = dir;
    this.usuarioLoginClienteEncargado = usuLog;
    document.getElementById("altaClientesEncargado").style.display = "inline";
  }

  CancelarCliente() {
    document.getElementById("altaClientesEncargado").style.display = "none";
    this.idClienteEncargado = "";
    this.nombreClienteEncargado = "";
    this.mailClienteEncargado = "";
    this.telefonoClienteEncargado = "";
    this.direccionClienteEncargado = "";
    this.usuarioLoginClienteEncargado = "";
  }

  GuardarCliente() {
    if (((this.nombreClienteEncargado == "") || (this.nombreClienteEncargado == undefined) || (this.nombreClienteEncargado == null)) ||
        ((this.mailClienteEncargado == "") || (this.mailClienteEncargado == undefined) || (this.mailClienteEncargado == null))) {
        alert("El nombre del cliente y Mail son obligatorios");
    } else {
      if (this.operacion == "Insertar") {
        let objCliente: Cliente = new Cliente(0, this.nombreClienteEncargado, this.mailClienteEncargado, this.telefonoClienteEncargado, this.direccionClienteEncargado, this.usuarioLoginClienteEncargado);

        this.clienteService.GuardarCliente(objCliente).subscribe();

      } else if (this.operacion == "Modificar") {
        let objCliente: Cliente = new Cliente(this.idClienteEncargado, this.nombreClienteEncargado, this.mailClienteEncargado, this.telefonoClienteEncargado, this.direccionClienteEncargado, this.usuarioLoginClienteEncargado);
        this.clienteService.putCliente(objCliente).subscribe();
      }
      this.TraerClientes();
      this.CancelarCliente();
    }

  }

//PRODUCTOS
  TraerProductos() {
    this.productoService.getProductos().subscribe(
      data => this.productos = data,
      err => {
        console.error(err);
        this.error = true;
      },
      () => console.log("Productos traidos con éxito")
    );
  }

  altaProducto() {
    this.operacion = "Insertar";
    document.getElementById("altaProductosEncargado").style.display = "inline";
  }
  
  deleteProducto(id: number) {
    this.productoService.deleteProducto(id).subscribe(
      data => console.info('Id: ${data.id} borrado con éxito'),
      err => console.error(err),
      () => console.info('éxito')
    );
    this.TraerProductos();
  }

  mostrarProducto(id, nom,des, f1, f2, f3, mon, pre) {
    this.operacion = "Modificar";
    this.idProductoEncargado = id;
    this.nombreProductoEncargado = nom;
    this.descripcionProductoEncargado = des;
    this.foto1ProductoEncargado = f1;
    this.foto2ProductoEncargado = f2;
    this.foto3ProductoEncargado = f3;
    this.monedaProductoEncargado = mon;
    this.precioProductoEncargado = pre;
    document.getElementById("altaProductosEncargado").style.display = "inline";
  }

  CancelarProducto() {
    document.getElementById("altaProductosEncargado").style.display = "none";
    this.idProductoEncargado = "";
    this.nombreProductoEncargado = "";
    this.descripcionProductoEncargado = "";
    this.foto1ProductoEncargado = "";
    this.foto2ProductoEncargado = "";
    this.foto3ProductoEncargado = "";
    this.monedaProductoEncargado = "";
    this.precioProductoEncargado = "";
  }
  subirImagenes() {
      this.contImagen = 1;
      this.foto1ProductoEncargado = "";
      this.foto2ProductoEncargado ="";
      this.foto3ProductoEncargado ="";
      this.uploader.uploadAll();      
      //this.uploader.clearQueue();
      //document.getElementById("fileUploadFotos").innerHTML="";
  }

  GuardarProducto() {
    if (((this.nombreProductoEncargado == "") || (this.nombreProductoEncargado == undefined) || (this.nombreProductoEncargado == null))) {
        alert("El nombre del producto, direccion, localidad, provincia y país son obligatorios");
    } else {
      if (this.operacion == "Insertar") {
        let objProducto: Producto = new Producto(0, this.nombreProductoEncargado, this.descripcionProductoEncargado, this.foto1ProductoEncargado, this.foto2ProductoEncargado, this.foto3ProductoEncargado, this.monedaProductoEncargado, this.precioProductoEncargado);

        this.productoService.GuardarProducto(objProducto).subscribe();

      } else if (this.operacion == "Modificar") {
        let objProducto: Producto = new Producto(this.idProductoEncargado, this.nombreProductoEncargado,this.descripcionProductoEncargado, this.foto1ProductoEncargado, this.foto2ProductoEncargado, this.foto3ProductoEncargado, this.monedaProductoEncargado, this.precioProductoEncargado);
        this.productoService.putProducto(objProducto).subscribe();
      }
      this.uploader.clearQueue();
      this.TraerProductos();
      this.CancelarProducto();
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

  mostrarLocal(id, nom, dir,enc, f1, f2, f3) {
    this.operacion = "Modificar";
    this.idLocalEncargado = id;
    this.nombreLocalEncargado = nom;
    this.direccionLocalEncargado = dir;
    this.encargadoLocalEncargado = enc;
    this.foto1LocalEncargado = f1;
    this.foto2LocalEncargado = f2;
    this.foto3LocalEncargado = f3;
    document.getElementById("altaLocalesEncargado").style.display = "inline";
  }

  CancelarLocal() {
    document.getElementById("altaLocalesEncargado").style.display = "none";
    this.idLocalEncargado = "";
    this.nombreLocalEncargado = "";
    this.direccionLocalEncargado = "";
    this.encargadoLocalEncargado="";
    this.foto1LocalEncargado = "";
    this.foto2LocalEncargado = "";
    this.foto3LocalEncargado = "";

  }

    subirImagenesLocal() {
        this.contImagen = 1;
        this.foto1LocalEncargado = "";
        this.foto2LocalEncargado ="";
        this.foto3LocalEncargado ="";
        this.uploaderLocal.uploadAll();      
        //this.uploader.clearQueue();
        //document.getElementById("fileUploadFotos").innerHTML="";
    }

  GuardarLocal() {
    if (((this.nombreLocalEncargado == "") || (this.nombreLocalEncargado == undefined) || (this.nombreLocalEncargado == null)) ||
      ((this.direccionLocalEncargado == "") || (this.direccionLocalEncargado == undefined) || (this.direccionLocalEncargado == null))) {
        alert("Los Datos en pantalla son obligatorios");
    } else {
      if (this.operacion == "Insertar") {
        alert("Usted no tiene los permisos para poder insertar Locales")
      } else if (this.operacion == "Modificar") {
        let objLocal: Local = new Local(this.idLocalEncargado, this.nombreLocalEncargado, this.direccionLocalEncargado, this.encargadoLocalEncargado, this.foto1LocalEncargado, this.foto2LocalEncargado, this.foto3LocalEncargado);
        this.localService.putLocal(objLocal).subscribe();
      }
      this.uploaderLocal.clearQueue();
      this.TraerLocales();
      this.CancelarLocal();
    }

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

  mostrarUsuario(id, nom, usu, pass, tipo,est) {
    this.operacion = "Modificar";
    this.idUsuarioEncargado = id;
    this.nombreUsuarioEncargado = nom;
    this.usuarioUsuarioEncargado = usu;
    this.passwordUsuarioEncargado = pass;
    this.tipoUsuarioEncargado = tipo;
    console.log(est);
    if((est == "true") || (est == 1)){
      this.estadoUsuarioEncargado = 1;
    }else{
      this.estadoUsuarioEncargado = 0;
    }
    

    
    console.log("el estado es: " + this.estadoUsuarioEncargado);
    document.getElementById("altaUsuariosEncargado").style.display = "inline";
  }

  CancelarUsuario() {
    document.getElementById("altaUsuariosEncargado").style.display = "none";
    this.nombreUsuarioEncargado = "";
    this.usuarioUsuarioEncargado = "";
    this.passwordUsuarioEncargado = "";
    this.tipoUsuarioEncargado = "";
    this.estadoUsuarioEncargado = false;
  }

  GuardarUsuario() {
    console.log(this.estadoUsuarioEncargado);
    if (((this.nombreUsuarioEncargado == "") || (this.nombreUsuarioEncargado == undefined) || (this.nombreUsuarioEncargado == null)) ||
      ((this.usuarioUsuarioEncargado == "") || (this.usuarioUsuarioEncargado == undefined) || (this.usuarioUsuarioEncargado == null)) ||
      ((this.passwordUsuarioEncargado == "") || (this.passwordUsuarioEncargado == undefined) || (this.passwordUsuarioEncargado == null)) ||
      ((this.tipoUsuarioEncargado == "") || (this.tipoUsuarioEncargado == undefined) || (this.tipoUsuarioEncargado == null))) {
        alert("Los Datos en pantalla son obligatorios");
    } else {
      if (this.operacion == "Insertar") {
        alert("No posee los permisos para insertar un nuevo usuario")
      } else if (this.operacion == "Modificar") {
        if((this.estadoUsuarioEncargado == "true") || (this.estadoUsuarioEncargado == 1)){
          this.estadoUsuarioEncargado = 1;
        }else{
          this.estadoUsuarioEncargado = 0;
        }

        let objUsuario: Usuario = new Usuario(this.idUsuarioEncargado, this.nombreUsuarioEncargado, this.usuarioUsuarioEncargado, this.passwordUsuarioEncargado, this.tipoUsuarioEncargado, this.estadoUsuarioEncargado);
        this.usuarioService.putUsuario(objUsuario).subscribe();
      }
      this.TraerUsuarios();
      this.CancelarUsuario();
    }

  }

//EMPLEADOS

  altaEmpleado() {
    this.operacion = "Insertar";
    document.getElementById("altaEmpleadosEncargado").style.display = "inline";
  }

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

  TraerUsuariosEmpleados() {
    this.empleadoService.getUsuariosEmpleados().subscribe(
      data => this.usuariosEmpleados = data,
      err => {
        console.error(err);
        this.error = true;
      },
      () => console.log("usuarios traidos con éxito")
    );
  }  

  deleteEmpleado(id: number) {
    this.empleadoService.deleteEmpleado(id).subscribe(
      data => console.info('Id: ${data.id} borrado con éxito'),
      err => console.error(err),
      () => console.info('éxito')
    );
    this.TraerEmpleados();
  }

  mostrarEmpleado(id, nom, dir, idUsu) {
    this.operacion = "Modificar";
    this.idEmpleadoEncargado = id;
    this.nombreEmpleadoEncargado = nom;
    this.direccionEmpleadoEncargado = dir;
    this.usuarioLoginEmpleadoEncargado = idUsu;
    
    document.getElementById("altaEmpleadosEncargado").style.display = "inline";
  }

  CancelarEmpleado() {
    document.getElementById("altaEmpleadosEncargado").style.display = "none";
    this.idEmpleadoEncargado = "";
    this.nombreEmpleadoEncargado = "";
    this.direccionEmpleadoEncargado = "";
    this.usuarioLoginEmpleadoEncargado = "";
  }

  GuardarEmpleado() {
    if (((this.nombreEmpleadoEncargado == "") || (this.nombreEmpleadoEncargado == undefined) || (this.nombreEmpleadoEncargado == null))) {
        alert("El nombre es obligatorios");
    } else {
      if (this.operacion == "Insertar") {
        let objEmpleado: Empleado = new Empleado(0, this.nombreEmpleadoEncargado, this.direccionEmpleadoEncargado, this.usuarioLoginEmpleadoEncargado);

        this.empleadoService.GuardarEmpleado(objEmpleado).subscribe();

      } else if (this.operacion == "Modificar") {
        let objEmpleado: Empleado = new Empleado(this.idEmpleadoEncargado, this.nombreEmpleadoEncargado, this.direccionEmpleadoEncargado, this.usuarioLoginEmpleadoEncargado);
        this.empleadoService.putEmpleado(objEmpleado).subscribe();
      }
      this.TraerEmpleados();
      this.CancelarEmpleado();
    }

  }  

}
