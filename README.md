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
 
 APIS que utiliza el sistema:
 nn = valor del parámetro
 xx = varchar
 
 
 CLIENTES
 Trae todos los clientes
 get:
 http://nfranzeseutn.hol.es/miAPIRest/index.php/clientes/
 Trae usuarios de inicio de sesión para asociar al cliente
 http://nfranzeseutn.hol.es/miAPIRest/index.php/clientesUsuarios/
 delete:
 http://nfranzeseutn.hol.es/miAPIRest/index.php/cliente/nn
 Post:
 http://nfranzeseutn.hol.es/miAPIRest/index.php/cliente/?nombre=xx&mail=xx&telefono=xx&direccion=xx&idUsuario=xx
 Put:
 http://nfranzeseutn.hol.es/miAPIRest/index.php/cliente/?id=nn&nombre=xx&mail=xx&telefono=nn&direccion=xx&idUsuario=nn
 
 EMPLEADOS
 get:
 Trae todos los empleados
 http://nfranzeseutn.hol.es/miAPIRest/index.php/empleados/
 Trae usuarios de inicio de sesión para asociar al empleado
 http://nfranzeseutn.hol.es/miAPIRest/index.php/empleadosUsuarios/
 Post:
 http://nfranzeseutn.hol.es/miAPIRest/index.php/empleado/?nombre=xx&direccion=xx&idUsuario=nn
 Put:
 http://nfranzeseutn.hol.es/miAPIRest/index.php/empleado/?id=nn&nombre=xx&direccion=xx&idUsuario=nn
 Delete:
 http://nfranzeseutn.hol.es/miAPIRest/index.php/empleado/nn
 
 LOCALES
 get:
 Trae todos los locales
 http://nfranzeseutn.hol.es/miAPIRest/index.php/locales/
 Trae encargados para asociar al local
 http://nfranzeseutn.hol.es/miAPIRest/index.php/encargadosUsuarios/
 Delete:
 http://nfranzeseutn.hol.es/miAPIRest/index.php/local/nn
 Post:
 http://nfranzeseutn.hol.es/miAPIRest/index.php/local/?nombre=xx&direccion=x&idEncargado=nn&foto1=xx&foto2=xx&foto3=xx
 Put:
 http://nfranzeseutn.hol.es/miAPIRest/index.php/local/?id=nn&nombre=xx&direccion=x&idEncargado=nn&foto1=xx&foto2=xx&foto3=xx
 DETALLE LOCALES
 Trae Empleados del local 
 http://nfranzeseutn.hol.es/miAPIRest/index.php/localEmpleados/?idLocal=nn
 Delete:
 http://nfranzeseutn.hol.es/miAPIRest/index.php/localEmpleado/nn
 Post:
 http://nfranzeseutn.hol.es/miAPIRest/index.php/localEmpleado/?idLocal=nn&idEmpleado=nn 

 PRODUCTOS
 get:
 Trae todos los productos
 http://nfranzeseutn.hol.es/miAPIRest/index.php/productos/
 Trae todos los productos de un local especifico
 http://nfranzeseutn.hol.es/miAPIRest/index.php/productosLocales/?idLocal=nn
 Delete:
 http://nfranzeseutn.hol.es/miAPIRest/index.php/producto/nn
 Put: http://nfranzeseutn.hol.es/miAPIRest/index.php/producto/?id=nn&nombre=xx&descripcion=xx&direccion=xx&tipo=xx&vDesde=xx&vHasta=xx&foto1=xx&foto2=xx&foto3=xx&moneda=xx&precio=nn&lat=nn&lng=nn&dirURL=xx
 Post: http://nfranzeseutn.hol.es/miAPIRest/index.php/producto/?nombre=xx&descripcion=xx&direccion=xx&tipo=xx&vDesde=xx&vHasta=xx&foto1=xx&foto2=xx&foto3=xx&moneda=xx&precio=nn&lat=nn&lng=nn&dirURL=xx
 DETALLE DE LOCALES
 get:
 Trae locales de un producto:
 http://nfranzeseutn.hol.es/miAPIRest/index.php/productoLocales/?idProducto=nn
 Delete:
 http://nfranzeseutn.hol.es/miAPIRest/index.php/productoLocal/nn
 Post:
 http://nfranzeseutn.hol.es/miAPIRest/index.php/productoLocal/?idProducto=nn&idLocal=nn
   
 RESERVAS
 get:
 Trae todas las reservas
 http://nfranzeseutn.hol.es/miAPIRest/index.php/reservas/
 Post:http://nfranzeseutn.hol.es/miAPIRest/index.php/reserva/?idCliente=xx&fecha=xx&idProducto=xx&tipoProducto=xx&fechaDesde=xx&fechaHasta=xx
 
 USUARIOS
 Get:
 Trae todos los usuarios
 http://nfranzeseutn.hol.es/miAPIRest/index.php/usuarios/
 Delete:
 http://nfranzeseutn.hol.es/miAPIRest/index.php/usuarios/nn
 Post:
 http://nfranzeseutn.hol.es/miAPIRest/index.php/usuario/?nombre=xx&usuario=xx&password=xx&tipo=xx&estado=xx
 Put:
 http://nfranzeseutn.hol.es/miAPIRest/index.php/usuario/?id=nn&nombre=xx&usuario=xx&password=xx&tipo=xx&estado=xx
 <br>
 <br>
 ------------------------------------------------------------------
 <br>
MI PÁGINA
<br>
<img style="width:300px;  height:300px;" src="http://nfranzeseutn.hol.es/miAPIRest/fotos/sistema/imagen1 - reservar.JPG"><br>
<img style="width:300px;  height:300px;" src="http://nfranzeseutn.hol.es/miAPIRest/fotos/sistema/imagen2 - reservar.JPG"><br>
<img style="width:300px;  height:300px;" src="http://nfranzeseutn.hol.es/miAPIRest/fotos/sistema/imagen3 - reservar.JPG"><br>
<br>
Ingresá desde acá: <br>
http://nfranzeseutn.hol.es/Inmobiliaria/ 