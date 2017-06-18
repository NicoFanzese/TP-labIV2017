import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Oferta } from '../clases/oferta.class';
import { ProductoOferta } from '../clases/productoOferta.class';

@Injectable()
export class ServicioOfertaService {


  private ruta: string = "http://nfranzeseutn.hol.es/miAPIRest/index.php/ofertas/"
  private rutaOferta: string = "http://nfranzeseutn.hol.es/miAPIRest/index.php/oferta/"
  private rutaOfertasProductos: string = "http://nfranzeseutn.hol.es/miAPIRest/index.php/ofertasProductos/"
  private rutaOfertaProductos: string = "http://nfranzeseutn.hol.es/miAPIRest/index.php/ofertaProductos/"
  private rutaOfertaProducto: string = "http://nfranzeseutn.hol.es/miAPIRest/index.php/ofertaProducto/"



  constructor(public http: Http) { 
    console.log(http);
  }

  getOfertas() {
    return this.http.get(this.ruta).map(
      data => data.json());
  }

  getOferta(id: number) {
    return this.http.get(this.ruta + id).map(
      data => data.json());
  }

  deleteOferta(id: number) {
      return this.http.delete(this.rutaOferta + id).map(
      data => data.json());
  }

  public GuardarOferta(oferta: Oferta) 
  {
    console.log(oferta);
    //Configuro headers
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    //Llamo al método POST y le paso los datos   
    return this.http.post(`${this.rutaOferta}?nombre=${oferta.nombre}&descripcion=${oferta.descripcion}&foto1=${oferta.moneda}&precio=${oferta.precio}&tipo=${oferta.tipo}`,
      { headers: headers}
      ).map(response =>response.json());

  }

  public putOferta(oferta: Oferta) 
  {    
    //Configuro headers
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    //Llamo al método POST y le paso los datos
    return this.http.put(`${this.rutaOferta}?id=${oferta.id}&nombre=${oferta.nombre}&descripcion=${oferta.descripcion}&moneda=${oferta.moneda}&precio=${oferta.precio}&tipo=${oferta.tipo}`,

      { headers: headers }
      ).map(response => response.json());

  }

  //DETALLE DE PRODUCTOS
  getDetProductoOferta(idOf: number) 
  {
    //console.log(this.rutaOfertaProductos +"?idOferta="+ idOferta);
      return this.http.get(this.rutaOfertaProductos +"?idOferta="+ idOf).map(
      data => data.json());
  }

  deleteProductoOferta(id: number) 
  {
      return this.http.delete(this.rutaOfertaProducto + id).map(
      data => data.json());
  }

  public AddProductoOferta(productoOferta: ProductoOferta) 
  {
    //Configuro headers
    console.log("ingreso a addproductooferta");
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    //Llamo al método POST y le paso los datos   
    return this.http.post(`${this.rutaOfertaProducto}?idOferta=${productoOferta.idOferta}&idProducto=${productoOferta.idProducto}`,
    //return this.http.post("https://restcountries.eu/rest/v1/callingcode/7",
      { headers: headers}
      ).map(response =>response.json());

  }
}
