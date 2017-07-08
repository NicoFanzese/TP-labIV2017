import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Reserva } from '../clases/reserva.class';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';



@Injectable()
export class ServicioReservasService {


  private ruta: string = "http://nfranzeseutn.hol.es/miAPIRest/index.php/reservas/"
  private rutaResUsu: string = "http://nfranzeseutn.hol.es/miAPIRest/index.php/reservasUsuario/"
  private rutaReserva: string = "http://nfranzeseutn.hol.es/miAPIRest/index.php/reserva/"
  private rutaReservaCliente: string = "http://nfranzeseutn.hol.es/miAPIRest/index.php/reservaCliente/"
  
  constructor(public http: Http) { 
  }

  getReservas() {
    return this.http.get(this.ruta).map(
      data => data.json());
  }

  getReserva(id: number) {
    return this.http.get(this.ruta + id).map(
      data => data.json());
  }
  getReservasUsuario(usu: string) {
    return this.http.get(this.rutaResUsu + "?usuarioLogueado="+ usu).map(
      data => data.json());
  }  

  deleteReserva(id: number) {
      return this.http.delete(this.rutaReserva + id).map(
      data => data.json());
  }

  public GuardarReserva(reserva: Reserva) 
  {
    //console.log(reserva);
    //Configuro headers
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    //Llamo al método POST y le paso los datos   
    return this.http.post(`${this.rutaReserva}?idCliente=${reserva.idCliente}&fecha=${reserva.fecha}&idProducto=${reserva.idProducto}&tipoProducto=${reserva.tipoProducto}&fechaDesde=${reserva.fechaDesde}&fechaHasta=${reserva.fechaHasta}&usuarioLogueado=${reserva.usuarioLogueado}`,
      { headers: headers}
      ).map(response =>response.json());

  }
  public GuardarReservaCliente(reserva: Reserva) 
  {
    //console.log(reserva);
    //Configuro headers
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    //Llamo al método POST y le paso los datos   
    return this.http.post(`${this.rutaReservaCliente}?idCliente=${reserva.idCliente}&fecha=${reserva.fecha}&idProducto=${reserva.idProducto}&tipoProducto=${reserva.tipoProducto}&fechaDesde=${reserva.fechaDesde}&fechaHasta=${reserva.fechaHasta}&usuarioLogueado=${reserva.usuarioLogueado}`,
      { headers: headers}
      ).map(response =>response.json());

  }
  public putReserva(reserva: Reserva) 
  {    
    //Configuro headers
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    //Llamo al método POST y le paso los datos
    return this.http.put(`${this.rutaReservaCliente}?id=${reserva.id}&idCliente=${reserva.idCliente}&fecha=${reserva.fecha}&idProducto=${reserva.idProducto}&tipoProducto=${reserva.tipoProducto}&fechaDesde=${reserva.fechaDesde},&fechaHasta=${reserva.fechaHasta}&usuarioLogueado=${reserva.usuarioLogueado}`,

      { headers: headers }
      ).map(response => response.json());

  }
}
