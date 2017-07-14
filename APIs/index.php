<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

//TOKEN
	require './JWT/autoload.php';
	use \Firebase\JWT\JWT;

require './vendor/autoload.php';
require './clases/AccesoDatos.php';
require './clases/Persona.php';
require './clases/Usuario.php';
require './clases/Local.php';
require './clases/Cliente.php';
require './clases/Producto.php';
require './clases/Empleado.php';
require './clases/ProductoLocal.php';
require './clases/Oferta.php';
require './clases/OfertaProducto.php';
require './clases/LocalEmpleado.php';
require './clases/Reserva.php';


//$app = new \Slim\App;

//Configuro la api para que me muestre los errores detalladamente
	$configuration = [
		'settings' => [
			'displayErrorDetails' => true,
		],
	];

	//Asigno la configuración anterior
	$c = new \Slim\Container($configuration);

	//Inicializo la aplicación
	$app = new \Slim\App($c);

	//Configuro options
	$app->options('/{routes:.+}', function ($request, $response, $args){
		return $response;
	});


	//Configuro headers
	$app->add(function ($req, $res, $next){
		$response = $next($req, $res);

		return $response
			->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
			
	});


$app->get('/hello/{name}', function (Request $request, Response $response) {
    $name = $request->getAttribute('name');
    $response->getBody()->write("Hello, $name");
    return $response;
});
//-- metodo default
$app->get('/', function (Request $request, Response $response) {
    //$name = $request->getAttribute('name');
    $response->getBody()->write("No tiene acceso!!");
    return $response;
});
// -- metodo traer todas las personas
$app->get('/personas[/]', function (Request $request, Response $response) {
	$Listado = Persona::TraerTodasLasPersonas();
	$listadoEncodeadoEnJson = json_encode($Listado);
    $response->write($listadoEncodeadoEnJson);
    return $response;
});
// -- metodo traer una persona por id
$app->get('/persona[/]', function ($request, $response, $args) {
	$datosPost = $request->getQueryParams(); //tomo lo que le mande por parametro y lo parse a php
    $unaPersona = Persona::TraerUnaPersona($datosPost['id']);
    $unaPersonaEncodeadaEnJson = json_encode($unaPersona);
    $response->write($unaPersonaEncodeadaEnJson);
    return $response;
});
// -- metodo recibe una parsona y da de alta
$app->post('/persona[/]', function ($request, $response, $args) {
	$datosPost = $request->getQueryParams(); //tomo lo que le mande por parametro y lo parse a php
    //armo el objeto persona
    $unaPersona = new Persona();
    $unaPersona->nombre = $datosPost['nombre'];
    $unaPersona->apellido = $datosPost['apellido'];
    $unaPersona->dni = $datosPost['dni'];
    Persona::InsertarPersona($unaPersona);
    $response->write("Persona insertada con exito -->");
    return $response;
});
// -- metodo borrar una persona por id
$app->get('/borrarPersona/{id}', function ($request, $response, $args) {
	$datosPost = json_decode($args["id"]); //tomo lo que le mande por parametro y lo parse a php
    Persona::BorrarPersona($datosPost->id);
    $response->write("Persona Borrada con exito");
    //  $response->write(json_encode($datosPost));
    return $response;
});

/*$app->delete('/persona/{id}', function ($request, $response, $args) { 
	$datosPost = json_decode($args["id"]); //tomo lo que le mande por parametro y lo parse a php
    Persona::BorrarPersona($datosPost->id);
    $response->write("Persona Borrada con exito");
    return $response;
});*/

$app->delete('/persona/{id}', function ($request, $response, $arg) {
    $datosPost = json_decode($arg['id']);    
    Persona::BorrarPersona($datosPost);
    $response->write("Eliminado");
    return $response;
});


// -- metodo recibe una parsona y la modifica
$app->put('/persona/{persona}', function ($request, $response, $args) {
    //$datosPost = $request->getQueryParams(); //tomo lo que le mande por parametro y lo parse a php
    $datosPost = json_decode($args["persona"]); //tomo lo que le mande por parametro y lo parse a php
    // //armo el objeto persona
    $unaPersona = new Persona();
    $unaPersona->id = $datosPost->id;
    $unaPersona->nombre = $datosPost->nombre;
    $unaPersona->apellido = $datosPost->apellido;
    $unaPersona->dni = $datosPost->dni;
    Persona::ModificarPersona($unaPersona); // modifico la persona
    $response->write("Persona modificada con exito");
    //$response->write(json_encode($datosPost));
    return $response;
});

