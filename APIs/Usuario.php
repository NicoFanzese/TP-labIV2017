<?php
require_once"AccesoDatos.php";
class usuario
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id;
	public $nombre;
	public $usuario;
 	public $password;
	public $tipo;
	public $estado;
//--------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------//
//--GETTERS Y SETTERS
  	public function GetId()
	{
		return $this->id;
	}
	public function GetNombre()
	{
		return $this->nombre;
	}		
	public function GetUsuario()
	{
		return $this->usuario;
	}
	public function GetPassword()
	{
		return $this->password;
	}
	public function GetTipo()
	{
		return $this->tipo;
	}
	public function GetEstado()
	{
		return $this->estado;
	}	
	public function SetId($valor)
	{
		$this->id = $valor;
	}
	public function SetNombre($valor)
	{
		$this->nombre = $valor;
	}
	public function SetUsuario($valor)
	{
		$this->usuario = $valor;
	}
	public function SetPassword($valor)
	{
		$this->password = $valor;
	}
	public function SetTipo($valor)
	{
		$this->tipo = $valor;
	}
	public function SetEstado($valor)
	{
		$this->estado = $valor;
	}	

//--------------------------------------------------------------------------------//
//--CONSTRUCTOR
	public function __construct($id=NULL)
	{
		if($id != NULL){
			$obj = usuario::TraerUnUsuario($id);			
			$this->nombre = $obj->nombre;
			$this->usuario = $obj->usuario;
			$this->password = $obj->password;
			$this->tipo = $obj->tipo;			
			$this->estado = $obj->estado;	
		}
	}
//--------------------------------------------------------------------------------//
//--TOSTRING	
  	public function ToString()
	{
	  	return $this->id."-".$this->password."-".$this->usuario."-".$this->nombre."-".$this->tipo;
	}
//--------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------//
//--METODO DE CLASE
	public static function TraerUnUsuario($idParametro) 
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from Usuarios where id =:id");
        //$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerUnUsuario(:id)");
		$consulta->bindValue(':id', $idParametro, PDO::PARAM_INT);
		$consulta->execute();
		$usuarioBuscada= $consulta->fetchObject('usuario');
		return $usuarioBuscada;						
	}
	
	public static function TraerTodosLosUsuarios()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from Usuarios");
		$consulta->execute();			
		$arrusuarios= $consulta->fetchAll(PDO::FETCH_CLASS, "usuario");	
		return $arrusuarios;
	}
	
	public static function TraerTodosLosUsuariosClientes()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from Usuarios where tipo = 'Cliente' ");
		$consulta->execute();			
		$arrclientes= $consulta->fetchAll(PDO::FETCH_CLASS, "usuario");	
		return $arrclientes;
	}
	
	public static function TraerTodosLosUsuariosEmpleados()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from Usuarios where tipo = 'Empleado'");
		/*$consulta =$objetoAccesoDato->RetornarConsulta("select * from Empleados where id not in (Select idEmpleado from LocalesEmpleados) ");*/
		$consulta->execute();			
		//$arrempleados= $consulta->fetchAll(PDO::FETCH_CLASS, "usuario");	
		$arrempleados= $consulta->fetchAll(PDO::FETCH_CLASS, "usuario");	
		return $arrempleados;
	}

	public static function TraerTodosLosUsuariosEncargados()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		/*$consulta =$objetoAccesoDato->RetornarConsulta("select * from Usuarios where tipo = 'Encargado' and usuario not in (select idEncargado from Locales)");*/
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from Usuarios where tipo = 'Encargado'");
		$consulta->execute();			
		$arrempleados= $consulta->fetchAll(PDO::FETCH_CLASS, "usuario");	
		return $arrempleados;
	}	
	
	public static function BorrarUsuario($idParametro, $idParametro2)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("DELETE from Usuarios WHERE id=:usuario");		
		$consulta->bindValue(':usuario',$idParametro, PDO::PARAM_INT);	
		$consulta->execute();
		return $consulta->rowCount();
		
	}
	
	public static function ModificarUsuario($usuario)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			
			$consulta =$objetoAccesoDato->RetornarConsulta("UPDATE Usuarios set nombre=:nombre, usuario=:usuario, password=:password, tipo=:tipo, estado=:estado WHERE id=:id");
			$consulta->bindValue(':id',$usuario->id, PDO::PARAM_STR);
			$consulta->bindValue(':nombre',$usuario->nombre, PDO::PARAM_STR);
			$consulta->bindValue(':usuario',$usuario->usuario, PDO::PARAM_STR);
			$consulta->bindValue(':password', $usuario->password, PDO::PARAM_STR);
			$consulta->bindValue(':tipo',$usuario->tipo, PDO::PARAM_STR);
			$consulta->bindValue(':estado',$usuario->estado, PDO::PARAM_STR);
			return $consulta->execute();
	}
//--------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------//
	public static function InsertarUsuario($usuario)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into Usuarios (nombre, usuario, password, tipo,estado)values(:nombre,:usuario,:password,:tipo,:estado)");
        //$consulta =$objetoAccesoDato->RetornarConsulta("CALL Insertarusuario (:usuario,:password,:dni,:foto)");
		$consulta->bindValue(':nombre',$usuario->nombre, PDO::PARAM_STR);
		$consulta->bindValue(':usuario',$usuario->usuario, PDO::PARAM_STR);
		$consulta->bindValue(':password', $usuario->password, PDO::PARAM_STR);
		$consulta->bindValue(':tipo', $usuario->tipo, PDO::PARAM_STR);
		$consulta->bindValue(':estado', $usuario->estado, PDO::PARAM_STR);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	
				
	}	

	/*public static function EstaRegistrado($usuario) 
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from Usuarios where usuario = :usuario and password = :password");
        //$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerUnUsuario(:id)");
		$consulta->bindValue(':usuario', $usuario->usuario, PDO::PARAM_STR);
		$consulta->bindValue(':password', $usuario->password, PDO::PARAM_STR);
		$consulta->execute();
		$usuarioBuscado= $consulta->fetchObject('usuario');

		if($usuarioBuscado != false)
			$usuarioBuscado = true;

		return $usuarioBuscado;						
	}*/
	public static function EstaRegistrado($idParametro, $idParametro2) 
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from Usuarios where usuario = :usuario and password = :password");
        //$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerUnUsuario(:id)");
		$consulta->bindValue(':usuario',$idParametro, PDO::PARAM_INT);	
		$consulta->bindValue(':password',$idParametro2, PDO::PARAM_INT);	
		$consulta->execute();
		$usuarioBuscado= $consulta->fetchObject('usuario');

		// if($usuarioBuscado != false)
		// 	$usuarioBuscado = true;

		return $usuarioBuscado;						
	}
}