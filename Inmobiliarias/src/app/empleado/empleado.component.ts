import { Component, OnInit } from '@angular/core';
import { ServicioClientesService } from '../servicio-clientes.service';
import { Cliente } from '../../clases/cliente.class';
import { ServicioProductosService } from '../servicio-productos.service';
import { Producto } from '../../clases/producto.class';
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';

const URL = 'http://nfranzeseutn.hol.es/miAPIRest/index.php/uploadFoto';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements OnInit {

  private clientes;
  private idClienteEmpleado: string;
  private nombreClienteEmpleado: string;
  private mailClienteEmpleado: string;
  private telefonoClienteEmpleado: string;
  private direccionClienteEmpleado: string;
  private localidadClienteEmpleado: string;
  private provinciaClienteEmpleado: string;
  private paisClienteEmpleado: string;

  private productos;
  private proxIdF1;
  private proxIdF2;
  private proxIdF3;
  //private contImagen: number = 0;
  private contImagen;  
  private idProductoEmpleado: string;
  private nombreProductoEmpleado: string;
  private direccionProductoEmpleado: string;
  private localidadProductoEmpleado: string;
  private provinciaProductoEmpleado: string;
  private paisProductoEmpleado: string;
  private descripcionProductoEmpleado: string;
  private foto1ProductoEmpleado: string;
  private previsualizacionFoto1: string;
  private foto2ProductoEmpleado: string;
  private foto3ProductoEmpleado: string;
  private monedaProductoEmpleado: string;
  private precioProductoEmpleado: string;
  

  private mensaje: string;
  private success: boolean = false;
  private error: boolean = false;
  private operacion: string;



  public uploader:FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;
 
  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
 
  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }

  constructor(private clienteService: ServicioClientesService, private productoService: ServicioProductosService) 
  { 
    this.contImagen = 1;
    this.TraerClientes();
    this.TraerProductos();

    this.TomarProximoIdF1();
    this.TomarProximoIdF2();
    this.TomarProximoIdF3();

   //************************************************
   //***************FILE UPLOAD**********************
   //************************************************

    //Esto se ejecutará cuando voy a la api.
    this.uploader.onBeforeUploadItem=(item)=>
    {
      //Extraigo el nombre de la imagen, luego la extensión.
      ///console.log((this.TomarUltimoId() + "") + '.' + extension);
      //Le asigno un nuevo nombre a la imagen compuesta por el proximo id de la tabla
      //console.log(item['file']);
      console.log(this.contImagen);
      console.log(item);
            
      if (this.contImagen == 1){       
          /*var nombreFoto =  item['file'].name;
          let extension = nombreFoto.split('.').pop();
          this.foto1ProductoEmpleado = this.proxIdF1 + '.' + extension;
          item['file'].name = this.foto1ProductoEmpleado; */
          console.log("entró 1");     
          this.foto1ProductoEmpleado = item['file'].name;
          this.contImagen = this.contImagen + 1;  
          item.withCredentials = false;   
      }else if (this.contImagen == 2){
        /*var nombreFoto =  item['file'].name;
        let extension = nombreFoto.split('.').pop();
        this.foto2ProductoEmpleado = this.proxIdF2 + '.' + extension;
        item['file'].name = this.foto2ProductoEmpleado;*/
        console.log("entró 2");
        this.foto2ProductoEmpleado = item['file'].name;
        this.contImagen = this.contImagen + 1;  
        item.withCredentials = false;           
      }else if (this.contImagen == 3){
        /*var nombreFoto =  item['file'].name;
        let extension = nombreFoto.split('.').pop();
        this.foto3ProductoEmpleado = this.proxIdF3 + '.' + extension;
        item['file'].name = this.foto3ProductoEmpleado;*/
        console.log("entró 3");
        this.foto3ProductoEmpleado = item['file'].name;        
        this.contImagen = 1;
        item.withCredentials = false;   
      }
    
    }

    //Esto se ejecutará cuando vuelvo de la api.
    this.uploader.onSuccessItem=(response,status)=>
    {
      //console.info("response", response);
      console.info("este es el status", status);
    }
  }

  TomarProximoIdF1()
  {
    this.productoService.getProductos().subscribe(
      //producto => this.proxIdF1 = ((producto[producto.length -1].ID +1) + "-1"),
      producto => this.proxIdF1 = ((producto.ID +1) + "-1"),
      err => console.error(err)

    );
  }
  TomarProximoIdF2()
  {
    this.productoService.getProductos().subscribe(
      //producto => this.proxIdF2 = ((producto[producto.length -1].ID +1) + "-2"),
      producto => this.proxIdF2 = ((producto.ID +1) + "-2"),      
      err => console.error(err)

    );
  }
  TomarProximoIdF3()
  {
    this.productoService.getProductos().subscribe(
      //producto => this.proxIdF3 = ((producto[producto.length -1].ID +1) + "-3"),
      producto => this.proxIdF3 = ((producto.ID +1) + "-3"),
      err => console.error(err)
    );
  }

  ngOnInit() {
  }

  MostrarClientes()
  {
    document.getElementById("ClientesEmpleado").style.display = "inline";
    document.getElementById("ProductosEmpleado").style.display = "none";
    document.getElementById("ReservasEmpleado").style.display = "none";
  }

  MostrarProductos()
  {
    document.getElementById("ClientesEmpleado").style.display = "none";
    document.getElementById("ProductosEmpleado").style.display = "inline";
    document.getElementById("ReservasEmpleado").style.display = "none";
  }
    MostrarOfertas()
  {
    document.getElementById("ClientesEmpleado").style.display = "none";
    document.getElementById("ProductosEmpleado").style.display = "none";
    document.getElementById("ReservasEmpleado").style.display = "none";
  }
    MostrarReservas()
  {
    document.getElementById("ClientesEmpleado").style.display = "none";
    document.getElementById("ProductosEmpleado").style.display = "none";
    document.getElementById("ReservasEmpleado").style.display = "inline";
  }

  //CLIENTES
  TraerClientes() {
    this.clienteService.getClientes().subscribe(
      data => this.clientes = data,
      err => {
        console.error(err);
        this.error = true;
      },
      () => console.log("Clientes traidos con éxito")
    );
  }

  altaCliente() {
    this.operacion = "Insertar";
    document.getElementById("altaClientesEmpleado").style.display = "inline";
  }

  deleteCliente(id: number) {
    this.clienteService.deleteCliente(id).subscribe(
      data => console.info('Id: ${data.id} borrado con éxito'),
      err => console.error(err),
      () => console.info('éxito')
    );
    this.TraerClientes();
  }

  mostrarCliente(id, nom, mail, tel, dir, loc, pro, pais) {
    this.operacion = "Modificar";
    this.idClienteEmpleado = id;
    this.nombreClienteEmpleado = nom;
    this.mailClienteEmpleado = mail;
    this.telefonoClienteEmpleado = tel;
    this.direccionClienteEmpleado = dir;
    this.localidadClienteEmpleado = loc;
    this.provinciaClienteEmpleado = pro;
    this.paisClienteEmpleado = pais;
    document.getElementById("altaClientesEmpleado").style.display = "inline";
  }

  CancelarCliente() {
    document.getElementById("altaClientesEmpleado").style.display = "none";
    this.idClienteEmpleado = "";
    this.nombreClienteEmpleado = "";
    this.mailClienteEmpleado = "";
    this.telefonoClienteEmpleado = "";
    this.direccionClienteEmpleado = "";
    this.localidadClienteEmpleado = "";
    this.provinciaClienteEmpleado = "";
    this.paisClienteEmpleado = "";
  }

  GuardarCliente() {
    if (((this.nombreClienteEmpleado == "") || (this.nombreClienteEmpleado == undefined) || (this.nombreClienteEmpleado == null)) ||
        ((this.mailClienteEmpleado == "") || (this.mailClienteEmpleado == undefined) || (this.mailClienteEmpleado == null))) {
        alert("El nombre del cliente y Mail son obligatorios");
    } else {
      if (this.operacion == "Insertar") {
        let objCliente: Cliente = new Cliente(0, this.nombreClienteEmpleado, this.mailClienteEmpleado, this.telefonoClienteEmpleado, this.direccionClienteEmpleado, this.localidadClienteEmpleado, this.provinciaClienteEmpleado, this.paisClienteEmpleado);

        this.clienteService.GuardarCliente(objCliente).subscribe();

      } else if (this.operacion == "Modificar") {
        let objCliente: Cliente = new Cliente(this.idClienteEmpleado, this.nombreClienteEmpleado, this.mailClienteEmpleado, this.telefonoClienteEmpleado, this.direccionClienteEmpleado, this.localidadClienteEmpleado, this.provinciaClienteEmpleado, this.paisClienteEmpleado);
        this.clienteService.putCliente(objCliente).subscribe();
      }
      this.TraerClientes();
      this.CancelarCliente();
    }

  }

