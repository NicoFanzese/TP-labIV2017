<?php
require_once"AccesoDatos.php";
class local
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id;
	public $nombre;
	public $direccion;
	public $idEncargado;
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
	public function GetDireccion()
	{
		return $this->direccion;
	}
	public function GetIdEncargado()
	{
		return $this->idEncargado;
	}	
	public function GetFoto1()
	{
		return $this->foto1;
	}	
	public function GetFoto2()
	{
		return $this->foto2;
	}		
	public function GetFoto3()
	{
		return $this->foto3;
	}		
	public function SetId($valor)
	{
		$this->id = $valor;
	}
	public function SetNombre($valor)
	{
		$this->nombre = $valor;
	}
	public function SetDireccion($valor)
	{
		$this->direccion = $valor;
	}
	public function SetIdEncargado($valor)
	{
		$this->idEncargado = $valor;
	}	
	public function SetFoto1($valor)
	{
		$this->foto1 = $valor;
	}		
	public function SetFoto2($valor)
	{
		$this->foto2 = $valor;
	}	
	public function SetFoto3($valor)
	{
		$this->foto3 = $valor;
	}		

//--------------------------------------------------------------------------------//
//--CONSTRUCTOR
	public function __construct($id=NULL)
	{
		if($id != NULL){
			$obj = local::TraerUnLocal($id);			
			$this->nombre = $obj->nombre;
			$this->direccion = $obj->direccion;
			$this->idEncargado = $obj->idEncargado;
			$this->foto1 = $obj->foto1;
			$this->foto2 = $obj->foto2;
			$this->foto3 = $obj->foto3;

		}
	}
//--------------------------------------------------------------------------------//
//--TOSTRING	
  	public function ToString()
	{
	  	return $this->id."-".$this->nombre;
	}
//--------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------//
//--METODO DE CLASE
	public static function TraerUnLocal($idParametro) 
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from Locales where id =:id");
        //$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerUnUsuario(:id)");
		$consulta->bindValue(':id', $idParametro, PDO::PARAM_INT);
		$consulta->execute();
		$usuarioBuscada= $consulta->fetchObject('locales');
		return $usuarioBuscada;						
	}
	
	public static function TraerTodosLosLocales()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from Locales");
		$consulta->execute();			
		$arrusuarios= $consulta->fetchAll(PDO::FETCH_CLASS, "local");	
		return $arrusuarios;
	}
	
	public static function BorrarLocal($idParametro)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("DELETE from Locales WHERE id=:local");		
		$consulta->bindValue(':local',$idParametro, PDO::PARAM_INT);		
		$consulta->execute();
		return $consulta->rowCount();
		
	}
	
	public static function ModificarLocal($local)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			
			$consulta =$objetoAccesoDato->RetornarConsulta("UPDATE Locales set nombre=:nombre, direccion=:direccion, idEncargado=:idEncargado, foto1=:foto1, foto2=:foto2, foto3=:foto3  WHERE id=:id");
			$consulta->bindValue(':id',$local->id, PDO::PARAM_STR);
			$consulta->bindValue(':nombre',$local->nombre, PDO::PARAM_STR);
			$consulta->bindValue(':direccion',$local->direccion, PDO::PARAM_STR);
			$consulta->bindValue(':idEncargado',$local->idEncargado, PDO::PARAM_STR);
			$consulta->bindValue(':foto1',$local->foto1, PDO::PARAM_STR);
			$consulta->bindValue(':foto2',$local->foto2, PDO::PARAM_STR);
			$consulta->bindValue(':foto3',$local->foto3, PDO::PARAM_STR);
			return $consulta->execute();
	}
//--------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------//
	public static function InsertarLocal($local)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into Locales (nombre, direccion, idEncargado, foto1, foto2, foto3)values(:nombre,:direccion, :idEncargado, :foto1, :foto2, :foto3)");
        //$consulta =$objetoAccesoDato->RetornarConsulta("CALL Insertarusuario (:usuario,:password,:dni,:foto)");
		$consulta->bindValue(':nombre',$local->nombre, PDO::PARAM_STR);
		$consulta->bindValue(':direccion',$local->direccion, PDO::PARAM_STR);
		$consulta->bindValue(':idEncargado',$local->idEncargado, PDO::PARAM_STR);
		$consulta->bindValue(':foto1',$local->foto1, PDO::PARAM_STR);
		$consulta->bindValue(':foto2',$local->foto2, PDO::PARAM_STR);
		$consulta->bindValue(':foto3',$local->foto3, PDO::PARAM_STR);		
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

}