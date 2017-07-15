import { Component, OnInit } from '@angular/core';
import { ServicioProductosService } from '../servicio-productos.service';
import { Producto } from '../../clases/producto.class';
import { Reserva } from '../../clases/reserva.class';
import { ServicioLocalesService } from '../servicio-locales.service';
import { ServicioReservasService } from '../servicio-reservas.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'; 
import { AgmCoreModule } from '@agm/core';
import { SpinnerComponentModule } from 'ng2-component-spinner';
// import { RotatingPlaneComponent } from 'ng2-spin-kit/app/spinner/rotating-plane.component'
import { FadingCircleComponent } from 'ng2-spin-kit/app/spinner/fading-circle';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  lat: number = 51.678418;
  lng: number = 7.809007;

  public productos;
  public locales;
  public idProductoSeleccionado;
  public productoSeleccionado;
  public tipoProducto;
  public nombreProducto;
  public direccionProducto;
  public clienteProducto;
  public fechaDesdeProducto;
  public fechaHastaProducto;
  public fecha;
  // public lngMap;
  // public latMap;

  
  // public latMap: number = -34.7562049;
  // public lngMap: number = -58.20878540000001;
  public latMap: number;
  public lngMap: number;
  public zoom: number = 12;


  public mapaProd;
  public reservas;

  public mensaje: string;
  public success: boolean = false;
  public error: boolean = false;
  public operacion: string;

  public show;

  public filtroLocal:string;

  constructor(private productoService: ServicioProductosService,
              private localService: ServicioLocalesService,
              private reservaService: ServicioReservasService,
              public router: Router,
              private authService: AuthService) { 

        this.TraerProductos();
        this.TraerLocales();
        this.TraerReservas();    
        this.show = false;  

        try {         
          this.clienteProducto = this.authService.getToken().data['nombre'];  
        } catch (error) {
          this.clienteProducto = "Testeo";
        }        
        /*this.latMap=0;
        this.lngMap = 0;*/
  }

  ngOnInit() {
  }

  MostrarOfertas()
  {
    document.getElementById("OfertasCliente").style.display = "inline";
    document.getElementById("OperacionesAnterioresCliente").style.display = "none";
    document.getElementById("ReservarCliente").style.display = "none";
    document.getElementById("altaReservas").style.display = "none";        
  }

  MostrarOperacionesAnteriores()
  {
    document.getElementById("OfertasCliente").style.display = "none";
    document.getElementById("OperacionesAnterioresCliente").style.display = "inline";
    document.getElementById("ReservarCliente").style.display = "none";
    document.getElementById("altaReservas").style.display = "none";        
  }
    MostrarReservar()
  {
    document.getElementById("OfertasCliente").style.display = "none";
    document.getElementById("OperacionesAnterioresCliente").style.display = "none";
    document.getElementById("ReservarCliente").style.display = "inline";
    document.getElementById("altaReservas").style.display = "none";    
    this.show = false;      
  }

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
        this.show = false; 
      },
      () => {console.log("Productos traidos con éxito");
             this.show = false;     
      }
    );

      //console.info(this.productos);
  }

