import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Empleado } from '../clases/empleado.class';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ServicioEmpleadosService {

  private ruta: string = "http://nfranzeseutn.hol.es/miAPIRest/index.php/empleados/"
  private rutaEmpleado: string = "http://nfranzeseutn.hol.es/miAPIRest/index.php/empleado/"
  private rutaUsuariosEmpleados: string = "http://nfranzeseutn.hol.es/miAPIRest/index.php/empleadosUsuarios/"
 
  constructor(private http: Http) { }

  getEmpleados() {
    return this.http.get(this.ruta).map(
      data => data.json());
      //data => console.log("exitos"));   
  }


  getUsuariosEmpleados() {
    return this.http.get(this.rutaUsuariosEmpleados).map(
      data => data.json());
  }

  getEmpleado(id: number) {
    return this.http.get(this.ruta + id).map(
      data => data.json());
  }

  deleteEmpleado(id: number) {
      // return this.http.delete(this.rutaEmpleado + id).map(
      // data => data.json());
       return this.http.delete(this.rutaEmpleado + id).map(
      data => console.log("exitos"));      
  }

  public GuardarEmpleado(empleado: Empleado) 
  {
    console.log(empleado);
    //Configuro headers
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    //Llamo al método POST y le paso los datos
    //return this.http.post(`${this.ruta}?nombre=${usuario.nombre}&password=${usuario.password}&foto=${usuario.foto}&tipo=${usuario.tipo}&estado=${usuario.estado}`,
    //return this.http.post(`${this.rutaUsuario}?nombre=${usuario.nombre}&usuario=${usuario.usuario}&password=${usuario.password}&tipo=${usuario.tipo}`,
    return this.http.post(`${this.rutaEmpleado}?nombre=${empleado.nombre}&direccion=${empleado.direccion}&idUsuario=${empleado.idUsuario}`,
    //  return this.http.post(this.ruta,
    //   JSON.stringify(usuario),
      { headers: headers}
      ).map(response =>this.getEmpleados());

  }

  public putEmpleado(empleado: Empleado) 
  {    
    //Configuro headers
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    //Llamo al método POST y le paso los datos
    return this.http.put(`${this.rutaEmpleado}?id=${empleado.id}&nombre=${empleado.nombre}&direccion=${empleado.direccion}&idUsuario=${empleado.idUsuario}`,

    //  return this.http.post(this.ruta,
    //   JSON.stringify(usuario),
      { headers: headers }
      ).map(response => this.getEmpleados());

  }
}
