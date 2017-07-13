import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ServicioEstadisticasService {

  private rutaG1: string = "http://nfranzeseutn.hol.es/miAPIRest/index.php/grafico1/"

  constructor(private http: Http) { }

  getGrafico1(local) {
    return this.http.get(this.rutaG1 + local).map(
      data => data.json());
  }

}
