import { Component, OnInit } from '@angular/core';
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { CarouselModule } from 'ngx-bootstrap';

import { ServicioClientesService } from '../servicio-clientes.service';
import { Cliente } from '../../clases/cliente.class';

import { ServicioProductosService } from '../servicio-productos.service';
import { Producto } from '../../clases/producto.class';
import { LocalProducto } from '../../clases/localProducto.class';

import { ServicioLocalesService } from '../servicio-locales.service';
import { Local } from '../../clases/local.class';
import { EmpleadoLocal } from '../../clases/empleadoLocal.class';

import { ServicioUsuariosService } from '../servicio-usuarios.service';
import { Usuario } from '../../clases/usuario.class';
import { ServicioEmpleadosService } from '../servicio-empleados.service';
import { Empleado } from '../../clases/empleado.class';

//import { ServicioOfertasService } from '../servicio-ofertas.service';
import { ServicioOfertaService } from '../servicio-oferta.service';
import { Oferta } from '../../clases/oferta.class';
import { ProductoOferta } from '../../clases/productoOferta.class';

import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AgmCoreModule, MapsAPILoader } from 'angular2-google-maps/core';
import { NgModule, NgZone, ViewChild } from '@angular/core';

import { ServicioReservasService } from '../servicio-reservas.service';
import { Reserva } from '../../clases/reserva.class';

const URL = 'http://nfranzeseutn.hol.es/miAPIRest/index.php/uploadFoto';

@Component({
  selector: 'app-encargado',
  templateUrl: './encargado.component.html',
  styleUrls: ['./encargado.component.css']
})
export class EncargadoComponent implements OnInit {

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  public dirURL;
  @ViewChild("search")
  //public searchElementRef: ElementRef;
  public searchElementRef;

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
  private direccionProductoEncargado: string;
  private tipoProductoEncargado;
  private vDesdeProductoEncargado;
  private vHastaProductoEncargado;  
  private foto1ProductoEncargado: string;
  private foto2ProductoEncargado: string;
  private foto3ProductoEncargado: string;
  private monedaProductoEncargado: string;
  private precioProductoEncargado: string;
  private localesProductos;
  private LocalProductoEncargado;
  private productoLocal: string;
  private idProductoLocal: any;

  private locales;
  private idLocalEncargado: any;
  private nombreLocalEncargado: any;
  private direccionLocalEncargado: any;
  private encargadoLocalEncargado: any;
  private foto1LocalEncargado: any;
  private foto2LocalEncargado: any;
  private foto3LocalEncargado: any;
  private empleadosLocales:any;
  private localEmpleado;
  private idLocalEmpleado;
  private EmpleadoLocalEncargado: string; 

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

  private ofertas;
  private idOfertaEncargado;
  private nombreOfertaEncargado: string;
  private descripcionOfertaEncargado: string;
  private monedaOfertaEncargado: string;
  private precioOfertaEncargado: string;
  private tipoOfertaEncargado: string;
  private ofertaProducto: string;
  private idOfertaProducto: any;
  private ProductoOfertaEncargado: string; 
  private ofertasServiceAux:any;

  private reservas;
  private idProductoSeleccionado;
  private productoSeleccionado;
  private nombreProducto;
  private direccionProducto;
  private tipoProducto;
  private fechaDesdeProducto;
  private fechaHastaProducto;
  private fecha;
  private clienteProducto;


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