//Usuarios
$app->get('/clientesUsuarios[/]', function (Request $request, Response $response) {
	//$Listado = Cliente::TraerTodosLosUsuariosClientes();
	$Listado = Usuario::TraerTodosLosUsuariosClientes();
	$listadoEncodeadoEnJson = json_encode($Listado);
    $response->write($listadoEncodeadoEnJson);
    return $response;
});
$app->get('/empleadosUsuarios[/]', function (Request $request, Response $response) {
	$Listado = Usuario::TraerTodosLosUsuariosEmpleados();
	$listadoEncodeadoEnJson = json_encode($Listado);
    $response->write($listadoEncodeadoEnJson);
    return $response;
});
$app->get('/encargadosUsuarios[/]', function (Request $request, Response $response) {
	$Listado = Usuario::TraerTodosLosUsuariosEncargados();
	$listadoEncodeadoEnJson = json_encode($Listado);
    $response->write($listadoEncodeadoEnJson);
    return $response;
});

//$app->get('/existeUsuario/{usuario, password}', function ($request, $response, $args) {
$app->get('/existeUsuario[/]', function ($request, $response, $args) {	
	$datosPost = $request->getQueryParams(); //tomo lo que le mande por parametro y lo parse a php
	$unUsuario = Usuario::EstaRegistrado($datosPost['usuario'],$datosPost['password']);
    //$unaPersonaEncodeadaEnJson = json_encode($unUsuario);
    
    // $response->write($unaPersonaEncodeadaEnJson);
    // return $response;

    if(($unUsuario != null) && ($unUsuario != undefined))
    {

  	  	$key = "lolita_torres";
		$token = array(
	    "iss" => "http://example.org",
	    "aud" => "http://example.com",
	    "iat" => 1356999524,
	    "nbf" => 1357000000,
	    "data" => 
		    [
		    	"nombre" => $unUsuario->nombre,
		    	"usuario" => $unUsuario->usuario,
		    	"tipo"=> $unUsuario->tipo,
		    	"id" => $unUsuario->ID
		    ]
		);

		$jwt = JWT::encode($token, $key);
		$tok['token'] = $jwt;
		print_r(json_encode($tok));
		return;
		$decoded = JWT::decode($jwt, $key, array('HS256'));

		print_r($decoded);

		$decoded_array = (array) $decoded;

		JWT::$leeway = 60; // $leeway in seconds
		$decoded = JWT::decode($jwt, $key, array('HS256'));
	}
	else
	{
		return $response->write("false");
	}
});

//-- metodo default
// -- metodo traer todas los usuarios
$app->get('/usuarios[/]', function (Request $request, Response $response) {
	$Listado = Usuario::TraerTodosLosUsuarios();
	$listadoEncodeadoEnJson = json_encode($Listado);
    $response->write($listadoEncodeadoEnJson);
    return $response;
});
// -- metodo traer un usuario por id
$app->get('/usuario[/]', function ($request, $response, $args) {
	$datosPost = $request->getQueryParams(); //tomo lo que le mande por parametro y lo parse a php
    $unUsuario = Usuario::TraerUnUsuario($datosPost['usuario']);
    $unUsuarioEncodeadaEnJson = json_encode($unUsuario);
    $response->write($unUsuarioEncodeadaEnJson);
    return $response;
});
// -- metodo recibe un usuario y da de alta
$app->post('/usuario[/]', function ($request, $response, $args) {
	$datosPost = $request->getQueryParams(); //tomo lo que le mande por parametro y lo parse a php
    //armo el objeto usuario
    $unUsuario = new Usuario();
    $unUsuario->nombre = $datosPost['nombre'];    
	$unUsuario->usuario = $datosPost['usuario'];
    $unUsuario->password = $datosPost['password'];
	$unUsuario->tipo = $datosPost['tipo'];
	$unUsuario->estado = $datosPost['estado'];
    Usuario::InsertarUsuario($unUsuario);
    $response->write("Usuario insertado con exito -->");
    return $response;
});

// -- metodo borrar un usuario por id
$app->get('/borrarUsuario/{usuario}', function ($request, $response, $args) {
	$datosPost = json_decode($args["usuario"]); 
    Usuario::BorrarUsuario($datosPost->usuario);
    $response->write("Eliminado por metodo Get");
    return $response;
});

$app->delete('/usuario/{usuario}', function ($request, $response, $arg) {
    $datosPost = json_decode($arg['usuario']);    
    Usuario::BorrarUsuario($datosPost);
    $response->write("Eliminado por metodo Delete");
    return $response;
});


// -- metodo recibe un usuario y lo modifica
/*$app->put('/usuario/{id,nombre, usuario, password, tipo}', function ($request, $response, $args) {
    //$datosPost = $request->getQueryParams(); //tomo lo que le mande por parametro y lo parse a php
    $datosPostId = json_decode($args["id"]); //tomo lo que le mande por parametro y lo parse a php
	$datosPostNombre = json_decode($args["nombre"]); //tomo lo que le mande por parametro y lo parse a php
	$datosPostUsuario = json_decode($args["usuario"]); //tomo lo que le mande por parametro y lo parse a php
	$datosPostPass = json_decode($args["password"]); //tomo lo que le mande por parametro y lo parse a php
	$datosPostTipo = json_decode($args["tipo"]); //tomo lo que le mande por parametro y lo parse a php
    // //armo el objeto Usuario
    $unUsuario = new Usuario();
	$unUsuario->id = $datosPost->id;
    $unUsuario->usuario = $datosPost->usuario;
    $unUsuario->nombre = $datosPost->nombre;
    $unUsuario->password = $datosPost->password;
    $unUsuario->tipo = $datosPost->tipo;
    Usuario::ModificarUsuario($unUsuario); // modifico el Usuario
    $response->write("Usuario modificado con exito");
    //$response->write(json_encode($datosPost));
    return $response;
});*/