//PRODUCTOS
  TraerProductos() {
    this.productoService.getProductos().subscribe(
      data => this.productos = data,
      err => {
        console.error(err);
        this.error = true;
      },
      () => console.log("Productos traidos con éxito")
    );
  }

  altaProducto() {
    this.operacion = "Insertar";
    document.getElementById("altaProductosEmpleado").style.display = "inline";
  }
  
  deleteProducto(id: number) {
    this.productoService.deleteProducto(id).subscribe(
      data => console.info('Id: ${data.id} borrado con éxito'),
      err => console.error(err),
      () => console.info('éxito')
    );
    this.TraerProductos();
  }

  mostrarProducto(id, nom,dir, loc, pro, pais, des, f1, f2, f3, mon, pre) {
    this.operacion = "Modificar";
    this.idProductoEmpleado = id;
    this.nombreProductoEmpleado = nom;
    this.direccionProductoEmpleado = dir;
    this.localidadProductoEmpleado = loc;
    this.provinciaProductoEmpleado = pro;
    this.paisProductoEmpleado = pais;
    this.descripcionProductoEmpleado = des;
    this.foto1ProductoEmpleado = f1;
    this.foto2ProductoEmpleado = f2;
    this.foto3ProductoEmpleado = f3;
    this.monedaProductoEmpleado = mon;
    this.precioProductoEmpleado = pre;
    document.getElementById("altaProductosEmpleado").style.display = "inline";
  }

  CancelarProducto() {
    document.getElementById("altaProductosEmpleado").style.display = "none";
    this.idProductoEmpleado = "";
    this.nombreProductoEmpleado = "";
    this.direccionProductoEmpleado = "";
    this.localidadProductoEmpleado = "";
    this.provinciaProductoEmpleado = "";
    this.paisProductoEmpleado = "";
    this.descripcionProductoEmpleado = "";
    this.foto1ProductoEmpleado = "";
    this.foto2ProductoEmpleado = "";
    this.foto3ProductoEmpleado = "";
    this.monedaProductoEmpleado = "";
    this.precioProductoEmpleado = "";
  }

  GuardarProducto() {
    if (((this.nombreProductoEmpleado == "") || (this.nombreProductoEmpleado == undefined) || (this.nombreProductoEmpleado == null)) ||
    ((this.direccionProductoEmpleado == "") || (this.direccionProductoEmpleado == undefined) || (this.direccionProductoEmpleado == null)) ||
    ((this.localidadProductoEmpleado == "") || (this.localidadProductoEmpleado == undefined) || (this.localidadProductoEmpleado == null)) ||
    ((this.provinciaProductoEmpleado == "") || (this.provinciaProductoEmpleado == undefined) || (this.provinciaProductoEmpleado == null)) ||
    ((this.paisProductoEmpleado == "") || (this.paisProductoEmpleado == undefined) || (this.paisProductoEmpleado == null))) {
        alert("El nombre del producto, direccion, localidad, provincia y país son obligatorios");
    } else {
      //Guardo la imagen
      this.contImagen = 1;
      this.uploader.uploadAll();
      
      if (this.operacion == "Insertar") {
        console.log("inicia insertado");
        let objProducto: Producto = new Producto(0, this.nombreProductoEmpleado, this.direccionProductoEmpleado, this.localidadProductoEmpleado, this.provinciaProductoEmpleado, this.paisProductoEmpleado, this.descripcionProductoEmpleado, this.foto1ProductoEmpleado, this.foto2ProductoEmpleado, this.foto3ProductoEmpleado, this.monedaProductoEmpleado, this.precioProductoEmpleado);
        this.productoService.GuardarProducto(objProducto).subscribe();
        this.TraerProductos();
        this.CancelarProducto();
      } else if (this.operacion == "Modificar") {
        console.log("inicia insertado");
        let objProducto: Producto = new Producto(this.idProductoEmpleado, this.nombreProductoEmpleado, this.direccionProductoEmpleado, this.localidadProductoEmpleado, this.provinciaProductoEmpleado, this.paisProductoEmpleado, this.descripcionProductoEmpleado, this.foto1ProductoEmpleado, this.foto2ProductoEmpleado, this.foto3ProductoEmpleado, this.monedaProductoEmpleado, this.precioProductoEmpleado);
        this.productoService.putProducto(objProducto).subscribe();
        this.TraerProductos();
        this.CancelarProducto();
      }
    }
    //this.contImagen = 1;
  }
}