  constructor(private clienteService: ServicioClientesService, 
              private productoService: ServicioProductosService, 
              private localService: ServicioLocalesService,
              private usuarioService: ServicioUsuariosService,
              private empleadoService: ServicioEmpleadosService,
              private ofertaService: ServicioOfertaService,
              private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone,
              private reservaService: ServicioReservasService) { 

    this.TraerClientes();
    this.TraerProductos();
    this.TraerLocales();
    this.TraerUsuarios();
    this.TraerEmpleados();
    this.TraerOfertas();
    this.TraerUsuariosClientes();
    this.TraerUsuariosEmpleados();
    this.TraerReservas();
    this.contImagen = 1;
    //************************************************
   //***************FILE UPLOAD**********************
   //************************************************

    //Esto se ejecutará cuando voy a la api.
    this.uploader.onBeforeUploadItem=(item)=>
    {
      console.log(this.contImagen);
            
      if (this.contImagen == 1){       
          console.log("entró 1");     
          this.foto1ProductoEncargado = item['file'].name;
          this.contImagen = this.contImagen + 1;  
          item.withCredentials = false;   
      }else if (this.contImagen == 2){
        console.log("entró 2");
        this.foto2ProductoEncargado = item['file'].name;
        this.contImagen = this.contImagen + 1;  
        item.withCredentials = false;           
      }else if (this.contImagen == 3){
        console.log("entró 3");
        this.foto3ProductoEncargado = item['file'].name;        
       item.withCredentials = false;   
      }
    
    }

    this.uploaderLocal.onBeforeUploadItem=(item)=>
    {
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
        item.withCredentials = false;   
      }
    
    }