$app->put('/usuario[/]', function ($request, $response, $args) {
    //$datosPost = $request->getQueryParams(); //tomo lo que le mande por parametro y lo parse a php
	$datosPost = $request->getQueryParams();
    //$datosPost = json_decode($args["usuario"]); //tomo lo que le mande por parametro y lo parse a php
    // //armo el objeto Usuario
    $unUsuario = new Usuario();
	$unUsuario->id = $datosPost["id"];
    $unUsuario->usuario = $datosPost["usuario"];
    $unUsuario->nombre = $datosPost["nombre"];
    $unUsuario->password = $datosPost["password"];
    $unUsuario->tipo = $datosPost["tipo"];
	$unUsuario->estado = $datosPost["estado"];
    Usuario::ModificarUsuario($unUsuario); // modifico el Usuario
    //$response->write("Usuario modificado con exito");
	$response->write(json_encode($unUsuario));
    //$response->write(json_encode($datosPost));
    return $response;
});

//LOCALES
//-- metodo default
// -- metodo traer todos los locales
$app->get('/locales[/]', function (Request $request, Response $response) {
	$Listado = Local::TraerTodosLosLocales();
	$listadoEncodeadoEnJson = json_encode($Listado);
    $response->write($listadoEncodeadoEnJson);
    return $response;
});
// -- metodo traer un usuario por id
$app->get('/local[/]', function ($request, $response, $args) {
	$datosPost = $request->getQueryParams(); //tomo lo que le mande por parametro y lo parse a php
    $unLocal = Local::TraerUnLocal($datosPost['local']);
    $unLocalEncodeadaEnJson = json_encode($unLocal);
    $response->write($unLocalEncodeadaEnJson);
    return $response;
});
// -- metodo recibe un local y da de alta
$app->post('/local[/]', function ($request, $response, $args) {
	$datosPost = $request->getQueryParams(); //tomo lo que le mande por parametro y lo parse a php
    //armo el objeto usuario
    $unLocal = new Local();
    $unLocal->nombre = $datosPost['nombre'];    
	$unLocal->direccion = $datosPost['direccion'];
	$unLocal->idEncargado = $datosPost['idEncargado'];
	$unLocal->foto1 = $datosPost['foto1'];
	$unLocal->foto2 = $datosPost['foto2'];
	$unLocal->foto3 = $datosPost['foto3'];
    Local::InsertarLocal($unLocal);
    $response->write("Local insertado con exito -->");
    return $response;
});

// -- metodo borrar un local por id
$app->get('/borrarLocal/{local}', function ($request, $response, $args) {
	$datosPost = json_decode($args["local"]); 
    Local::BorrarLocal($datosPost->local);
    $response->write("Eliminado por metodo Get");
    return $response;
});

$app->delete('/local/{local}', function ($request, $response, $arg) {
    $datosPost = json_decode($arg['local']);    
    Local::BorrarLocal($datosPost);
    $response->write("Eliminado por metodo Delete");
    return $response;
});


$app->put('/local[/]', function ($request, $response, $args) {
    //$datosPost = $request->getQueryParams(); //tomo lo que le mande por parametro y lo parse a php
	$datosPost = $request->getQueryParams();
    // //armo el objeto Local
    $unLocal = new Local();
	$unLocal->id = $datosPost["id"];
    $unLocal->nombre = $datosPost["nombre"];
	$unLocal->direccion = $datosPost["direccion"];
	$unLocal->idEncargado = $datosPost['idEncargado'];	
	$unLocal->foto1 = $datosPost['foto1'];
	$unLocal->foto2 = $datosPost['foto2'];
	$unLocal->foto3 = $datosPost['foto3'];	
    Local::ModificarLocal($unLocal); // modifico el local
    //$response->write("Usuario modificado con exito");
	$response->write(json_encode($unLocal));
    //$response->write(json_encode($datosPost));
    return $response;
});


