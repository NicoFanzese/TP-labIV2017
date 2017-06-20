import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Producto } from '../clases/producto.class';
import { LocalProducto } from '../clases/localProducto.class';

@Injectable()
export class ServicioProductosService {
  private ruta: string = "http://nfranzeseutn.hol.es/miAPIRest/index.php/productos/"
  private rutaProducto: string = "http://nfranzeseutn.hol.es/miAPIRest/index.php/producto/"  
  private rutaProductosLocales: string = "http://nfranzeseutn.hol.es/miAPIRest/index.php/productosLocales/"
  private rutaProductoLocales: string = "http://nfranzeseutn.hol.es/miAPIRest/index.php/productoLocales/"
  private rutaProductoLocal: string = "http://nfranzeseutn.hol.es/miAPIRest/index.php/productoLocal/"

  constructor(private http: Http) { }

  getProductos() {
    return this.http.get(this.ruta).map(
      data => data.json());
  }

  getProductosPorLocal(local: string) {
    return this.http.get(this.rutaProductosLocales +"?idLocal="+ local).map(
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
    return this.http.post(`${this.rutaProducto}?nombre=${producto.nombre}&descripcion=${producto.descripcion}&direccion=${producto.direccion}&tipo=${producto.tipo}&vDesde=${producto.vigenciaDesde}&vHasta=${producto.vigenciaHasta}&foto1=${producto.foto1}&foto2=${producto.foto2}&foto3=${producto.foto3}&moneda=${producto.moneda}&precio=${producto.precio}&lat=${producto.lat}&lng=${producto.lng}&dirURL=${producto.dirURL}`,
      { headers: headers}
      ).map(response =>response.json());

  }

  public putProducto(producto: Producto) 
  {    
    //Configuro headers
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    //Llamo al método POST y le paso los datos
    return this.http.put(`${this.rutaProducto}?id=${producto.id}&nombre=${producto.nombre}&descripcion=${producto.descripcion}&direccion=${producto.direccion}&tipo=${producto.tipo}&vDesde=${producto.vigenciaDesde}&vHasta=${producto.vigenciaHasta}&foto1=${producto.foto1}&foto2=${producto.foto2}&foto3=${producto.foto3}&moneda=${producto.moneda}&precio=${producto.precio}&lat=${producto.lat}&lng=${producto.lng}&dirURL=${producto.dirURL}`,

      { headers: headers }
      ).map(response => response.json());

  }

  //DETALLE DE LOCALES
  getDetalleLocalesProducto(idProducto) {
    console.log(this.rutaProductoLocales +"?idProducto="+ idProducto);
      return this.http.get(this.rutaProductoLocales +"?idProducto="+ idProducto).map(
      data => data.json());
  }

  deleteLocalProducto(id: number) {
      return this.http.delete(this.rutaProductoLocal + id).map(
      data => data.json());
  }

  public GuardarLocalProducto(localProducto: LocalProducto) 
  {
    //Configuro headers
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    //Llamo al método POST y le paso los datos   
    return this.http.post(`${this.rutaProductoLocal}?idProducto=${localProducto.idProducto}&idLocal=${localProducto.idLocal}`,
      { headers: headers}
      ).map(response =>response.json());

  }

}
