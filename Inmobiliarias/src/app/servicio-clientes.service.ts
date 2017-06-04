import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Cliente } from '../clases/cliente.class';

@Injectable()
export class ServicioClientesService {
  private ruta: string = "http://nfranzeseutn.hol.es/miAPIRest/index.php/clientes/"
  private rutaCliente: string = "http://nfranzeseutn.hol.es/miAPIRest/index.php/cliente/"

  constructor(private http: Http) { }

  getClientes() {
    return this.http.get(this.ruta).map(
      data => data.json());
  }

  getCliente(id: number) {
    return this.http.get(this.ruta + id).map(
      data => data.json());
  }

  deleteCliente(id: number) {
      return this.http.delete(this.rutaCliente + id).map(
      data => data.json());
  }

  public GuardarCliente(cliente: Cliente) 
  {
    console.log(cliente);
    //Configuro headers
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    //Llamo al método POST y le paso los datos   
    return this.http.post(`${this.rutaCliente}?nombre=${cliente.nombre}&mail=${cliente.mail}&telefono=${cliente.telefono}&direccion=${cliente.direccion}&localidad=${cliente.localidad}&provincia=${cliente.provincia}&pais=${cliente.pais}`,
      { headers: headers}
      ).map(response =>response.json());

  }

  public putCliente(cliente: Cliente) 
  {    
    //Configuro headers
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    //Llamo al método POST y le paso los datos
    return this.http.put(`${this.rutaCliente}?id=${cliente.id}&nombre=${cliente.nombre}&mail=${cliente.mail}&telefono=${cliente.telefono}&direccion=${cliente.direccion}&localidad=${cliente.localidad}&provincia=${cliente.provincia}&pais=${cliente.pais}`,

      { headers: headers }
      ).map(response => response.json());

  }
}