//LOCALES EMPLEADOS
$app->get('/localEmpleados[/]', function ($request, $response, $args) {
	$datosPost = $request->getQueryParams();	
	$Listado = LocalEmpleado::TraerLocalEmpleados($datosPost['idLocal']);	
	$listadoEncodeadoEnJson = json_encode($Listado);
    $response->write($listadoEncodeadoEnJson);
    return $response;
});
/*
$app->get('/productoLocales[/]', function (Request $request, Response $response) {
	$datosPost = $request->getQueryParams();	
	$Listado = ProductoLocal::TraerProductoLocales($datosPost['idProducto']);	
	$listadoEncodeadoEnJson = json_encode($Listado);
    $response->write($listadoEncodeadoEnJson);
    return $response;
});*/
	
	

$app->post('/localEmpleado[/]', function ($request, $response, $args) {
	$datosPost = $request->getQueryParams(); //tomo lo que le mande por parametro y lo parse a php
    $unLocalEmpleado = new LocalEmpleado();
	$unLocalEmpleado->idLocal = $datosPost['idLocal'];
    $unLocalEmpleado->idEmpleado = $datosPost['idEmpleado'];    	
    LocalEmpleado::InsertarLocalEmpleado($unLocalEmpleado);
    $response->write("Local empleado insertado con exito -->");
    return $response;
});

$app->delete('/localEmpleado/{localEmpleado}', function ($request, $response, $arg) {
    $datosPost = json_decode($arg['localEmpleado']);    
    LocalEmpleado::BorrarLocalEmpleado($datosPost);
    $response->write("Eliminado por metodo Delete");
    return $response;
});




//CLIENTES
//-- metodo default

// -- metodo traer todos los clientes
$app->get('/clientes[/]', function (Request $request, Response $response) {
	$Listado = Cliente::TraerTodosLosClientes();
	$listadoEncodeadoEnJson = json_encode($Listado);
    $response->write($listadoEncodeadoEnJson);
    return $response;
});
// -- metodo traer un cliente por id
$app->get('/cliente[/]', function ($request, $response, $args) {
	$datosPost = $request->getQueryParams(); //tomo lo que le mande por parametro y lo parse a php
    $unCliente = Cliente::TraerUnCliente($datosPost['cliente']);
    $unClienteEncodeadaEnJson = json_encode($unCliente);
    $response->write($unClienteEncodeadaEnJson);
    return $response;
});
// -- metodo recibe un local y da de alta
$app->post('/cliente[/]', function ($request, $response, $args) {
	$datosPost = $request->getQueryParams(); //tomo lo que le mande por parametro y lo parse a php
    //armo el objeto cliente
    $unCliente = new Local();
    $unCliente->nombre = $datosPost['nombre'];    
	$unCliente->mail = $datosPost['mail'];    
	$unCliente->telefono = $datosPost['telefono'];    
	$unCliente->direccion = $datosPost['direccion'];
	$unCliente->idUsuario = $datosPost['idUsuario'];
    Cliente::InsertarCliente($unCliente);
    $response->write("Cliente insertado con exito -->");
    return $response;
});

// -- metodo borrar un cliente por id
$app->get('/borrarCliente/{cliente}', function ($request, $response, $args) {
	$datosPost = json_decode($args["cliente"]); 
    Cliente::BorrarCliente($datosPost->cliente);
    $response->write("Eliminado por metodo Get");
    return $response;
});

$app->delete('/cliente/{cliente}', function ($request, $response, $arg) {
    $datosPost = json_decode($arg['cliente']);    
    Cliente::BorrarCliente($datosPost);
    $response->write("Eliminado por metodo Delete");
    return $response;
});


$app->put('/cliente[/]', function ($request, $response, $args) {
    //$datosPost = $request->getQueryParams(); //tomo lo que le mande por parametro y lo parse a php
	$datosPost = $request->getQueryParams();
    // //armo el objeto Local
    $unCliente = new Cliente();
	$unCliente->id = $datosPost["id"];
    $unCliente->nombre = $datosPost["nombre"];
	$unCliente->mail = $datosPost["mail"];
	$unCliente->telefono = $datosPost["telefono"];
	$unCliente->direccion = $datosPost["direccion"];
	$unCliente->idUsuario = $datosPost['idUsuario'];
    Cliente::ModificarCliente($unCliente); // modifico el local
    //$response->write("Usuario modificado con exito");
	$response->write(json_encode($unCliente));
    //$response->write(json_encode($datosPost));
    return $response;
});


//PRODUCTOS
//-- metodo default
// -- metodo traer todos los clientes
$app->get('/productos[/]', function (Request $request, Response $response) {
	$Listado = Producto::TraerTodosLosProductos();
	$listadoEncodeadoEnJson = json_encode($Listado);
    $response->write($listadoEncodeadoEnJson);
    return $response;
});
// -- metodo traer un cliente por id
$app->get('/producto[/]', function ($request, $response, $args) {
	$datosPost = $request->getQueryParams(); //tomo lo que le mande por parametro y lo parse a php
    $unProducto = Producto::TraerUnProducto($datosPost['producto']);
    $unProductoEncodeadaEnJson = json_encode($unProducto);
    $response->write($unProductoEncodeadaEnJson);
    return $response;
});
$app->get('/productosLocales[/]', function ($request, $response, $args) {
	$datosPost = $request->getQueryParams(); //tomo lo que le mande por parametro y lo parse a php	
	$Listado = Producto::TraerTodosLosProductosLocal($datosPost['idLocal']);
	$listadoEncodeadoEnJson = json_encode($Listado);
    $response->write($listadoEncodeadoEnJson);
    return $response;
});


