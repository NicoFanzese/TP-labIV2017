# TP-labIV2017

- De entrega obligatoria para la firma de la libreta para final
- Puede sufrir cambios o requerimiento nuevos.
- La entrega de TP y corrección se hace en clase.
- solo se corrigen los TP estando en un sitio <strong>On-Line</strong>(servico web ej: hostinger, 00webhost, amazon)


<h1> Primera fecha de entrega</h1> 
<h3>29 de Junio</h3>
.
.
.


<h1> Segunda fecha de entrega</h1> 
<h3> 6 de Julio (cambio de requerimientos y nuevas funcionalidades)</h3>
.
.
.

 <h1> de no presentar el TP para las fechas anteriores, debe  presentar en fecha de final</h1>

 --------------------------------------------------------------------------
 
 Agregado por NSF
 <br>
 APIS que utiliza el sistema:<br>
 nn = valor del parámetro<br>
 xx = varchar<br>
 <br>
 
 CLIENTES<br>
 Trae todos los clientes<br>
 get:<br>
 http://nfranzeseutn.hol.es/miAPIRest/index.php/clientes/<br>
 Trae usuarios de inicio de sesión para asociar al cliente<br>
 http://nfranzeseutn.hol.es/miAPIRest/index.php/clientesUsuarios/<br>
 delete:<br>
 http://nfranzeseutn.hol.es/miAPIRest/index.php/cliente/nn<br>
 Post:<br>
 http://nfranzeseutn.hol.es/miAPIRest/index.php/cliente/?nombre=xx&mail=xx&telefono=xx&direccion=xx&idUsuario=xx<br>
 Put:<br>
 http://nfranzeseutn.hol.es/miAPIRest/index.php/cliente/?id=nn&nombre=xx&mail=xx&telefono=nn&direccion=xx&idUsuario=nn<br>
 <br>
 EMPLEADOS<br>
 get:<br>
 Trae todos los empleados<br>
 http://nfranzeseutn.hol.es/miAPIRest/index.php/empleados/<br>
 Trae usuarios de inicio de sesión para asociar al empleado<br>
 http://nfranzeseutn.hol.es/miAPIRest/index.php/empleadosUsuarios/<br>
 Post:<br>
 http://nfranzeseutn.hol.es/miAPIRest/index.php/empleado/?nombre=xx&direccion=xx&idUsuario=nn<br>
 Put:<br>
 http://nfranzeseutn.hol.es/miAPIRest/index.php/empleado/?id=nn&nombre=xx&direccion=xx&idUsuario=nn<br>
 Delete:<br>
 http://nfranzeseutn.hol.es/miAPIRest/index.php/empleado/nn<br>
 <br>
 LOCALES<br>
 get:<br>
 Trae todos los locales<br>
 http://nfranzeseutn.hol.es/miAPIRest/index.php/locales/<br>
 Trae encargados para asociar al local<br>
 http://nfranzeseutn.hol.es/miAPIRest/index.php/encargadosUsuarios/<br>
 Delete:<br>
 http://nfranzeseutn.hol.es/miAPIRest/index.php/local/nn<br>
 Post:<br>
 http://nfranzeseutn.hol.es/miAPIRest/index.php/local/?nombre=xx&direccion=x&idEncargado=nn&foto1=xx&foto2=xx&foto3=xx<br>
 Put:<br>
 http://nfranzeseutn.hol.es/miAPIRest/index.php/local/?id=nn&nombre=xx&direccion=x&idEncargado=nn&foto1=xx&foto2=xx&foto3=xx<br>
 <br>
 DETALLE LOCALES<br>
 Trae Empleados del local <br>
 http://nfranzeseutn.hol.es/miAPIRest/index.php/localEmpleados/?idLocal=nn<br>
 Delete:<br>
 http://nfranzeseutn.hol.es/miAPIRest/index.php/localEmpleado/nn<br>
 Post:<br>
 http://nfranzeseutn.hol.es/miAPIRest/index.php/localEmpleado/?idLocal=nn&idEmpleado=nn <br>
<br>
 PRODUCTOS<br>
 get:<br>
 Trae todos los productos<br>
 http://nfranzeseutn.hol.es/miAPIRest/index.php/productos/<br>
 Trae todos los productos de un local especifico<br>
 http://nfranzeseutn.hol.es/miAPIRest/index.php/productosLocales/?idLocal=nn<br>
 Delete:<br>
 http://nfranzeseutn.hol.es/miAPIRest/index.php/producto/nn<br>
 Put:<br> http://nfranzeseutn.hol.es/miAPIRest/index.php/producto/?id=nn&nombre=xx&descripcion=xx&direccion=xx&tipo=xx&vDesde=xx&vHasta=xx&foto1=xx&foto2=xx&foto3=xx&moneda=xx&precio=nn&lat=nn&lng=nn&dirURL=xx<br>
 Post:<br> http://nfranzeseutn.hol.es/miAPIRest/index.php/producto/?nombre=xx&descripcion=xx&direccion=xx&tipo=xx&vDesde=xx&vHasta=xx&foto1=xx&foto2=xx&foto3=xx&moneda=xx&precio=nn&lat=nn&lng=nn&dirURL=xx<br>
 <br>
 DETALLE DE LOCALES<br>
 get:<br>
 Trae locales de un producto:<br>
 http://nfranzeseutn.hol.es/miAPIRest/index.php/productoLocales/?idProducto=nn<br>
 Delete:<br>
 http://nfranzeseutn.hol.es/miAPIRest/index.php/productoLocal/nn<br>
 Post:<br>
 http://nfranzeseutn.hol.es/miAPIRest/index.php/productoLocal/?idProducto=nn&idLocal=nn<br>
   <br>
 RESERVAS<br>
 get:<br>
 Trae todas las reservas<br>
 http://nfranzeseutn.hol.es/miAPIRest/index.php/reservas/<br>
 Post:<br> http://nfranzeseutn.hol.es/miAPIRest/index.php/reserva/?idCliente=xx&fecha=xx&idProducto=xx&tipoProducto=xx&fechaDesde=xx&fechaHasta=xx<br>
 <br>
 USUARIOS<br>
 get:<br>
 Trae todos los usuarios<br>
 http://nfranzeseutn.hol.es/miAPIRest/index.php/usuarios/<br>
 Delete:<br>
 http://nfranzeseutn.hol.es/miAPIRest/index.php/usuarios/nn<br>
 Post:<br>
 http://nfranzeseutn.hol.es/miAPIRest/index.php/usuario/?nombre=xx&usuario=xx&password=xx&tipo=xx&estado=xx<br>
 Put:<br>
 http://nfranzeseutn.hol.es/miAPIRest/index.php/usuario/?id=nn&nombre=xx&usuario=xx&password=xx&tipo=xx&estado=xx<br>
 <br>
 <br>
 --------------------------------------------------------------
MI PÁGINA
<br>
<img style="width:300px;  height:300px;" src="http://nfranzeseutn.hol.es/miAPIRest/fotos/sistema/imagen1 - reservar.JPG"><br>
<img style="width:300px;  height:300px;" src="http://nfranzeseutn.hol.es/miAPIRest/fotos/sistema/imagen2 - reservar.JPG"><br>
<img style="width:300px;  height:300px;" src="http://nfranzeseutn.hol.es/miAPIRest/fotos/sistema/imagen3 - reservar.JPG"><br>
<br>
Ingresá desde acá: <br>
http://nfranzeseutn.hol.es/Inmobiliaria/ 