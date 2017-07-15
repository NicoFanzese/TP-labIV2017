import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Usuario } from '../clases/usuario.class';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ServicioUsuariosService {

  private ruta: string = "http://nfranzeseutn.hol.es/miAPIRest/index.php/usuarios/"
  private rutaUsuario: string = "http://nfranzeseutn.hol.es/miAPIRest/index.php/usuario/"

  constructor(private http: Http) { }

  getUsuarios() {
    return this.http.get(this.ruta).map(
      data => data.json());
  }

  getUsuario(id: number) {
    return this.http.get(this.ruta + id).map(
      data => data.json());
  }

  deleteUsuario(id: number) {
      return this.http.delete(this.rutaUsuario + id).map(
      //return this.http.get(rutaDeleteUsuario + id).map(
      // data => data.json());
      data => console.log("exitos"));            
  }

  public GuardarUsuario(usuario: Usuario) 
  {
    console.log(usuario);
    //Configuro headers
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    //Llamo al método POST y le paso los datos
    //return this.http.post(`${this.ruta}?nombre=${usuario.nombre}&password=${usuario.password}&foto=${usuario.foto}&tipo=${usuario.tipo}&estado=${usuario.estado}`,
    //return this.http.post(`${this.rutaUsuario}?nombre=${usuario.nombre}&usuario=${usuario.usuario}&password=${usuario.password}&tipo=${usuario.tipo}`,
    return this.http.post(`${this.rutaUsuario}?nombre=${usuario.nombre}&usuario=${usuario.usuario}&password=${usuario.password}&tipo=${usuario.tipo}&estado=${usuario.estado}`,
    //  return this.http.post(this.ruta,
    //   JSON.stringify(usuario),
      { headers: headers}
      ).map(response => this.getUsuarios());

  }

  public putUsuario(usuario: Usuario) 
  {    
    //Configuro headers
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    //Llamo al método POST y le paso los datos
    return this.http.put(`${this.rutaUsuario}?id=${usuario.id}&nombre=${usuario.nombre}&usuario=${usuario.usuario}&password=${usuario.password}&tipo=${usuario.tipo}&estado=${usuario.estado}`,

    //  return this.http.post(this.ruta,
    //   JSON.stringify(usuario),
      { headers: headers }
      ).map(response => this.getUsuarios());

  }

  /*public cambiarEstadoUsuario(id: number) 
  {
    console.log(this.ruta + "bloq/" + id);

    //Configuro headers
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    //Llamo al método POST y le paso los datos
    return this.http.put(this.ruta + "bloq/" + id,
    //  return this.http.post(this.ruta,
    //   JSON.stringify(usuario),
      { headers: headers }
      ).map(response => response.json());

  }*/

}