// -- metodo recibe un local y da de alta
$app->post('/producto[/]', function ($request, $response, $args) {
	$datosPost = $request->getQueryParams(); //tomo lo que le mande por parametro y lo parse a php
    //armo el objeto cliente
    $unProducto = new Producto();
    $unProducto->nombre = $datosPost['nombre'];    
	$unProducto->descripcion = $datosPost['descripcion'];
	$unProducto->direccion = $datosPost['direccion'];
	$unProducto->tipo = $datosPost['tipo'];
	$unProducto->vDesde = $datosPost['vDesde'];
	$unProducto->vHasta = $datosPost['vHasta'];
	$unProducto->foto1 = $datosPost['foto1'];
	$unProducto->foto2 = $datosPost['foto2'];
	$unProducto->foto3 = $datosPost['foto3'];
	$unProducto->moneda = $datosPost['moneda'];
	$unProducto->precio = $datosPost['precio'];
	$unProducto->lat = $datosPost['lat'];
	$unProducto->lng = $datosPost['lng'];
	$unProducto->dirURL = $datosPost['dirURL'];	
    Producto::InsertarProducto($unProducto);
    $response->write("Producto insertado con exito -->");
    return $response;
});

// -- metodo borrar un cliente por id
$app->get('/borrarProducto/{producto}', function ($request, $response, $args) {
	$datosPost = json_decode($args["producto"]); 
    Producto::BorrarProducto($datosPost->producto);
    $response->write("Eliminado por metodo Get");
    return $response;
});

$app->delete('/producto/{producto}', function ($request, $response, $arg) {
    $datosPost = json_decode($arg['producto']);    
    Producto::BorrarProducto($datosPost);
    $response->write("Eliminado por metodo Delete");
    return $response;
});


$app->put('/producto[/]', function ($request, $response, $args) {
    //$datosPost = $request->getQueryParams(); //tomo lo que le mande por parametro y lo parse a php
	$datosPost = $request->getQueryParams();
    // //armo el objeto Local
    $unProducto = new Producto();
	$unProducto->id = $datosPost["id"];
    $unProducto->nombre = $datosPost["nombre"];
	$unProducto->descripcion = $datosPost["descripcion"];
	$unProducto->direccion = $datosPost["direccion"];
	$unProducto->tipo = $datosPost['tipo'];
	$unProducto->vDesde = $datosPost['vDesde'];
	$unProducto->vHasta = $datosPost['vHasta'];	
	$unProducto->foto1 = $datosPost["foto1"];
	$unProducto->foto2 = $datosPost["foto2"];
	$unProducto->foto3 = $datosPost["foto3"];
	$unProducto->moneda = $datosPost["moneda"];
	$unProducto->precio = $datosPost["precio"];
	$unProducto->lat = $datosPost['lat'];
	$unProducto->lng = $datosPost['lng'];	
	$unProducto->dirURL = $datosPost['dirURL'];
    Producto::ModificarProducto($unProducto); // modifico el local
    //$response->write("Usuario modificado con exito");
	$response->write(json_encode($unProducto));
    //$response->write(json_encode($datosPost));
    return $response;
});


//PRODUCTOS LOCALES

$app->get('/productoLocales[/]', function (Request $request, Response $response) {
	$datosPost = $request->getQueryParams();	
	$Listado = ProductoLocal::TraerProductoLocales($datosPost['idProducto']);	
	$listadoEncodeadoEnJson = json_encode($Listado);
    $response->write($listadoEncodeadoEnJson);
    return $response;
});
	
/*$app->get('/productoLocales[/]', function ($request, $response, $args) {
	$datosPost = $request->getQueryParams(); //tomo lo que le mande por parametro y lo parse a php
    $unProductoLocales = ProductoLocal::TraerProductoLocales($datosPost['idProducto']);	
    $unProductoEncodeadaEnJson = json_encode($unProductoLocales);
    $response->write($unProductoEncodeadaEnJson);
    return $response;
});*/
// -- metodo recibe un local y da de alta
$app->post('/productoLocal[/]', function ($request, $response, $args) {
	$datosPost = $request->getQueryParams(); //tomo lo que le mande por parametro y lo parse a php
    //armo el objeto cliente
    $unProductoLocal = new ProductoLocal();
    $unProductoLocal->idProducto = $datosPost['idProducto'];    
	$unProductoLocal->idLocal = $datosPost['idLocal'];
    ProductoLocal::InsertarProductoLocal($unProductoLocal);
    $response->write("Producto Local insertado con exito -->");
    return $response;
});

