import { Component, OnInit } from '@angular/core';
import { ServicioClientesService } from '../servicio-clientes.service';
import { Cliente } from '../../clases/cliente.class';
import { ServicioProductosService } from '../servicio-productos.service';
import { Producto } from '../../clases/producto.class';
import { ServicioLocalesService } from '../servicio-locales.service';
import { Local } from '../../clases/local.class';
import { ServicioUsuariosService } from '../servicio-usuarios.service';
import { Usuario } from '../../clases/usuario.class';
import { ServicioEmpleadosService } from '../servicio-empleados.service';
import { Empleado } from '../../clases/empleado.class';

@Component({
  selector: 'app-encargado',
  templateUrl: './encargado.component.html',
  styleUrls: ['./encargado.component.css']
})
export class EncargadoComponent implements OnInit {

  private clientes;
  private idClienteEncargado: string;
  private nombreClienteEncargado: string;
  private mailClienteEncargado: string;
  private telefonoClienteEncargado: string;
  private direccionClienteEncargado: string;
  private localidadClienteEncargado: string;
  private provinciaClienteEncargado: string;
  private paisClienteEncargado: string;

  private productos;
  private idProductoEncargado: string;
  private nombreProductoEncargado: string;
  private direccionProductoEncargado: string;
  private localidadProductoEncargado: string;
  private provinciaProductoEncargado: string;
  private paisProductoEncargado: string;
  private descripcionProductoEncargado: string;
  private foto1ProductoEncargado: string;
  private foto2ProductoEncargado: string;
  private foto3ProductoEncargado: string;
  private monedaProductoEncargado: string;
  private precioProductoEncargado: string;

  private locales;
  private idLocalEncargado: any;
  private nombreLocalEncargado: any;
  private direccionLocalEncargado: any;
  private localidadLocalEncargado: any;
  private provinciaLocalEncargado: any;
  private paisLocalEncargado: any;

  private usuarios;
  private nombreUsuarioEncargado: string;
  private usuarioUsuarioEncargado: string;
  private passwordUsuarioEncargado: string;
  private tipoUsuarioEncargado: any;
  private idUsuarioEncargado: any;
  private estadoUsuarioEncargado: any;

  private empleados;
  private idEmpleadoEncargado: any;
  private nombreEmpleadoEncargado: any;
  private direccionEmpleadoEncargado: any;
  private localidadEmpleadoEncargado: any;
  private provinciaEmpleadoEncargado: any;
  private paisEmpleadoEncargado: any;
  private idUsuarioEmpleadoEncargado: any;

  private mensaje: string;
  private success: boolean = false;
  private error: boolean = false;
  private operacion: string;

  constructor(private clienteService: ServicioClientesService, private productoService: ServicioProductosService, private localService: ServicioLocalesService,private usuarioService: ServicioUsuariosService,private empleadoService: ServicioEmpleadosService) { 
    this.TraerClientes();
    this.TraerProductos();
    this.TraerLocales();
    this.TraerUsuarios();
    this.TraerEmpleados();
  }

  ngOnInit() {
  }

  MostrarClientes()
  {
    document.getElementById("ClientesEncargado").style.display = "inline";
    document.getElementById("ProductosEncargado").style.display = "none";
    //document.getElementById("ReservasEncargado").style.display = "none";
    document.getElementById("LocalesEncargado").style.display = "none";
    document.getElementById("UsuariosEncargado").style.display = "none";
    document.getElementById("EmpleadosEncargado").style.display = "none";
  }

