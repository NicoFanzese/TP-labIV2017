<?php
require_once"AccesoDatos.php";
//require 'Local.php';
class OfertaProducto
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id;
	public $idOferta;
	public $idProducto;
 	
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
	public function GetIdOferta()
	{
		return $this->idOferta;
	}	
	
	
	public function SetId($valor)
	{
		$this->id = $valor;
	}
	
	public function SetIdProducto($valor)
	{
		$this->idProducto = $valor;
	}	
	public function SetIdOferta($valor)
	{
		$this->idOferta = $valor;
	}	

//--------------------------------------------------------------------------------//
//--CONSTRUCTOR
	public function __construct($id=NULL)
	{
		if($id != NULL){
			$obj = OfertaProducto::TraerOfertaProductos($id);			
			$this->id = $obj->id;
			$this->idOferta = $obj->idOferta;			
			$this->idProducto = $obj->idProducto;						
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
	public static function TraerOfertaProductos($idParametro) 
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select op.ID, p.nombre from OfertasProductos op join Productos p on p.id = op.idProducto where op.idOferta =:idOferta");
        //$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerUnUsuario(:id)");
		$consulta->bindValue(':idOferta', $idParametro, PDO::PARAM_INT);
		$consulta->execute();
		/*$productoLocalBuscado= $consulta->fetchObject('ProductoLocal');
		return $productoLocalBuscado;	*/
		$ofertaProductoBuscado= $consulta->fetchAll(PDO::FETCH_CLASS, "OfertaProducto");	
		return $ofertaProductoBuscado;		
		/*$arrempleados= $consulta->fetchAll(PDO::FETCH_CLASS, "ProductoLocal");	
		return $arrempleados;*/
		//return $consulta->rowCount();	
		//return $consulta->execute();
	}
		
	public static function BorrarOfertaProducto($idParametro)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("DELETE from OfertasProductos WHERE id=:id");		
		$consulta->bindValue(':id',$idParametro, PDO::PARAM_INT);		
		$consulta->execute();
		return $consulta->rowCount();		
	}	
//--------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------//
	public static function InsertarOfertaProducto($ofertaProducto)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into OfertasProductos (idProducto, idOferta)values(:idProducto,:idOferta)");
        //$consulta =$objetoAccesoDato->RetornarConsulta("CALL Insertarusuario (:usuario,:password,:dni,:foto)");
		$consulta->bindValue(':idProducto',$ofertaProducto->idProducto, PDO::PARAM_STR);
		$consulta->bindValue(':idOferta', $ofertaProducto->idOferta, PDO::PARAM_STR);		
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	
				
	}	
}