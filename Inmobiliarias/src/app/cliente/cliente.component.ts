import { Component, OnInit } from '@angular/core';
import { ServicioProductosService } from '../servicio-productos.service';
import { Producto } from '../../clases/producto.class';
import { Reserva } from '../../clases/reserva.class';
import { ServicioLocalesService } from '../servicio-locales.service';
import { ServicioReservasService } from '../servicio-reservas.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
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

  public reservas;

  public mensaje: string;
  public success: boolean = false;
  public error: boolean = false;
  public operacion: string;

  public filtroLocal:string;

  constructor(private productoService: ServicioProductosService,
              private localService: ServicioLocalesService,
              private reservaService: ServicioReservasService) { 

        this.TraerProductos();
        this.TraerLocales();
        this.TraerReservas()        
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
      },
      () => console.log("Productos traidos con éxito")
    );

      console.info(this.productos);
  }

cambiarFiltro(){
  console.log(this.filtroLocal);
  if(this.filtroLocal == "todas"){
    this.TraerProductos();
  }else{
    this.productoService.getProductosPorLocal(this.filtroLocal).subscribe(
      data => this.productos = data,
      err => {
        console.error(err);
        this.error = true;
      },
      () => console.log("Productos traidos con éxito")
    );
  }      
}

  verMapa(p: Producto){
    //window.open(fileURL, "_self");
    window.open(p.dirURL, '_blank');

    console.log(p);
    localStorage.setItem("Direccion",p.direccion);
    localStorage.setItem("Lat",p.lat);
    localStorage.setItem("Lng",p.lng);

  }


  addCarrito(p: Producto, id){
    this.MostrarReservar();
    document.getElementById("altaReservas").style.display = "inline";
    this.clienteProducto = "Generico";
    this.productoSeleccionado = p;
    this.idProductoSeleccionado = id;    
    console.log(p.id +id);
    this.nombreProducto = p.nombre;
    this.direccionProducto = p.direccion;
    this.tipoProducto = p.tipo;
    console.log(this.productoSeleccionado);
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
/*altaReserva() {
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
  }*/

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
}
