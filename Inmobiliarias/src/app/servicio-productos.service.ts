import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Producto } from '../clases/producto.class';

@Injectable()
export class ServicioProductosService {
  private ruta: string = "http://nfranzeseutn.hol.es/miAPIRest/index.php/productos/"
  private rutaProducto: string = "http://nfranzeseutn.hol.es/miAPIRest/index.php/producto/"

  constructor(private http: Http) { }

  getProductos() {
    return this.http.get(this.ruta).map(
      data => data.json());
  }

  getProducto(id: number) {
    return this.http.get(this.ruta + id).map(
      data => data.json());
  }

  deleteProducto(id: number) {
      return this.http.delete(this.rutaProducto + id).map(
      data => data.json());
  }

  public GuardarProducto(producto: Producto) 
  {
    console.log(producto);
    //Configuro headers
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    //Llamo al método POST y le paso los datos   
    return this.http.post(`${this.rutaProducto}?nombre=${producto.nombre}&direccion=${producto.direccion}&localidad=${producto.localidad}&provincia=${producto.provincia}&pais=${producto.pais}&descripcion=${producto.descripcion}&foto1=${producto.foto1}&foto2=${producto.foto2}&foto3=${producto.foto3}&moneda=${producto.moneda}&precio=${producto.precio}`,
      { headers: headers}
      ).map(response =>response.json());

  }

  public putProducto(producto: Producto) 
  {    
    //Configuro headers
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    //Llamo al método POST y le paso los datos
    return this.http.put(`${this.rutaProducto}?id=${producto.id}&nombre=${producto.nombre}&direccion=${producto.direccion}&localidad=${producto.localidad}&provincia=${producto.provincia}&pais=${producto.pais}&descripcion=${producto.descripcion}&foto1=${producto.foto1}&foto2=${producto.foto2}&foto3=${producto.foto3}&moneda=${producto.moneda}&precio=${producto.precio}`,

      { headers: headers }
      ).map(response => response.json());

  }
}
