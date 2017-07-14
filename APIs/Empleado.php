<?php
require_once"AccesoDatos.php";
class Empleado
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id;
	public $nombre;
	public $direccion;
	public $idUsuario;
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
	public function GetIdUsuario()
	{
		return $this->idUsuario;
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
	public function SetIdUsuario($valor)
	{
		$this->idUsuario = $valor;
	}		

//--------------------------------------------------------------------------------//
//--CONSTRUCTOR
	public function __construct($id=NULL)
	{
		if($id != NULL){
			$obj = empleado::TraerUnEmpleado($id);			
			$this->nombre = $obj->nombre;
			$this->direccion = $obj->direccion;
			$this->idUsuario = $obj->idUsuario;			
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
	public static function TraerUnEmpleado($idParametro) 
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from Empleados where id =:id");
        //$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerUnUsuario(:id)");
		$consulta->bindValue(':id', $idParametro, PDO::PARAM_INT);
		$consulta->execute();
		$usuarioBuscada= $consulta->fetchObject('empleados');
		return $usuarioBuscada;						
	}
	
	public static function TraerTodosLosEmpleados()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from Empleados");
		$consulta->execute();			
		$arrempleados= $consulta->fetchAll(PDO::FETCH_CLASS, "empleado");	
		return $arrempleados;
	}
	

	public static function BorrarEmpleado($idParametro)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("DELETE from Empleados WHERE id=:empleado");		
		$consulta->bindValue(':empleado',$idParametro, PDO::PARAM_INT);		
		$consulta->execute();
		return $consulta->rowCount();
		
	}
	
	public static function ModificarEmpleado($empleado)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			
			$consulta =$objetoAccesoDato->RetornarConsulta("UPDATE Empleados set nombre=:nombre, direccion=:direccion, idUsuario=:idUsuario WHERE id=:id");
			$consulta->bindValue(':id',$empleado->id, PDO::PARAM_STR);
			$consulta->bindValue(':nombre',$empleado->nombre, PDO::PARAM_STR);
			$consulta->bindValue(':direccion',$empleado->direccion, PDO::PARAM_STR);
			$consulta->bindValue(':idUsuario',$empleado->idUsuario, PDO::PARAM_STR);
			return $consulta->execute();
	}
//--------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------//
	public static function InsertarEmpleado($empleado)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into Empleados (nombre, direccion, idUsuario)values(:nombre,:direccion, :idUsuario)");
        //$consulta =$objetoAccesoDato->RetornarConsulta("CALL Insertarusuario (:usuario,:password,:dni,:foto)");
		$consulta->bindValue(':nombre',$empleado->nombre, PDO::PARAM_STR);
		$consulta->bindValue(':direccion',$empleado->direccion, PDO::PARAM_STR);
		$consulta->bindValue(':idUsuario', $empleado->idUsuario, PDO::PARAM_STR);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	
				
	}	
}