$app->delete('/productoLocal/{productoLocal}', function ($request, $response, $arg) {
    $datosPost = json_decode($arg['productoLocal']);    
    ProductoLocal::BorrarProductoLocal($datosPost);
    $response->write("Eliminado por metodo Delete");
    return $response;
});









//OFERTAS
$app->get('/ofertas[/]', function (Request $request, Response $response) {
	$Listado = Oferta::TraerTodasLasOfertas();
	$listadoEncodeadoEnJson = json_encode($Listado);
    $response->write($listadoEncodeadoEnJson);
    return $response;
});
$app->get('/oferta[/]', function ($request, $response, $args) {
	$datosPost = $request->getQueryParams(); //tomo lo que le mande por parametro y lo parse a php
    $unaOferta = Oferta::TraerUnaOferta($datosPost['oferta']);
    $unaOfertaEncodeadaEnJson = json_encode($unaOferta);
    $response->write($unaOfertaEncodeadaEnJson);
    return $response;
});
$app->post('/oferta[/]', function ($request, $response, $args) {
	$datosPost = $request->getQueryParams(); //tomo lo que le mande por parametro y lo parse a php
    //armo el objeto cliente
    $unaOferta = new Oferta();
    $unaOferta->nombre = $datosPost['nombre'];    
	$unaOferta->descripcion = $datosPost['descripcion'];
	$unaOferta->moneda = $datosPost['moneda'];
	$unaOferta->precio = $datosPost['precio'];
	$unaOferta->tipo = $datosPost['tipo'];
    Oferta::InsertarOferta($unaOferta);
    $response->write("Oferta insertada con exito -->");
    return $response;
});

// -- metodo borrar un cliente por id
$app->get('/borrarOferta/{oferta}', function ($request, $response, $args) {
	$datosPost = json_decode($args["oferta"]); 
    Oferta::BorrarOferta($datosPost->oferta);
    $response->write("Eliminado por metodo Get");
    return $response;
});

$app->delete('/oferta/{oferta}', function ($request, $response, $arg) {
    $datosPost = json_decode($arg['oferta']);    
    Oferta::BorrarOferta($datosPost);
    $response->write("Eliminado por metodo Delete");
    return $response;
});


$app->put('/oferta[/]', function ($request, $response, $args) {
    //$datosPost = $request->getQueryParams(); //tomo lo que le mande por parametro y lo parse a php
	$datosPost = $request->getQueryParams();
    // //armo el objeto Local
    $unaOferta = new Oferta();
	$unaOferta->id = $datosPost["id"];
    $unaOferta->nombre = $datosPost["nombre"];
	$unaOferta->descripcion = $datosPost["descripcion"];
	$unaOferta->moneda = $datosPost["moneda"];
	$unaOferta->precio = $datosPost["precio"];
	$unaOferta->tipo = $datosPost["tipo"];

    Oferta::ModificarOferta($unaOferta); // modifico el local
    //$response->write("Usuario modificado con exito");
	$response->write(json_encode($unaOferta));
    //$response->write(json_encode($datosPost));
    return $response;
});


//OFERTAS PRODUCTOS 

$app->get('/ofertaProductos[/]', function (Request $request, Response $response) {
	$datosPost = $request->getQueryParams();	
	$Listado = OfertaProducto::TraerOfertaProductos($datosPost['idOferta']);	
	$listadoEncodeadoEnJson = json_encode($Listado);
    $response->write($listadoEncodeadoEnJson);
    return $response;
});

// -- metodo recibe un local y da de alta
$app->post('/ofertaProducto[/]', function ($request, $response, $args) {
	$datosPost = $request->getQueryParams(); //tomo lo que le mande por parametro y lo parse a php
    //armo el objeto cliente
    $unaOfertaProducto = new OfertaProducto();
    $unaOfertaProducto->idOferta = $datosPost['idOferta'];    
	$unaOfertaProducto->idProducto = $datosPost['idProducto'];
    OfertaProducto::InsertarOfertaProducto($unaOfertaProducto);
    $response->write("Oferta Producto insertado con exito -->");
    return $response;
});

$app->delete('/ofertaProducto/{ofertaProducto}', function ($request, $response, $arg) {
    $datosPost = json_decode($arg['ofertaProducto']);    
    OfertaProducto::BorrarOfertaProducto($datosPost);
    $response->write("Eliminado por metodo Delete");
    return $response;
});


