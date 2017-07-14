<?php
require_once"AccesoDatos.php";
//require 'Local.php';
class LocalEmpleado
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id;
	public $idLocal;
	public $idEmpleado;
 	
//--------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------//
//--GETTERS Y SETTERS
  	public function GetId()
	{
		return $this->id;
	}
	public function GetIdLocal()
	{
		return $this->idLocal;
	}
	public function GetIdEmpleado()
	{
		return $this->idEmpleado;
	}		
	
	
	public function SetId($valor)
	{
		$this->id = $valor;
	}
	public function SetIdLocal($valor)
	{
		$this->idLocal = $valor;
	}
	public function SetIdEmpleado($valor)
	{
		$this->idEmpleado = $valor;
	}		

//--------------------------------------------------------------------------------//
//--CONSTRUCTOR
	public function __construct($id=NULL)
	{
		if($id != NULL){
			$obj = LocalEmpleado::TraerLocalEmpleados($idLocal);			
			$this->id = $obj->id;
			$this->idLocal = $obj->idLocal;			
			$this->idEmpleado = $obj->idEmpleado;						
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
	public static function TraerLocalEmpleados($idParametro) 
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select le.ID, e.nombre from LocalesEmpleados le join Empleados e on e.id = le.idEmpleado where le.idLocal =:idLocal");
        //$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerUnUsuario(:id)");
		$consulta->bindValue(':idLocal', $idParametro, PDO::PARAM_INT);
		$consulta->execute();
		/*$productoLocalBuscado= $consulta->fetchObject('ProductoLocal');
		return $productoLocalBuscado;	*/
		$localEmpleadoBuscado= $consulta->fetchAll(PDO::FETCH_CLASS, "LocalEmpleado");	
		return $localEmpleadoBuscado;		
		/*$arrempleados= $consulta->fetchAll(PDO::FETCH_CLASS, "ProductoLocal");	
		return $arrempleados;*/
		//return $consulta->rowCount();	
		//return $consulta->execute();
	}
		
	public static function BorrarLocalEmpleado($idParametro)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("DELETE from LocalesEmpleados WHERE id=:id");		
		$consulta->bindValue(':id',$idParametro, PDO::PARAM_INT);		
		$consulta->execute();
		return $consulta->rowCount();		
	}	
//--------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------//
	public static function InsertarLocalEmpleado($localEmpleado)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into LocalesEmpleados (idLocal, idEmpleado)values(:idLocal,:idEmpleado)");
        //$consulta =$objetoAccesoDato->RetornarConsulta("CALL Insertarusuario (:usuario,:password,:dni,:foto)");
		$consulta->bindValue(':idLocal',$localEmpleado->idLocal, PDO::PARAM_STR);
		$consulta->bindValue(':idEmpleado', $localEmpleado->idEmpleado, PDO::PARAM_STR);		
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	
				
	}	
}