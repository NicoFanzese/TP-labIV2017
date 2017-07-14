<?php
require_once"AccesoDatos.php";
//require 'Local.php';
class ProductoLocal
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id;
	public $idProducto;
	public $idLocal;
 	
//--------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------//
//--GETTERS Y SETTERS
  	public function GetId()
	{
		return $this->id;
	}
	public function GetIdProducto()
	{
		return $this->idProducto;
	}	
	public function GetIdLocal()
	{
		return $this->idLocal;
	}	
	
	
	public function SetId($valor)
	{
		$this->id = $valor;
	}
	
	public function SetIdProducto($valor)
	{
		$this->idProducto = $valor;
	}	
	public function SetIdLocal($valor)
	{
		$this->idLocal = $valor;
	}	

//--------------------------------------------------------------------------------//
//--CONSTRUCTOR
	public function __construct($id=NULL)
	{
		if($id != NULL){
			$obj = ProductoLocal::TraerProductoLocales($id);			
			$this->id = $obj->id;
			$this->idProducto = $obj->idProducto;			
			$this->idLocal = $obj->idLocal;			
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
	public static function TraerProductoLocales($idParametro) 
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select pl.ID, l.nombre, l.direccion from ProductosLocales pl join Locales l on l.id = pl.idLocal where idProducto =:idProducto");
        //$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerUnUsuario(:id)");
		$consulta->bindValue(':idProducto', $idParametro, PDO::PARAM_INT);
		$consulta->execute();
		/*$productoLocalBuscado= $consulta->fetchObject('ProductoLocal');
		return $productoLocalBuscado;	*/
		$productoLocalBuscado= $consulta->fetchAll(PDO::FETCH_CLASS, "ProductoLocal");	
		return $productoLocalBuscado;		
		/*$arrempleados= $consulta->fetchAll(PDO::FETCH_CLASS, "ProductoLocal");	
		return $arrempleados;*/
		//return $consulta->rowCount();	
		//return $consulta->execute();
	}
		
	public static function BorrarProductoLocal($idParametro)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("DELETE from ProductosLocales WHERE id=:id");		
		$consulta->bindValue(':id',$idParametro, PDO::PARAM_INT);		
		$consulta->execute();
		return $consulta->rowCount();		
	}	
//--------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------//
	public static function InsertarProductoLocal($productoLocal)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into ProductosLocales (idProducto, idLocal)values(:idProducto,:idLocal)");
        //$consulta =$objetoAccesoDato->RetornarConsulta("CALL Insertarusuario (:usuario,:password,:dni,:foto)");
		$consulta->bindValue(':idProducto',$productoLocal->idProducto, PDO::PARAM_STR);
		$consulta->bindValue(':idLocal', $productoLocal->idLocal, PDO::PARAM_STR);		
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	
				
	}	
}