//EMPLEADOS
//-- metodo default
// -- metodo traer todos los locales
$app->get('/empleados[/]', function (Request $request, Response $response) {
	$Listado = Empleado::TraerTodosLosEmpleados();
	$listadoEncodeadoEnJson = json_encode($Listado);
    $response->write($listadoEncodeadoEnJson);
    return $response;
});
// -- metodo traer un usuario por id
$app->get('/empleado[/]', function ($request, $response, $args) {
	$datosPost = $request->getQueryParams(); //tomo lo que le mande por parametro y lo parse a php
    $unEmpleado = Empleado::TraerUnEmpleado($datosPost['empleado']);
    $unEmpleadoEncodeadaEnJson = json_encode($unEmpleado);
    $response->write($unEmpleadoEncodeadaEnJson);
    return $response;
});
// -- metodo recibe un local y da de alta
$app->post('/empleado[/]', function ($request, $response, $args) {
	$datosPost = $request->getQueryParams(); //tomo lo que le mande por parametro y lo parse a php
    //armo el objeto usuario
    $unEmpleado = new Empleado();
    $unEmpleado->nombre = $datosPost['nombre'];    
	$unEmpleado->direccion = $datosPost['direccion'];
	$unEmpleado->idUsuario = $datosPost['idUsuario'];
    Empleado::InsertarEmpleado($unEmpleado);
    $response->write("Empleado insertado con exito -->");
    return $response;
});

// -- metodo borrar un local por id
$app->get('/borrarEmpleado/{empleado}', function ($request, $response, $args) {
	$datosPost = json_decode($args["empleado"]); 
    Empleado::BorrarEmpleado($datosPost->empleado);
    $response->write("Eliminado por metodo Get");
    return $response;
});

$app->delete('/empleado/{empleado}', function ($request, $response, $arg) {
    $datosPost = json_decode($arg['empleado']);    
    Empleado::BorrarEmpleado($datosPost);
    $response->write("Eliminado por metodo Delete");
    return $response;
});


$app->put('/empleado[/]', function ($request, $response, $args) {
    //$datosPost = $request->getQueryParams(); //tomo lo que le mande por parametro y lo parse a php
	$datosPost = $request->getQueryParams();
    // //armo el objeto Local
    $unEmpleado = new Empleado();
	$unEmpleado->id = $datosPost["id"];
    $unEmpleado->nombre = $datosPost["nombre"];
	$unEmpleado->direccion = $datosPost["direccion"];
	$unEmpleado->idUsuario = $datosPost["idUsuario"];
    Empleado::ModificarEmpleado($unEmpleado); // modifico el local
    //$response->write("Usuario modificado con exito");
	$response->write(json_encode($unEmpleado));
    //$response->write(json_encode($datosPost));
    return $response;
});

$app->post('/uploadFoto[/]', function ($request, $response, $arg) {
		
		$foto = $_FILES[ 'file' ][ 'tmp_name' ];
		$rutaGuardar = "fotos" . DIRECTORY_SEPARATOR . $_FILES[ 'file' ][ 'name' ];
		//Evalúo si existe el archivo, si no existe lo guardo
		if(!file_exists($rutaGuardar))
		{
			if ( !empty( $_FILES ) ) 
			{
				//Guardo la foto nueva
				move_uploaded_file( $foto, $rutaGuardar );
				$response->write("Archivo guardado con éxito!");
			} 
			else
			{
				$response->write("No hay archivos");
			}	
		}
			
		//Si ya existe renombro la foto guardada
		else
		{
			//Obtengo el nombre de la foto con extensión
			$nombre = $_FILES[ 'file' ][ 'name' ];
			//Obtengo la longitud del nombre de la foto
			$long = strlen($nombre);
			//Obtengo la extensión de la imagen
			$ext = pathinfo($rutaGuardar, PATHINFO_EXTENSION);
			//Obtengo el nombre de la foto sin la extensión
			$nombreSinExt = substr($nombre, $long * -1, $long -4 );
			//Guardo la fecha de hoy
			$hoy = date('Y-m-d-H-i-s');
			//Creo la ruta nueva con el nombre de la imagen + _ + fecha de hoy + extensión
			$rutaNueva = "fotos" . DIRECTORY_SEPARATOR . "viejas" . DIRECTORY_SEPARATOR . $nombreSinExt . '_' . $hoy . '.' . $ext;
			//Muevo la foto vieja
			rename($rutaGuardar, $rutaNueva);
			//Guardo la foto nueva
			move_uploaded_file( $foto, $rutaGuardar );
			$response->write("Archivo guardado con éxito!");
		}
    	return $response;
		
	});
	

//RESERVAS
$app->get('/reservas[/]', function (Request $request, Response $response) {
	$Listado = Reserva::TraerTodasLasReservas();
	$listadoEncodeadoEnJson = json_encode($Listado);
    $response->write($listadoEncodeadoEnJson);
    return $response;
});

$app->get('/reserva[/]', function ($request, $response, $args) {
	$datosPost = $request->getQueryParams(); //tomo lo que le mande por parametro y lo parse a php
    $unaReserva = Reserva::TraerUnaReserva($datosPost['reserva']);
    $unaReservaEncodeadaEnJson = json_encode($unaReserva);
    $response->write($unaReservaEncodeadaEnJson);
    return $response;
});

