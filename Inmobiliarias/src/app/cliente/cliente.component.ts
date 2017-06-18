import { Component, OnInit } from '@angular/core';
import { ServicioProductosService } from '../servicio-productos.service';
import { Producto } from '../../clases/producto.class';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  private productos;

  private mensaje: string;
  private success: boolean = false;
  private error: boolean = false;
  private operacion: string;

  constructor(private productoService: ServicioProductosService) { 

        this.TraerProductos();
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


  verMapa(p: Producto){
    //window.open(fileURL, "_self");
    window.open(p.dirURL, '_blank');

    console.log(p);
    localStorage.setItem("Direccion",p.direccion);
    localStorage.setItem("Lat",p.lat);
    localStorage.setItem("Lng",p.lng);

  }

}