  MostrarProductos()
  {
    document.getElementById("ClientesEncargado").style.display = "none";
    document.getElementById("ProductosEncargado").style.display = "inline";
    //document.getElementById("ReservasEncargado").style.display = "none";
    document.getElementById("LocalesEncargado").style.display = "none";
    document.getElementById("UsuariosEncargado").style.display = "none";
    document.getElementById("EmpleadosEncargado").style.display = "none";
  }
    MostrarOfertas()
  {
    document.getElementById("ClientesEncargado").style.display = "none";
    document.getElementById("ProductosEncargado").style.display = "none";
    //document.getElementById("ReservasEncargado").style.display = "none";
    document.getElementById("LocalesEncargado").style.display = "none";
    document.getElementById("UsuariosEncargado").style.display = "none";
    document.getElementById("EmpleadosEncargado").style.display = "none";
  }
    MostrarReservas()
  {
    document.getElementById("ClientesEncargado").style.display = "none";
    document.getElementById("ProductosEncargado").style.display = "none";
    //document.getElementById("ReservasEncargado").style.display = "inline";
    document.getElementById("LocalesEncargado").style.display = "none";
    document.getElementById("UsuariosEncargado").style.display = "none";
    document.getElementById("EmpleadosEncargado").style.display = "none";
  }

  MostrarLocales() {
    document.getElementById("ClientesEncargado").style.display = "none";
    document.getElementById("ProductosEncargado").style.display = "none";
    //document.getElementById("ReservasEncargado").style.display = "none";
    document.getElementById("LocalesEncargado").style.display = "inline";
    document.getElementById("UsuariosEncargado").style.display = "none";
    document.getElementById("EmpleadosEncargado").style.display = "none";
  }

  MostrarUsuarios() {
    document.getElementById("ClientesEncargado").style.display = "none";
    document.getElementById("ProductosEncargado").style.display = "none";
    //document.getElementById("ReservasEncargado").style.display = "none";
    document.getElementById("LocalesEncargado").style.display = "none";
    document.getElementById("UsuariosEncargado").style.display = "inline";
    document.getElementById("EmpleadosEncargado").style.display = "none";
  }  

  MostrarEmpleados() {
    document.getElementById("ClientesEncargado").style.display = "none";
    document.getElementById("ProductosEncargado").style.display = "none";
    //document.getElementById("ReservasEncargado").style.display = "none";
    document.getElementById("LocalesEncargado").style.display = "none";
    document.getElementById("UsuariosEncargado").style.display = "none";
    document.getElementById("EmpleadosEncargado").style.display = "inline";
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
    document.getElementById("altaClientesEncargado").style.display = "inline";
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
    this.idClienteEncargado = id;
    this.nombreClienteEncargado = nom;
    this.mailClienteEncargado = mail;
    this.telefonoClienteEncargado = tel;
    this.direccionClienteEncargado = dir;
    this.localidadClienteEncargado = loc;
    this.provinciaClienteEncargado = pro;
    this.paisClienteEncargado = pais;
    document.getElementById("altaClientesEncargado").style.display = "inline";
  }

  CancelarCliente() {
    document.getElementById("altaClientesEncargado").style.display = "none";
    this.idClienteEncargado = "";
    this.nombreClienteEncargado = "";
    this.mailClienteEncargado = "";
    this.telefonoClienteEncargado = "";
    this.direccionClienteEncargado = "";
    this.localidadClienteEncargado = "";
    this.provinciaClienteEncargado = "";
    this.paisClienteEncargado = "";
  }