$app->get('/reservasCliente[/]', function ($request, $response, $args) {
	$datosPost = $request->getQueryParams(); //tomo lo que le mande por parametro y lo parse a php
    $unaReserva = Reserva::TraerTodasLasReservasCliente($datosPost['idCliente']);
    $unaReservaEncodeadaEnJson = json_encode($unaReserva);
    $response->write($unaReservaEncodeadaEnJson);
    return $response;
});
$app->get('/reservasUsuario[/]', function ($request, $response, $args) {
	$datosPost = $request->getQueryParams(); //tomo lo que le mande por parametro y lo parse a php
    $unaReserva = Reserva::TraerTodasLasReservasUsuario($datosPost['usuarioLogueado']);
    $unaReservaEncodeadaEnJson = json_encode($unaReserva);
    $response->write($unaReservaEncodeadaEnJson);
    return $response;
});


$app->post('/reserva[/]', function ($request, $response, $args) {
	$datosPost = $request->getQueryParams(); //tomo lo que le mande por parametro y lo parse a php
    //armo el objeto usuario
    $unaReserva = new Reserva();
    $unaReserva->idCliente = $datosPost['idCliente'];    
	$unaReserva->fecha = $datosPost['fecha'];
	$unaReserva->idProducto = $datosPost['idProducto'];
	$unaReserva->tipoProducto = $datosPost['tipoProducto'];
	$unaReserva->fechaDesde = $datosPost['fechaDesde'];
	$unaReserva->fechaHasta = $datosPost['fechaHasta'];
	$unaReserva->usuarioLogueado = $datosPost['usuarioLogueado'];
    Reserva::InsertarReserva($unaReserva);
    $response->write("Reserva insertada con exito -->");
    return $response;
});

$app->post('/reservaCliente[/]', function ($request, $response, $args) {
	$datosPost = $request->getQueryParams(); //tomo lo que le mande por parametro y lo parse a php
    //armo el objeto usuario
    $unaReserva = new Reserva();
    $unaReserva->idCliente = $datosPost['idCliente'];    
	$unaReserva->fecha = $datosPost['fecha'];
	$unaReserva->idProducto = $datosPost['idProducto'];
	$unaReserva->tipoProducto = $datosPost['tipoProducto'];
	$unaReserva->fechaDesde = $datosPost['fechaDesde'];
	$unaReserva->fechaHasta = $datosPost['fechaHasta'];
	$unaReserva->usuarioLogueado = $datosPost['usuarioLogueado'];	
    Reserva::InsertarReservaCliente($unaReserva);
    $response->write("Reserva insertada con exito -->");
    return $response;
});

$app->get('/borrarReserva/{reserva}', function ($request, $response, $args) {
	$datosPost = json_decode($args["reserva"]); 
    Reserva::BorrarReserva($datosPost->reserva);
    $response->write("Eliminado por metodo Get");
    return $response;
});

$app->delete('/reserva/{reserva}', function ($request, $response, $arg) {
    $datosPost = json_decode($arg['reserva']);    
    Reserva::BorrarReserva($datosPost);
    $response->write("Eliminado por metodo Delete");
    return $response;
});


$app->put('/reserva[/]', function ($request, $response, $args) {
    //$datosPost = $request->getQueryParams(); //tomo lo que le mande por parametro y lo parse a php
	$datosPost = $request->getQueryParams();
    // //armo el objeto Local
    $unaReserva = new Reserva();
	$unaReserva->idCliente = $datosPost["idCliente"];
    $unaReserva->fecha = $datosPost["fecha"];
	$unaReserva->idProducto = $datosPost["idProducto"];
	$unaReserva->tipoProducto = $datosPost['tipoProducto'];	
	$unaReserva->fechaDesde = $datosPost['fechaDesde'];
	$unaReserva->fechaHasta = $datosPost['fechaHasta'];
    Reserva::ModificarReserva($unaReserva); 
    //$response->write("Reserva modificado con exito");
	$response->write(json_encode($unaReserva));
    return $response;
});
	
//Estadisticas
//Gráfico 1
	//$app->get('/grafico1/{local}', function ($request, $response, $args) {
	$app->get('/grafico1', function (Request $request, Response $response) {			
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select l.nombre, sum(precio) as precio from Reservas r join Productos p on  p.ID = r.idProducto join ProductosLocales pl on pl.idProducto = p.ID join Locales l on l.ID = pl.idLocal group by pl.idLocal");        
		//$consulta =$objetoAccesoDato->RetornarConsulta("select nombre from Productos");        		
		$consulta->execute();
		$array = $consulta->fetchAll();
		$response -> write(json_encode($array));
		return $response;
		//echo mysql_result($consulta->execute(),0);
		//$resultado = mysql_query('SELECT name FROM work.employee');
		
		//return json_encode($consulta->execute());		
	});	

$app->run();
?>