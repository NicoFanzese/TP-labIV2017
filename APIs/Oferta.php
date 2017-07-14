<?php
require_once"AccesoDatos.php";
class Oferta
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id;
	public $nombre;
	public $descripcion;
 	public $moneda;
	public $precio;
	public $tipo;
	
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
	public function GetDescripcion()
	{
		return $this->descripcion;
	}	
	public function GetMoneda()
	{
		return $this->moneda;
	}
	public function GetPrecio()
	{
		return $this->precio;
	}
	public function GetTipo()
	{
		return $this->tipo;
	}	
	
	public function SetId($valor)
	{
		$this->id = $valor;
	}
	
	public function SetNombre($valor)
	{
		$this->nombre = $valor;
	}	
	public function SetDescripcion($valor)
	{
		$this->descripcion = $valor;
	}	
	public function SetMoneda($valor)
	{
		$this->moneda = $valor;
	}	
	public function SetPrecio($valor)
	{
		$this->precio = $valor;
	}	
	public function SetTipo($valor)
	{
		$this->tipo = $valor;
	}	

//--------------------------------------------------------------------------------//
//--CONSTRUCTOR
	public function __construct($id=NULL)
	{
		if($id != NULL){
			$obj = oferta::TraerUnaOferta($id);			
			$this->nombre = $obj->nombre;
			$this->descripcion = $obj->descripcion;			
			$this->moneda = $obj->moneda;			
			$this->precio = $obj->precio;			
			$this->tipo = $obj->tipo;			
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
	public static function TraerUnaOferta($idParametro) 
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from Ofertas where id =:id");
        //$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerUnUsuario(:id)");
		$consulta->bindValue(':id', $idParametro, PDO::PARAM_INT);
		$consulta->execute();
		$ofertaBuscada= $consulta->fetchObject('ofertas');
		return $ofertaBuscada;						
	}
	
	public static function TraerTodasLasOfertas()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from Ofertas");
		$consulta->execute();			
		$arrofertas= $consulta->fetchAll(PDO::FETCH_CLASS, "oferta");	
		return $arrofertas;
	}
	
	public static function BorrarOferta($idParametro)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("DELETE from Ofertas WHERE id=:oferta");		
		$consulta->bindValue(':oferta',$idParametro, PDO::PARAM_INT);		
		$consulta->execute();
		return $consulta->rowCount();
		
	}
	
	public static function ModificarOferta($oferta)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			
			$consulta =$objetoAccesoDato->RetornarConsulta("UPDATE Ofertas set nombre=:nombre,descripcion=:descripcion, moneda=:moneda, precio=:precio, tipo=:tipo WHERE id=:id");
			$consulta->bindValue(':id',$oferta->id, PDO::PARAM_STR);
			$consulta->bindValue(':nombre',$oferta->nombre, PDO::PARAM_STR);
			$consulta->bindValue(':descripcion',$oferta->descripcion, PDO::PARAM_STR);
			$consulta->bindValue(':moneda',$oferta->moneda, PDO::PARAM_STR);
			$consulta->bindValue(':precio',$oferta->precio, PDO::PARAM_STR);
			$consulta->bindValue(':tipo',$oferta->tipo, PDO::PARAM_STR);
			return $consulta->execute();
	}
//--------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------//
	public static function InsertarOferta($oferta)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into Ofertas (nombre, descripcion, moneda, precio, tipo)values(:nombre,:descripcion, :moneda, :precio, :tipo)");
        //$consulta =$objetoAccesoDato->RetornarConsulta("CALL Insertarusuario (:usuario,:password,:dni,:foto)");
		$consulta->bindValue(':nombre',$oferta->nombre, PDO::PARAM_STR);
		$consulta->bindValue(':descripcion', $oferta->descripcion, PDO::PARAM_STR);
		$consulta->bindValue(':moneda', $oferta->moneda, PDO::PARAM_STR);
		$consulta->bindValue(':precio', $oferta->precio, PDO::PARAM_STR);
		$consulta->bindValue(':tipo', $oferta->tipo, PDO::PARAM_STR);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	
				
	}	
}