cambiarFiltro(){
  this.show = true;  

  // console.log(this.filtroLocal);
  if(this.filtroLocal == "todas"){
    this.TraerProductos();
  }else{
    this.productoService.getProductosPorLocal(this.filtroLocal).subscribe(
      data => this.productos = data,
      err => {
        console.error(err);
        this.error = true;
        this.show = false;  
      },
      () => {console.log("Productos traidos con éxito"); this.show = false;}
    );
  }      
}

  verMapa(p: Producto){    
    //window.open(p.dirURL, '_blank');


   localStorage.setItem("Direccion",p.direccion);
    localStorage.setItem("Lat",p.lat);
    localStorage.setItem("Lng",p.lng);

    // this.router.navigate(['/mapa']); 
    this.latMap = parseFloat(p.lat);
    this.lngMap = parseFloat(p.lng);
    // this.latMap= -34.7562049;
    // this.lngMap = -58.20878540000001;    
    this.mapaProd = p.nombre;
    document.getElementById("divProductos").style.display = "none";      
    document.getElementById("mapaProducto").style.display = "inline";    

  }

  volverAProductos(){
      document.getElementById("divProductos").style.display = "inline";      
      document.getElementById("mapaProducto").style.display = "none";      
  }

  addCarrito(p: Producto, id){
    this.show = true;  

    this.MostrarReservar();
    document.getElementById("altaReservas").style.display = "inline";
    //this.clienteProducto = localStorage.getItem("usuarioLogueado");
    this.productoSeleccionado = p;
    this.idProductoSeleccionado = id;    
    // console.log(p.id +id);
    this.nombreProducto = p.nombre;
    this.direccionProducto = p.direccion;
    this.tipoProducto = p.tipo;
    // console.log(this.productoSeleccionado);
  }

  TraerReservas() {
    console.log(localStorage.getItem("usuarioLogueado"));
    this.reservaService.getReservasUsuario(localStorage.getItem("usuarioLogueado")).subscribe(
      data => this.reservas = data,
      err => {
        console.error(err);
        this.error = true;
        this.show = false;  
      },
      () => {console.log("Reservas traidos con éxito"); this.show = false;  }
    );
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
    //this.clienteProducto = "";
  }

  GuardarReserva() {
    this.show = true;  
    
    console.log(this.clienteProducto);
    let band;
    band = 0;
    if (((this.idProductoSeleccionado == "") || (this.idProductoSeleccionado == undefined) || (this.idProductoSeleccionado == null)) ||        
        ((this.clienteProducto == "") || (this.clienteProducto == undefined) || (this.clienteProducto == null))) {
        alert("Debe existir un cliente para la reserva y seleccionar un producto en la seccion de productos y ofertas");
        band=1;
        this.show = false;  
    }

    if((((this.fechaDesdeProducto == "") || (this.fechaDesdeProducto == undefined) || (this.fechaDesdeProducto == null)) ||
        ((this.fechaHastaProducto == "") || (this.fechaHastaProducto == undefined) || (this.fechaHastaProducto == null)))
        && (this.tipoProducto == "Alquiler")){
          alert("Si el producto es un alquiler, debe ingresar la fecha desde y hasta");
          band=1;
          this.show = false;  
        }
    
    if (this.tipoProducto == "Venta"){
      this.fechaDesdeProducto = "";
      this.fechaHastaProducto = "";   
      this.show = false;    
    }

    if (((this.fechaDesdeProducto < Date.now() + 30) || (this.fechaDesdeProducto > Date.now() + 60)) 
        && (this.tipoProducto == "Alquiler")){      
        alert("No puede hacer una reserva de alquiler con fecha de inicio menor a 30 dias o mayor a 60 días a partir de hoy");
        band=1;
        this.show = false;          
    }

    if(band==0){
      //if (this.operacion == "Insertar") {
      let objCliente: Reserva = new Reserva(0, this.clienteProducto, Date.now(), this.idProductoSeleccionado, this.tipoProducto, this.fechaDesdeProducto, this.fechaHastaProducto, localStorage.getItem("usuarioLogueado"));
      this.reservaService.GuardarReservaCliente(objCliente).subscribe();

      /*} else if (this.operacion == "Modificar") {
        let objCliente: Cliente = new Cliente(this.idClienteEncargado, this.nombreClienteEncargado, this.mailClienteEncargado, this.telefonoClienteEncargado, this.direccionClienteEncargado, this.usuarioLoginClienteEncargado);
        this.clienteService.putCliente(objCliente).subscribe();
      }*/
      this.TraerReservas();
      this.TraerReservas();      
      this.CancelarReserva();
    }
  }  

  desloguearse()
  {
    this.authService.logOut();
    // this.router.navigate(['/login']);
  }

}
