import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Local } from '../clases/local.class';

@Injectable()
export class ServicioLocalesService {

  private ruta: string = "http://nfranzeseutn.hol.es/miAPIRest/index.php/locales/"
  private rutaLocal: string = "http://nfranzeseutn.hol.es/miAPIRest/index.php/local/"

  constructor(private http: Http) { }

  getLocales() {
    return this.http.get(this.ruta).map(
      data => data.json());
  }

  getLocal(id: number) {
    return this.http.get(this.ruta + id).map(
      data => data.json());
  }

  deleteLocal(id: number) {
      return this.http.delete(this.rutaLocal + id).map(
      //return this.http.get(rutaDeleteUsuario + id).map(
      data => data.json());
  }

  public GuardarLocal(local: Local) 
  {
    console.log(local);
    //Configuro headers
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    //Llamo al método POST y le paso los datos
    //return this.http.post(`${this.ruta}?nombre=${usuario.nombre}&password=${usuario.password}&foto=${usuario.foto}&tipo=${usuario.tipo}&estado=${usuario.estado}`,
    //return this.http.post(`${this.rutaUsuario}?nombre=${usuario.nombre}&usuario=${usuario.usuario}&password=${usuario.password}&tipo=${usuario.tipo}`,
    return this.http.post(`${this.rutaLocal}?nombre=${local.nombre}&direccion=${local.direccion}&localidad=${local.localidad}&provincia=${local.provincia}&pais=${local.pais}`,
    //  return this.http.post(this.ruta,
    //   JSON.stringify(usuario),
      { headers: headers}
      ).map(response =>response.json());

  }

  public putLocal(local: Local) 
  {    
    //Configuro headers
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    //Llamo al método POST y le paso los datos
    return this.http.put(`${this.rutaLocal}?id=${local.id}&nombre=${local.nombre}&direccion=${local.direccion}&localidad=${local.localidad}&provincia=${local.provincia}&pais=${local.pais}`,

    //  return this.http.post(this.ruta,
    //   JSON.stringify(usuario),
      { headers: headers }
      ).map(response => response.json());

  }

}