    this.ngOnInit();

  }

  ngOnInit() {
    //set google maps defaults
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          console.log(place);
          this.direccionProductoEncargado = place.formatted_address;    
          this.dirURL = place.url;    
          console.log("al presionar en el combo: " + this.direccionProductoEncargado);  
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }

  setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

  MostrarClientes()
  {
    document.getElementById("ClientesEncargado").style.display = "inline";
    document.getElementById("ProductosEncargado").style.display = "none";
    document.getElementById("altaLocalesProductosEncargado").style.display = "none";   
    document.getElementById("OfertasEncargado").style.display = "none";      
    document.getElementById("ReservasEncargado").style.display = "none";
    document.getElementById("altaReservas").style.display = "none";    
    document.getElementById("LocalesEncargado").style.display = "none";
    document.getElementById("altaEmpleadosLocalesEncargado").style.display = "none";      
    document.getElementById("UsuariosEncargado").style.display = "none";
    document.getElementById("EmpleadosEncargado").style.display = "none";
  }

  MostrarProductos()
  {
    document.getElementById("ClientesEncargado").style.display = "none";
    document.getElementById("ProductosEncargado").style.display = "inline";
    document.getElementById("altaLocalesProductosEncargado").style.display = "none";         
    document.getElementById("OfertasEncargado").style.display = "none";   
    document.getElementById("ReservasEncargado").style.display = "none";
    document.getElementById("altaReservas").style.display = "none";    
    document.getElementById("LocalesEncargado").style.display = "none";
    document.getElementById("altaEmpleadosLocalesEncargado").style.display = "none";      
    document.getElementById("UsuariosEncargado").style.display = "none";
    document.getElementById("EmpleadosEncargado").style.display = "none";
  }
    MostrarOfertas()
  {
    document.getElementById("ClientesEncargado").style.display = "none";
    document.getElementById("ProductosEncargado").style.display = "none";
    document.getElementById("altaLocalesProductosEncargado").style.display = "none";        
    document.getElementById("OfertasEncargado").style.display = "inline";    
    document.getElementById("ReservasEncargado").style.display = "none";
    document.getElementById("altaReservas").style.display = "none";    
    document.getElementById("LocalesEncargado").style.display = "none";
    document.getElementById("altaEmpleadosLocalesEncargado").style.display = "none";      
    document.getElementById("UsuariosEncargado").style.display = "none";
    document.getElementById("EmpleadosEncargado").style.display = "none";
  }

    MostrarReservas()
  {
    document.getElementById("ClientesEncargado").style.display = "none";
    document.getElementById("ProductosEncargado").style.display = "none";
    document.getElementById("altaLocalesProductosEncargado").style.display = "none";   
    document.getElementById("OfertasEncargado").style.display = "none";     
    document.getElementById("ReservasEncargado").style.display = "inline";
    document.getElementById("altaReservas").style.display = "none";    
    document.getElementById("LocalesEncargado").style.display = "none";
    document.getElementById("altaEmpleadosLocalesEncargado").style.display = "none";          
    document.getElementById("UsuariosEncargado").style.display = "none";
    document.getElementById("EmpleadosEncargado").style.display = "none";
  }

  MostrarLocales() {
    document.getElementById("ClientesEncargado").style.display = "none";
    document.getElementById("ProductosEncargado").style.display = "none";
    document.getElementById("altaLocalesProductosEncargado").style.display = "none";   
    document.getElementById("OfertasEncargado").style.display = "none";     
    document.getElementById("ReservasEncargado").style.display = "none";
    document.getElementById("altaReservas").style.display = "none";    
    document.getElementById("LocalesEncargado").style.display = "inline";
    document.getElementById("altaEmpleadosLocalesEncargado").style.display = "none";          
    document.getElementById("UsuariosEncargado").style.display = "none";
    document.getElementById("EmpleadosEncargado").style.display = "none";
  }

  MostrarUsuarios() {
    document.getElementById("ClientesEncargado").style.display = "none";
    document.getElementById("ProductosEncargado").style.display = "none";
    document.getElementById("altaLocalesProductosEncargado").style.display = "none";   
    document.getElementById("OfertasEncargado").style.display = "none";     
    document.getElementById("ReservasEncargado").style.display = "none";
    document.getElementById("altaReservas").style.display = "none";    
    document.getElementById("LocalesEncargado").style.display = "none";
    document.getElementById("altaEmpleadosLocalesEncargado").style.display = "none";          
    document.getElementById("UsuariosEncargado").style.display = "inline";
    document.getElementById("EmpleadosEncargado").style.display = "none";
  }  

  MostrarEmpleados() {
    document.getElementById("ClientesEncargado").style.display = "none";
    document.getElementById("ProductosEncargado").style.display = "none";
    document.getElementById("altaLocalesProductosEncargado").style.display = "none";  
    document.getElementById("OfertasEncargado").style.display = "none";     
    document.getElementById("ReservasEncargado").style.display = "none";
    document.getElementById("altaReservas").style.display = "none";    
    document.getElementById("LocalesEncargado").style.display = "none";
    document.getElementById("altaEmpleadosLocalesEncargado").style.display = "none";          
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

  mostrarProducto(id, nom,des, dir, tip, vd, vh, f1, f2, f3, mon, pre) {
    this.operacion = "Modificar";
    this.idProductoEncargado = id;
    this.nombreProductoEncargado = nom;
    this.descripcionProductoEncargado = des;
    this.direccionProductoEncargado = dir;    
    this.tipoProductoEncargado = tip;
    this.vDesdeProductoEncargado = vd;
    this.vHastaProductoEncargado = vh;
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
    this.direccionProductoEncargado = "";
    this.tipoProductoEncargado = "";
    this.vDesdeProductoEncargado = "";
    this.vHastaProductoEncargado = "";    
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
    console.log(this.direccionProductoEncargado);
    if (((this.nombreProductoEncargado == "") || (this.nombreProductoEncargado == undefined) || (this.nombreProductoEncargado == null))) {
        alert("El nombre del producto, direccion, localidad, provincia y país son obligatorios");
    } else {
      if (this.operacion == "Insertar") {
        let objProducto: Producto = new Producto(0, this.nombreProductoEncargado, this.descripcionProductoEncargado, this.direccionProductoEncargado, this.tipoProductoEncargado,this.vDesdeProductoEncargado, this.vHastaProductoEncargado, this.foto1ProductoEncargado, this.foto2ProductoEncargado, this.foto3ProductoEncargado, this.monedaProductoEncargado, this.precioProductoEncargado, this.latitude, this.longitude,  this.dirURL);

        this.productoService.GuardarProducto(objProducto).subscribe();

      } else if (this.operacion == "Modificar") {
        let objProducto: Producto = new Producto(this.idProductoEncargado, this.nombreProductoEncargado,this.descripcionProductoEncargado, this.direccionProductoEncargado, this.tipoProductoEncargado,this.vDesdeProductoEncargado, this.vHastaProductoEncargado, this.foto1ProductoEncargado, this.foto2ProductoEncargado, this.foto3ProductoEncargado, this.monedaProductoEncargado, this.precioProductoEncargado, this.latitude, this.longitude,  this.dirURL);
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

  //DETALLE DE EMPLEADOS LOCALES
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
    document.getElementById("altaEmpleadosLocalesEncargado").style.display = "inline";
    document.getElementById("altaLocalesEncargado").style.display = "none";    
    this.localEmpleado = nom;
    this.idLocalEmpleado = id;
    this.getDetalleEmpleadosLocales(id);    
  }

  AddEmpleadoLocal() {

    if ((this.EmpleadoLocalEncargado == "") || (this.EmpleadoLocalEncargado == undefined) || (this.EmpleadoLocalEncargado == null)) {
        alert("Debe elegir un empleado en el Combo de empleados");
    } else {   
        let objEmpleadoLocal: EmpleadoLocal = new EmpleadoLocal(0, this.idLocalEmpleado, this.EmpleadoLocalEncargado);
        console.log(this.localService);
        this.localService.GuardarEmpleadoLocal(objEmpleadoLocal).subscribe();  
    }    
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
     document.getElementById("altaEmpleadoLocalEncargado").style.display = "none";
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
      this.TraerEmpleados();
      this.CancelarEmpleado();
    }

  }  

//DETALLE LOCALES PRODUCTO
  TraerDetalleLocales(id: number) {
    this.productoService.getDetalleLocalesProducto(id).subscribe(
      data => this.localesProductos = data,
      err => {
        console.error(err);
        this.error = true;
      },
      () => console.log("Locales de Producto traidos con éxito")
    );
    console.log("Locales:" +this.localesProductos);
  }

  agregarLocales(id, nombre){
    console.log(id);
    document.getElementById("altaLocalesProductosEncargado").style.display = "inline";
    document.getElementById("altaProductosEncargado").style.display = "none";    
    this.productoLocal = nombre;
    this.idProductoLocal = id;
    this.TraerDetalleLocales(id);    
  }

  GuardarLocalProducto() {
    if ((this.LocalProductoEncargado == "") || (this.LocalProductoEncargado == undefined) || (this.LocalProductoEncargado == null)) {
        alert("Debe elegir un producto en el Combo de productos");
    } else {      
        let objLocalProducto: LocalProducto = new LocalProducto(0, this.idProductoLocal, this.LocalProductoEncargado);
        this.productoService.GuardarLocalProducto(objLocalProducto).subscribe();               
   }
        this.TraerDetalleLocales(this.idProductoLocal);    
  }
  
  deleteLocalProducto(id: number) {
    this.productoService.deleteLocalProducto(id).subscribe(
      data => console.info('Id: ${data.id} borrado con éxito'),
      err => console.error(err),
      () => console.info('éxito')
    )
    console.log(this.idProductoLocal);
    this.TraerDetalleLocales(this.idProductoLocal);
    this.TraerDetalleLocales(this.idProductoLocal);
  }

  CerrarLocalProducto(){
     document.getElementById("altaLocalesProductosEncargado").style.display = "none";
  }    



//OFERTAS
  TraerOfertas() {
    this.ofertaService.getOfertas().subscribe(
      data => this.ofertas = data,
      err => {
        console.error(err);
        this.error = true;
      },
      () => console.log("Ofertas traidas con éxito traidos con éxito")
    );
  }

  /*TraerProductosOfertas() {
    this.ofertaService.getProductos().subscribe(
      data => this.productos = data,
      err => {
        console.error(err);
        this.error = true;
      },
      () => console.log("Productos traidos con éxito")
    );
  }*/

  altaOferta() {
    this.operacion = "Insertar";
    document.getElementById("altaOfertasEncargado").style.display = "inline";
  }
  
  deleteOferta(id: number) {
    this.ofertaService.deleteOferta(id).subscribe(
      data => console.info('Id: ${data.id} borrado con éxito'),
      err => console.error(err),
      () => console.info('éxito')
    );
    this.TraerOfertas();
  }

  mostrarOferta(id, nom, des, mon, pre, tipo) {
    this.operacion = "Modificar";
    this.idOfertaEncargado = id;
    this.nombreOfertaEncargado = nom;
    this.descripcionOfertaEncargado = des;
    this.monedaOfertaEncargado = mon;
    this.precioOfertaEncargado = pre;
    this.tipoOfertaEncargado = tipo;

    document.getElementById("altaOfertasEncargado").style.display = "inline";
    document.getElementById("altaProductosOfertasEncargado").style.display = "none";
  }

  CancelarOferta() {
    document.getElementById("altaOfertasEncargado").style.display = "none";
    this.idOfertaEncargado = "";
    this.nombreOfertaEncargado = "";
    this.descripcionOfertaEncargado = "";
    this.monedaOfertaEncargado = "";
    this.precioOfertaEncargado = "";
    this.tipoOfertaEncargado = "";
  }


  GuardarOferta() {
    if (((this.nombreOfertaEncargado == "") || (this.nombreOfertaEncargado == undefined) || (this.nombreOfertaEncargado == null))) {
        alert("El nombre de la oferta");
    } else {
      if (this.operacion == "Insertar") {
        let objOferta: Oferta = new Oferta(0, this.nombreOfertaEncargado, this.descripcionOfertaEncargado, this.monedaOfertaEncargado, this.precioOfertaEncargado, this.tipoOfertaEncargado);
        this.ofertaService.GuardarOferta(objOferta).subscribe();        
      } else if (this.operacion == "Modificar") {
        let objOferta: Oferta = new Oferta(this.idOfertaEncargado, this.nombreOfertaEncargado, this.descripcionOfertaEncargado, this.monedaOfertaEncargado, this.precioOfertaEncargado, this.tipoOfertaEncargado);
        this.ofertaService.putOferta(objOferta).subscribe();
      }
    }

    this.TraerOfertas();
    this.CancelarOferta();
    //this.contImagen = 1;
  }

//DETALLE PRODUCTO DE OFERTAS
  getDetalleProductosOferta(id: number) {
    this.ofertaService.getDetProductoOferta(id).subscribe(
      data => this.ofertaService = data,
      err => {
        console.error(err);
        this.error = true;
      },
      () => console.log("Productos de Oferta traidos con éxito")
    );   
  }

  agregarProductosOferta(id, nom){
    console.log(id);
    document.getElementById("altaProductosOfertasEncargado").style.display = "inline";
    document.getElementById("altaOfertasEncargado").style.display = "none";    
    this.ofertaProducto = nom;
    this.idOfertaProducto = id;
    this.getDetalleProductosOferta(id);    
  }

  AddProductoOferta() {
    //this.idOfertaEncargado = ofe;
    /*console.log(this.idOfertaProducto);
    console.log(this.ProductoOfertaEncargado);*/

    if ((this.ProductoOfertaEncargado == "") || (this.ProductoOfertaEncargado == undefined) || (this.ProductoOfertaEncargado == null)) {
        alert("Debe elegir un producto en el Combo de locales");
    } else {   
        let objProductoOferta: ProductoOferta = new ProductoOferta(0, this.idOfertaProducto, this.ProductoOfertaEncargado);
        console.log(this.ofertaService);
        this.ofertaService.AddProductoOferta(objProductoOferta).subscribe();  
//this.ofertasServiceAux(objProductoOferta).subscribe();  

        /*let objProductoOferta: ProductoOferta = new ProductoOferta(0, this.idOfertaProducto, this.ProductoOfertaEncargado);
        console.info(objProductoOferta);
        this.ofertaService.AddProductoOferta(objProductoOferta).subscribe();                       */

        /*this.ofertaService.AddProductoOferta(objProductoOferta).subscribe(
          data => console.info('Id: ${data.id} insertado con éxito'),
          err => console.error(err),
          () => console.info('éxito')
        )*/     
    }    
    this.getDetalleProductosOferta(this.idOfertaProducto);        
  }
  

  deleteProductoOferta(id: number) {
    this.ofertaService.deleteProductoOferta(id).subscribe(
      data => console.info('Id: ${data.id} borrado con éxito'),
      err => console.error(err),
      () => console.info('éxito')
    )
    console.log(this.idOfertaProducto);
    this.getDetalleProductosOferta(this.idOfertaProducto);
    this.getDetalleProductosOferta(this.idOfertaProducto);
  }

  CerrarProductoOferta(){
     document.getElementById("altaProductosOfertasEncargado").style.display = "none";
  }

  //RESERVAS   

  verMapa(p: Producto){
    //window.open(fileURL, "_self");
    window.open(p.dirURL, '_blank');

    console.log(p);
    localStorage.setItem("Direccion",p.direccion);
    localStorage.setItem("Lat",p.lat);
    localStorage.setItem("Lng",p.lng);

  }


  addCarrito(p: Producto, id){
    this.MostrarReservas();
    document.getElementById("altaReservas").style.display = "inline";
    //this.clienteProducto = "Generico";
    this.productoSeleccionado = p;
    this.idProductoSeleccionado = id;    
    this.nombreProducto = p.nombre;
    this.direccionProducto = p.direccion;
    this.tipoProducto = p.tipo;
  }

CancelarReserva() {
    document.getElementById("altaReservas").style.display = "none";
    this.idProductoSeleccionado = "";
    this.productoSeleccionado = "";
    this.nombreProducto = "";
    this.direccionProducto = "";
    this.tipoProducto = "";
    this.fechaDesdeProducto = "";
    this.fechaHastaProducto = "";
    this.fecha = "";
    this.clienteProducto = "";
  }

  GuardarReserva() {
    let band;
    band = 0;
    if (((this.idProductoSeleccionado == "") || (this.idProductoSeleccionado == undefined) || (this.idProductoSeleccionado == null)) ||        
        ((this.clienteProducto == "") || (this.clienteProducto == undefined) || (this.clienteProducto == null))) {
        alert("Debe existir un cliente para la reserva y seleccionar un producto en la seccion de productos y ofertas");
        band=1;
    }

    if((((this.fechaDesdeProducto == "") || (this.fechaDesdeProducto == undefined) || (this.fechaDesdeProducto == null)) ||
        ((this.fechaHastaProducto == "") || (this.fechaHastaProducto == undefined) || (this.fechaHastaProducto == null)))
        && (this.tipoProducto == "Alquiler")){
          alert("Si el producto es un alquiler, debe ingresar la fecha desde y hasta");
          band=1;
        }
    
    if (this.tipoProducto == "Venta"){
      this.fechaDesdeProducto = "";
      this.fechaHastaProducto = "";      
    }

    if (((this.fechaDesdeProducto < Date.now() + 30) || (this.fechaDesdeProducto > Date.now() + 60)) 
        && (this.tipoProducto == "Alquiler")){      
        alert("No puede hacer una reserva de alquiler con fecha de inicio menor a 30 dias o mayor a 60 días a partir de hoy");
        band=1;
    }

    if(band==0){
      //if (this.operacion == "Insertar") {
      let objCliente: Reserva = new Reserva(0, this.clienteProducto, Date.now(), this.idProductoSeleccionado, this.tipoProducto, this.fechaDesdeProducto, this.fechaHastaProducto);
      this.reservaService.GuardarReserva(objCliente).subscribe();

      /*} else if (this.operacion == "Modificar") {
        let objCliente: Cliente = new Cliente(this.idClienteEncargado, this.nombreClienteEncargado, this.mailClienteEncargado, this.telefonoClienteEncargado, this.direccionClienteEncargado, this.usuarioLoginClienteEncargado);
        this.clienteService.putCliente(objCliente).subscribe();
      }*/
      this.TraerReservas();
      this.CancelarReserva();
    }
  }

  TraerReservas() {
    this.reservaService.getReservas().subscribe(
      data => this.reservas = data,
      err => {
        console.error(err);
        this.error = true;
      },
      () => console.log("Reservas traidos con éxito")
    );
  }

}
