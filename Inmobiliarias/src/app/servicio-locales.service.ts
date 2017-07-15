import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Local } from '../clases/local.class';
import { EmpleadoLocal } from '../clases/empleadoLocal.class';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class ServicioLocalesService {

  private ruta: string = "http://nfranzeseutn.hol.es/miAPIRest/index.php/locales/"
  private rutaLocal: string = "http://nfranzeseutn.hol.es/miAPIRest/index.php/local/" 
  private rutaUsuariosEncargados: string = "http://nfranzeseutn.hol.es/miAPIRest/index.php/encargadosUsuarios/"
  private rutaLocalEmpleados: string = "http://nfranzeseutn.hol.es/miAPIRest/index.php/localEmpleados/"
  private rutaLocalEmpleado: string = "http://nfranzeseutn.hol.es/miAPIRest/index.php/localEmpleado/"


  constructor(private http: Http) { }

  getLocales() {
    return this.http.get(this.ruta).map(
      data => data.json());
  }

  getUsuariosEncargados() {
    return this.http.get(this.rutaUsuariosEncargados).map(
      data => data.json());
  }

  getLocal(id: number) {
    return this.http.get(this.ruta + id).map(
      data => data.json());
  }

  deleteLocal(id: number) {
      return this.http.delete(this.rutaLocal + id).map(
      // data => data.json());
      data => console.log("exitos"));            
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
    return this.http.post(`${this.rutaLocal}?nombre=${local.nombre}&direccion=${local.direccion}&idEncargado=${local.idEncargado}&foto1=${local.foto1}&foto2=${local.foto2}&foto3=${local.foto3}`,
    //  return this.http.post(this.ruta,
    //   JSON.stringify(usuario),
      { headers: headers}
      ).map(response =>this.getLocales());

  }

  public putLocal(local: Local) 
  {    
    //Configuro headers
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    //Llamo al método POST y le paso los datos
    return this.http.put(`${this.rutaLocal}?id=${local.id}&nombre=${local.nombre}&direccion=${local.direccion}&idEncargado=${local.idEncargado}&foto1=${local.foto1}&foto2=${local.foto2}&foto3=${local.foto3}`,

    //  return this.http.post(this.ruta,
    //   JSON.stringify(usuario),
      { headers: headers }
      ).map(response => this.getLocales());

  }

  //DETALLE EMPLEADOS
  getDetalleEmpleadosLocales(idLocal) {
    console.log(this.rutaLocalEmpleados +"?idLocal="+ idLocal);
      return this.http.get(this.rutaLocalEmpleados +"?idLocal="+ idLocal).map(
      data => data.json());
  }

  deleteEmpleadoLocal(id: number) {
      return this.http.delete(this.rutaLocalEmpleado + id).map(
      data => data.json());
  }

  public GuardarEmpleadoLocal(empleadoLocal: EmpleadoLocal) 
  {
    //Configuro headers
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    //Llamo al método POST y le paso los datos   
    return this.http.post(`${this.rutaLocalEmpleado}?idLocal=${empleadoLocal.idLocal}&idEmpleado=${empleadoLocal.idEmpleado}`,
      { headers: headers}
      ).map(response =>this.getDetalleEmpleadosLocales(empleadoLocal.idLocal));

  }

}
