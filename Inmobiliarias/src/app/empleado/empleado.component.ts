import { Component, OnInit } from '@angular/core';
import { ServicioClientesService } from '../servicio-clientes.service';
import { Cliente } from '../../clases/cliente.class';
import { ServicioProductosService } from '../servicio-productos.service';
import { Producto } from '../../clases/producto.class';
import { LocalProducto } from '../../clases/localProducto.class';
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { CarouselModule } from 'ngx-bootstrap';
import { ServicioLocalesService } from '../servicio-locales.service';

import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AgmCoreModule, MapsAPILoader } from 'angular2-google-maps/core';
import { NgModule, NgZone, ViewChild } from '@angular/core';

import { ServicioReservasService } from '../servicio-reservas.service';

import { Router } from '@angular/router';

const URL = 'http://nfranzeseutn.hol.es/miAPIRest/index.php/uploadFoto';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements OnInit {

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  public dirURL;

  @ViewChild("search")
  //public searchElementRef: ElementRef;
  public searchElementRef;

  public clientes;
  public usuariosClientes;
  public idClienteEmpleado: string;
  public nombreClienteEmpleado: string;
  public mailClienteEmpleado: string;
  public telefonoClienteEmpleado: string;
  public direccionClienteEmpleado: string;
  public usuarioLoginClienteEmpleado: string;

  public localesProductos;
  public LocalProductoEmpleado;
  public productos;
  public proxIdF1;
  public proxIdF2;
  public proxIdF3;
  //public contImagen: number = 0;
  public contImagen;  
  public idProductoEmpleado: string;
  public nombreProductoEmpleado: string;
  public direccionProductoEmpleado: string;
  public descripcionProductoEmpleado: string;
  public tipoProductoEmpleado;
  public vDesdeProductoEmpleado;
  public vHastaProductoEmpleado;    
  public foto1ProductoEmpleado: string;
  public previsualizacionFoto1: string;
  public foto2ProductoEmpleado: string;
  public foto3ProductoEmpleado: string;
  public monedaProductoEmpleado: string;
  public precioProductoEmpleado: string;
  public productoLocal: string;
  public idProductoLocal: any;

  public reservas;

  public locales: any;
  public mensaje: string;
  public success: boolean = false;
  public error: boolean = false;
  public operacion: string;



  public uploader:FileUploader = new FileUploader({url: URL});
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
              private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone,
              private reservaService: ServicioReservasService,
              public router: Router) 
  { 
    
  /*  $('#myCarousel').carousel({
      interval: 4000
    });
*/
    this.contImagen = 1;
    this.TraerClientes();
    this.TraerProductos();

    this.TomarProximoIdF1();
    this.TomarProximoIdF2();
    this.TomarProximoIdF3();
    this.TraerUsuariosClientes();
    this.TraerLocales();
    this.TraerReservas();


console.info(this.usuariosClientes);
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
          this.foto1ProductoEmpleado = this.proxIdF1 + '.' + extension;
          item['file'].name = this.foto1ProductoEmpleado; */
          console.log("entró 1");     
          this.foto1ProductoEmpleado = item['file'].name;
          this.contImagen = this.contImagen + 1;  
          item.withCredentials = false;   
      }else if (this.contImagen == 2){
        /*var nombreFoto =  item['file'].name;
        let extension = nombreFoto.split('.').pop();
        this.foto2ProductoEmpleado = this.proxIdF2 + '.' + extension;
        item['file'].name = this.foto2ProductoEmpleado;*/
        console.log("entró 2");
        this.foto2ProductoEmpleado = item['file'].name;
        this.contImagen = this.contImagen + 1;  
        item.withCredentials = false;           
      }else if (this.contImagen == 3){
        /*var nombreFoto =  item['file'].name;
        let extension = nombreFoto.split('.').pop();
        this.foto3ProductoEmpleado = this.proxIdF3 + '.' + extension;
        item['file'].name = this.foto3ProductoEmpleado;*/
        console.log("entró 3");
        this.foto3ProductoEmpleado = item['file'].name;        
        //this.contImagen = 1;
        item.withCredentials = false;   
      }
    
    }

    //Esto se ejecutará cuando vuelvo de la api.
    this.uploader.onSuccessItem=(response,status)=>
    {
      //console.info("response", response);
      console.info("este es el status", status);
    }

    this.ngOnInit();
  }

  TomarProximoIdF1()
  {
    this.productoService.getProductos().subscribe(
      //producto => this.proxIdF1 = ((producto[producto.length -1].ID +1) + "-1"),
      producto => this.proxIdF1 = ((producto.ID +1) + "-1"),
      err => console.error(err)

    );
  }
  TomarProximoIdF2()
  {
    this.productoService.getProductos().subscribe(
      //producto => this.proxIdF2 = ((producto[producto.length -1].ID +1) + "-2"),
      producto => this.proxIdF2 = ((producto.ID +1) + "-2"),      
      err => console.error(err)

    );
  }
  TomarProximoIdF3()
  {
    this.productoService.getProductos().subscribe(
      //producto => this.proxIdF3 = ((producto[producto.length -1].ID +1) + "-3"),
      producto => this.proxIdF3 = ((producto.ID +1) + "-3"),
      err => console.error(err)
    );
  }


  ngOnInit() {
    //set google maps defaults
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    //this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          this.direccionProductoEmpleado = place.formatted_address;    
          console.log(place.url);
          this.dirURL = place.url;  
          console.log("al presionar en el combo: " + this.direccionProductoEmpleado);  
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
    document.getElementById("ClientesEmpleado").style.display = "inline";
    document.getElementById("ProductosEmpleado").style.display = "none";
    document.getElementById("altaLocalesProductosEmpleado").style.display = "none";    
    document.getElementById("ReservasEmpleado").style.display = "none";
  }

  MostrarProductos()
  {
    document.getElementById("ClientesEmpleado").style.display = "none";
    document.getElementById("ProductosEmpleado").style.display = "inline";
    document.getElementById("altaLocalesProductosEmpleado").style.display = "none";    
    document.getElementById("ReservasEmpleado").style.display = "none";
  }
    MostrarOfertas()
  {
    document.getElementById("ClientesEmpleado").style.display = "none";
    document.getElementById("ProductosEmpleado").style.display = "none";
    document.getElementById("altaLocalesProductosEmpleado").style.display = "none";    
    document.getElementById("ReservasEmpleado").style.display = "none";
  }
    MostrarReservas()
  {
    document.getElementById("ClientesEmpleado").style.display = "none";
    document.getElementById("ProductosEmpleado").style.display = "none";
    document.getElementById("altaLocalesProductosEmpleado").style.display = "none";    
    document.getElementById("ReservasEmpleado").style.display = "inline";
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
    document.getElementById("altaClientesEmpleado").style.display = "inline";
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
    this.idClienteEmpleado = id;
    this.nombreClienteEmpleado = nom;
    this.mailClienteEmpleado = mail;
    this.telefonoClienteEmpleado = tel;
    this.direccionClienteEmpleado = dir;
    this.usuarioLoginClienteEmpleado = usuLog;

    document.getElementById("altaClientesEmpleado").style.display = "inline";
  }

  CancelarCliente() {
    document.getElementById("altaClientesEmpleado").style.display = "none";
    this.idClienteEmpleado = "";
    this.nombreClienteEmpleado = "";
    this.mailClienteEmpleado = "";
    this.telefonoClienteEmpleado = "";
    this.direccionClienteEmpleado = "";
    this.usuarioLoginClienteEmpleado ="";
  }

  GuardarCliente() {
    if (((this.nombreClienteEmpleado == "") || (this.nombreClienteEmpleado == undefined) || (this.nombreClienteEmpleado == null)) ||
        ((this.mailClienteEmpleado == "") || (this.mailClienteEmpleado == undefined) || (this.mailClienteEmpleado == null))) {
        alert("El nombre del cliente y Mail son obligatorios");
    } else {
      if (this.operacion == "Insertar") {
        let objCliente: Cliente = new Cliente(0, this.nombreClienteEmpleado, this.mailClienteEmpleado, this.telefonoClienteEmpleado, this.direccionClienteEmpleado, this.usuarioLoginClienteEmpleado);

        this.clienteService.GuardarCliente(objCliente).subscribe();

      } else if (this.operacion == "Modificar") {
        let objCliente: Cliente = new Cliente(this.idClienteEmpleado, this.nombreClienteEmpleado, this.mailClienteEmpleado, this.telefonoClienteEmpleado, this.direccionClienteEmpleado, this.usuarioLoginClienteEmpleado);
        this.clienteService.putCliente(objCliente).subscribe();
      }
      this.TraerClientes();
      this.CancelarCliente();
    }

  }