  GuardarCliente() {
    if (((this.nombreClienteEncargado == "") || (this.nombreClienteEncargado == undefined) || (this.nombreClienteEncargado == null)) ||
        ((this.mailClienteEncargado == "") || (this.mailClienteEncargado == undefined) || (this.mailClienteEncargado == null))) {
        alert("El nombre del cliente y Mail son obligatorios");
    } else {
      if (this.operacion == "Insertar") {
        let objCliente: Cliente = new Cliente(0, this.nombreClienteEncargado, this.mailClienteEncargado, this.telefonoClienteEncargado, this.direccionClienteEncargado, this.localidadClienteEncargado, this.provinciaClienteEncargado, this.paisClienteEncargado);

        this.clienteService.GuardarCliente(objCliente).subscribe();

      } else if (this.operacion == "Modificar") {
        let objCliente: Cliente = new Cliente(this.idClienteEncargado, this.nombreClienteEncargado, this.mailClienteEncargado, this.telefonoClienteEncargado, this.direccionClienteEncargado, this.localidadClienteEncargado, this.provinciaClienteEncargado, this.paisClienteEncargado);
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
    document.getElementById("altaProductosEncargado").style.display = "inline";
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
    this.idProductoEncargado = id;
    this.nombreProductoEncargado = nom;
    this.direccionProductoEncargado = dir;
    this.localidadProductoEncargado = loc;
    this.provinciaProductoEncargado = pro;
    this.paisProductoEncargado = pais;
    this.descripcionProductoEncargado = des;
    this.foto1ProductoEncargado = f1;
    this.foto2ProductoEncargado = f2;
    this.foto3ProductoEncargado = f3;
    this.monedaProductoEncargado = mon;
    this.precioProductoEncargado = pre;
    document.getElementById("altaProductosEncargado").style.display = "inline";
  }

  CancelarProducto() {
    document.getElementById("altaProductosEncargado").style.display = "none";
    this.idProductoEncargado = "";
    this.nombreProductoEncargado = "";
    this.direccionProductoEncargado = "";
    this.localidadProductoEncargado = "";
    this.provinciaProductoEncargado = "";
    this.paisProductoEncargado = "";
    this.descripcionProductoEncargado = "";
    this.foto1ProductoEncargado = "";
    this.foto2ProductoEncargado = "";
    this.foto3ProductoEncargado = "";
    this.monedaProductoEncargado = "";
    this.precioProductoEncargado = "";
  }

  GuardarProducto() {
    if (((this.nombreProductoEncargado == "") || (this.nombreProductoEncargado == undefined) || (this.nombreProductoEncargado == null)) ||
    ((this.direccionProductoEncargado == "") || (this.direccionProductoEncargado == undefined) || (this.direccionProductoEncargado == null)) ||
    ((this.localidadProductoEncargado == "") || (this.localidadProductoEncargado == undefined) || (this.localidadProductoEncargado == null)) ||
    ((this.provinciaProductoEncargado == "") || (this.provinciaProductoEncargado == undefined) || (this.provinciaProductoEncargado == null)) ||
    ((this.paisProductoEncargado == "") || (this.paisProductoEncargado == undefined) || (this.paisProductoEncargado == null))) {
        alert("El nombre del producto, direccion, localidad, provincia y país son obligatorios");
    } else {
      if (this.operacion == "Insertar") {
        let objProducto: Producto = new Producto(0, this.nombreProductoEncargado, this.direccionProductoEncargado, this.localidadProductoEncargado, this.provinciaProductoEncargado, this.paisProductoEncargado, this.descripcionProductoEncargado, this.foto1ProductoEncargado, this.foto2ProductoEncargado, this.foto3ProductoEncargado, this.monedaProductoEncargado, this.precioProductoEncargado);

        this.productoService.GuardarProducto(objProducto).subscribe();

      } else if (this.operacion == "Modificar") {
        let objProducto: Producto = new Producto(this.idProductoEncargado, this.nombreProductoEncargado, this.direccionProductoEncargado, this.localidadProductoEncargado, this.provinciaProductoEncargado, this.paisProductoEncargado, this.descripcionProductoEncargado, this.foto1ProductoEncargado, this.foto2ProductoEncargado, this.foto3ProductoEncargado, this.monedaProductoEncargado, this.precioProductoEncargado);
        this.productoService.putProducto(objProducto).subscribe();
      }
      this.TraerProductos();
      this.CancelarProducto();
    }

  }

  //LOCALES
  TraerLocales() {
    this.localService.getLocales().subscribe(
      data => this.locales = data,
      err => {
        console.error(err);
        this.error = true;
      },
      () => console.log("Locales traidos con éxito")
    );
  }

  mostrarLocal(id, nom, dir, loc, pro, pais) {
    this.operacion = "Modificar";
    this.idLocalEncargado = id;
    this.nombreLocalEncargado = nom;
    this.direccionLocalEncargado = dir;
    this.localidadLocalEncargado = loc;
    this.provinciaLocalEncargado = pro;
    this.paisLocalEncargado = pais;
    
    document.getElementById("altaLocalesEncargado").style.display = "inline";
  }

  CancelarLocal() {
    document.getElementById("altaLocalesEncargado").style.display = "none";
    this.idLocalEncargado = "";
    this.nombreLocalEncargado = "";
    this.direccionLocalEncargado = "";
    this.localidadLocalEncargado = "";
    this.provinciaLocalEncargado = "";
    this.paisLocalEncargado = "";
  }

  GuardarLocal() {
    if (((this.nombreLocalEncargado == "") || (this.nombreLocalEncargado == undefined) || (this.nombreLocalEncargado == null)) ||
      ((this.direccionLocalEncargado == "") || (this.direccionLocalEncargado == undefined) || (this.direccionLocalEncargado == null)) ||
      ((this.localidadLocalEncargado == "") || (this.localidadLocalEncargado == undefined) || (this.localidadLocalEncargado == null)) ||
      ((this.provinciaLocalEncargado == "") || (this.provinciaLocalEncargado == undefined) || (this.provinciaLocalEncargado == null)) ||
      ((this.paisLocalEncargado == "") || (this.paisLocalEncargado == undefined) || (this.paisLocalEncargado == null))) {
        alert("Los Datos en pantalla son obligatorios");
    } else {
      if (this.operacion == "Insertar") {
        alert("Usted no tiene los permisos para poder insertar Locales")
      } else if (this.operacion == "Modificar") {
        let objLocal: Local = new Local(this.idLocalEncargado, this.nombreLocalEncargado, this.direccionLocalEncargado, this.localidadLocalEncargado, this.provinciaLocalEncargado, this.paisLocalEncargado);
        this.localService.putLocal(objLocal).subscribe();
      }
      this.TraerLocales();
      this.CancelarLocal();
    }

  }

  //USUARIOS
  TraerUsuarios() {
    this.usuarioService.getUsuarios().subscribe(
      data => this.usuarios = data,
      err => {
        console.error(err);
        this.error = true;
      },
      () => console.log("Usuarios traidos con éxito")
    );
  }

  deleteUsuario(id: number) {
    this.usuarioService.deleteUsuario(id).subscribe(
      data => console.info('Id: ${data.id} borrado con éxito'),
      err => console.error(err),
      () => console.info('éxito')
    );
    this.TraerUsuarios();
  }

  mostrarUsuario(id, nom, usu, pass, tipo,est) {
    this.operacion = "Modificar";
    this.idUsuarioEncargado = id;
    this.nombreUsuarioEncargado = nom;
    this.usuarioUsuarioEncargado = usu;
    this.passwordUsuarioEncargado = pass;
    this.tipoUsuarioEncargado = tipo;
    console.log(est);
    if((est == "true") || (est == 1)){
      this.estadoUsuarioEncargado = 1;
    }else{
      this.estadoUsuarioEncargado = 0;
    }
    

    
    console.log("el estado es: " + this.estadoUsuarioEncargado);
    document.getElementById("altaUsuariosEncargado").style.display = "inline";
  }

  CancelarUsuario() {
    document.getElementById("altaUsuariosEncargado").style.display = "none";
    this.nombreUsuarioEncargado = "";
    this.usuarioUsuarioEncargado = "";
    this.passwordUsuarioEncargado = "";
    this.tipoUsuarioEncargado = "";
    this.estadoUsuarioEncargado = false;
  }

  GuardarUsuario() {
    console.log(this.estadoUsuarioEncargado);
    if (((this.nombreUsuarioEncargado == "") || (this.nombreUsuarioEncargado == undefined) || (this.nombreUsuarioEncargado == null)) ||
      ((this.usuarioUsuarioEncargado == "") || (this.usuarioUsuarioEncargado == undefined) || (this.usuarioUsuarioEncargado == null)) ||
      ((this.passwordUsuarioEncargado == "") || (this.passwordUsuarioEncargado == undefined) || (this.passwordUsuarioEncargado == null)) ||
      ((this.tipoUsuarioEncargado == "") || (this.tipoUsuarioEncargado == undefined) || (this.tipoUsuarioEncargado == null))) {
        alert("Los Datos en pantalla son obligatorios");
    } else {
      if (this.operacion == "Insertar") {
        alert("No posee los permisos para insertar un nuevo usuario")
      } else if (this.operacion == "Modificar") {
        if((this.estadoUsuarioEncargado == "true") || (this.estadoUsuarioEncargado == 1)){
          this.estadoUsuarioEncargado = 1;
        }else{
          this.estadoUsuarioEncargado = 0;
        }

        let objUsuario: Usuario = new Usuario(this.idUsuarioEncargado, this.nombreUsuarioEncargado, this.usuarioUsuarioEncargado, this.passwordUsuarioEncargado, this.tipoUsuarioEncargado, this.estadoUsuarioEncargado);
        this.usuarioService.putUsuario(objUsuario).subscribe();
      }
      this.TraerUsuarios();
      this.CancelarUsuario();
    }

  }

//EMPLEADOS

  altaEmpleado() {
    this.operacion = "Insertar";
    document.getElementById("altaEmpleadosEncargado").style.display = "inline";
  }

  TraerEmpleados() {
    this.empleadoService.getEmpleados().subscribe(
      data => this.empleados = data,
      err => {
        console.error(err);
        this.error = true;
      },
      () => console.log("Empleados traidos con éxito")
    );
  }

  deleteEmpleado(id: number) {
    this.empleadoService.deleteEmpleado(id).subscribe(
      data => console.info('Id: ${data.id} borrado con éxito'),
      err => console.error(err),
      () => console.info('éxito')
    );
    this.TraerEmpleados();
  }

  mostrarEmpleado(id, nom, dir, loc, pro, pais, idUsu) {
    this.operacion = "Modificar";
    this.idEmpleadoEncargado = id;
    this.nombreEmpleadoEncargado = nom;
    this.direccionEmpleadoEncargado = dir;
    this.localidadEmpleadoEncargado = loc;
    this.provinciaEmpleadoEncargado = pro;
    this.paisEmpleadoEncargado = pais;
    this.idUsuarioEmpleadoEncargado = idUsu;
    
    document.getElementById("altaEmpleadosEncargado").style.display = "inline";
  }

  CancelarEmpleado() {
    document.getElementById("altaEmpleadosEncargado").style.display = "none";
    this.idEmpleadoEncargado = "";
    this.nombreEmpleadoEncargado = "";
    this.direccionEmpleadoEncargado = "";
    this.localidadEmpleadoEncargado = "";
    this.provinciaEmpleadoEncargado = "";
    this.paisEmpleadoEncargado = "";
    this.idUsuarioEmpleadoEncargado = "";
  }

  GuardarEmpleado() {
    if (((this.nombreEmpleadoEncargado == "") || (this.nombreEmpleadoEncargado == undefined) || (this.nombreEmpleadoEncargado == null))) {
        alert("El nombre es obligatorios");
    } else {
      if (this.operacion == "Insertar") {
        let objEmpleado: Empleado = new Empleado(0, this.nombreEmpleadoEncargado, this.direccionEmpleadoEncargado, this.localidadEmpleadoEncargado, this.provinciaEmpleadoEncargado, this.paisEmpleadoEncargado, this.idUsuarioEmpleadoEncargado);

        this.empleadoService.GuardarEmpleado(objEmpleado).subscribe();

      } else if (this.operacion == "Modificar") {
        let objEmpleado: Empleado = new Empleado(this.idEmpleadoEncargado, this.nombreEmpleadoEncargado, this.direccionEmpleadoEncargado, this.localidadEmpleadoEncargado, this.provinciaEmpleadoEncargado, this.paisEmpleadoEncargado, this.idUsuarioEmpleadoEncargado);
        this.empleadoService.putEmpleado(objEmpleado).subscribe();
      }
      this.TraerEmpleados();
      this.CancelarEmpleado();
    }

  }  

}
