import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ServicioLoginService {  
  public ruta: string = "http://nfranzeseutn.hol.es/miAPIRest/index.php/existeUsuario/"

  constructor(private http: Http) { }

  getLogin(usu, pass) {
    //console.log(this.ruta + "?usuario="+ usu + "&password="+ pass);
    return this.http.get(this.ruta + "?usuario="+ usu + "&password="+ pass).map(
      data => data.json());     
      //data => this.data);    
    
  }
}