//PRODUCTOS
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
    document.getElementById("altaProductosEmpleado").style.display = "inline";
  }
  
  deleteProducto(id: number) {
    this.productoService.deleteProducto(id).subscribe(
      data => console.info('Id: ${data.id} borrado con éxito'),
      err => console.error(err),
      () => console.info('éxito')
    );
    this.TraerProductos();
  }

  mostrarProducto(id, nom, des, dir, tip, vd, vh,  f1, f2, f3, mon, pre) {
    this.operacion = "Modificar";
    this.idProductoEmpleado = id;
    this.nombreProductoEmpleado = nom;
    this.descripcionProductoEmpleado = des;
    this.direccionProductoEmpleado = dir;
    this.tipoProductoEmpleado = tip;
    this.vDesdeProductoEmpleado = vd;
    this.vHastaProductoEmpleado = vh;    
    this.foto1ProductoEmpleado = f1;
    this.foto2ProductoEmpleado = f2;
    this.foto3ProductoEmpleado = f3;
    this.monedaProductoEmpleado = mon;
    this.precioProductoEmpleado = pre;
    this.uploader.clearQueue();
    document.getElementById("altaProductosEmpleado").style.display = "inline";
    document.getElementById("altaLocalesProductosEmpleado").style.display = "none";
  }

  CancelarProducto() {
    document.getElementById("altaProductosEmpleado").style.display = "none";
    this.idProductoEmpleado = "";
    this.nombreProductoEmpleado = "";
    this.descripcionProductoEmpleado = "";
    this.direccionProductoEmpleado = "";
    this.tipoProductoEmpleado = "";
    this.vDesdeProductoEmpleado = "";
    this.vHastaProductoEmpleado = "";       
    this.foto1ProductoEmpleado = "";
    this.foto2ProductoEmpleado = "";
    this.foto3ProductoEmpleado = "";
    this.monedaProductoEmpleado = "";
    this.precioProductoEmpleado = "";
  }

  subirImagenes() {
      this.contImagen = 1;
      this.foto1ProductoEmpleado = "";
      this.foto2ProductoEmpleado ="";
      this.foto3ProductoEmpleado ="";
      this.uploader.uploadAll();      
      //this.uploader.clearQueue();
      //document.getElementById("fileUploadFotos").innerHTML="";
  }

  GuardarProducto() {
    console.log(this.tipoProductoEmpleado);
    console.log(this.vDesdeProductoEmpleado);
    console.log(this.vHastaProductoEmpleado);
    if (((this.nombreProductoEmpleado == "") || (this.nombreProductoEmpleado == undefined) || (this.nombreProductoEmpleado == null))) {
        alert("El nombre del producto, direccion, localidad, provincia y país son obligatorios");
    } else {
      if (this.operacion == "Insertar") {
        let objProducto: Producto = new Producto(0, this.nombreProductoEmpleado, this.descripcionProductoEmpleado, this.direccionProductoEmpleado, this.tipoProductoEmpleado,this.vDesdeProductoEmpleado, this.vHastaProductoEmpleado, this.foto1ProductoEmpleado, this.foto2ProductoEmpleado, this.foto3ProductoEmpleado, this.monedaProductoEmpleado, this.precioProductoEmpleado, this.latitude, this.longitude, this.dirURL);
        this.productoService.GuardarProducto(objProducto).subscribe();        
      } else if (this.operacion == "Modificar") {
        let objProducto: Producto = new Producto(this.idProductoEmpleado, this.nombreProductoEmpleado, this.descripcionProductoEmpleado, this.direccionProductoEmpleado, this.tipoProductoEmpleado,this.vDesdeProductoEmpleado, this.vHastaProductoEmpleado, this.foto1ProductoEmpleado, this.foto2ProductoEmpleado, this.foto3ProductoEmpleado, this.monedaProductoEmpleado, this.precioProductoEmpleado, this.latitude, this.longitude, this.dirURL);
        this.productoService.putProducto(objProducto).subscribe();
      }
    }
    this.uploader.clearQueue();
    this.TraerProductos();
    this.CancelarProducto();
    //this.contImagen = 1;
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
    document.getElementById("altaLocalesProductosEmpleado").style.display = "inline";
    document.getElementById("altaProductosEmpleado").style.display = "none";    
    this.productoLocal = nombre;
    this.idProductoLocal = id;
    this.TraerDetalleLocales(id);    
  }

  GuardarLocalProducto() {
    if ((this.LocalProductoEmpleado == "") || (this.LocalProductoEmpleado == undefined) || (this.LocalProductoEmpleado == null)) {
        alert("Debe elegir un local en el Combo de locales");
    } else {      
        let objLocalProducto: LocalProducto = new LocalProducto(0, this.idProductoLocal, this.LocalProductoEmpleado);
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
     document.getElementById("altaLocalesProductosEmpleado").style.display = "none";
  }

    //RESERVAS   
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
  desloguearse()
  {
    this.router.navigate(['/login']);
  }

}
