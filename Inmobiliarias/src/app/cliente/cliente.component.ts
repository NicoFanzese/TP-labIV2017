import { Component, OnInit } from '@angular/core';
import { ServicioProductosService } from '../servicio-productos.service';
import { Producto } from '../../clases/producto.class';
import { ServicioLocalesService } from '../servicio-locales.service';
@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  private productos;
  private locales;

  private mensaje: string;
  private success: boolean = false;
  private error: boolean = false;
  private operacion: string;

  private filtroLocal:string;

  constructor(private productoService: ServicioProductosService,private localService: ServicioLocalesService) { 

        this.TraerProductos();
        this.TraerLocales();
  }

  ngOnInit() {
  }

  MostrarOfertas()
  {
    document.getElementById("OfertasCliente").style.display = "inline";
    document.getElementById("OperacionesAnterioresCliente").style.display = "none";
    document.getElementById("ReservarCliente").style.display = "none";
  }

  MostrarOperacionesAnteriores()
  {
    document.getElementById("OfertasCliente").style.display = "none";
    document.getElementById("OperacionesAnterioresCliente").style.display = "inline";
    document.getElementById("ReservarCliente").style.display = "none";
  }
    MostrarReservar()
  {
    document.getElementById("OfertasCliente").style.display = "none";
    document.getElementById("OperacionesAnterioresCliente").style.display = "none";
    document.getElementById("ReservarCliente").style.display = "inline";
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

}
