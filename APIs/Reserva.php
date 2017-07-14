<?php
require_once"AccesoDatos.php";
class Reserva
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id;
	public $idCliente;
	public $fecha;
 	public $idProducto;
	public $tipoProducto;
	public $fechaDesde;
	public $fechaHasta;
	    
//--------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------//
//--GETTERS Y SETTERS
  	public function GetId()
	{
		return $this->id;
	}
	public function GetIdCliente()
	{
		return $this->idCliente;
	}	
	public function GetFecha()
	{
		return $this->fecha;
	}	
	public function GetIdProducto()
	{
		return $this->idProducto;
	}
	public function GetTipoProducto()
	{
		return $this->tipoProducto;
	}
	public function GetFechaDesde()
	{
		return $this->fechaDesde;
	}	
	public function GetFechaHasta()
	{
		return $this->fechaHasta;
	}	
	
	public function SetId($valor)
	{
		$this->id = $valor;
	}
	
	public function SetIdCliente($valor)
	{
		$this->idCliente = $valor;
	}	
	public function SetFecha($valor)
	{
		$this->fecha = $valor;
	}	
	public function SetIdProducto($valor)
	{
		$this->idProducto = $valor;
	}	
	public function SetTipoProducto($valor)
	{
		$this->tipoProducto = $valor;
	}	
	public function SetFechaDesde($valor)
	{
		$this->fechaDesde = $valor;
	}	
	public function SetFechaHasta($valor)
	{
		$this->fechaHasta = $valor;
	}	
	
//--------------------------------------------------------------------------------//
//--CONSTRUCTOR
	public function __construct($id=NULL)
	{
		if($id != NULL){
			$obj = Reserva::TraerUnaReserva($id);			
			$this->idCliente = $obj->idCliente;
			$this->fecha = $obj->fecha;			
			$this->idProducto = $obj->idProducto;			
			$this->tipoProducto = $obj->tipoProducto;			
			$this->fechaDesde = $obj->fechaDesde;			
			$this->fechaHasta = $obj->fechaHasta;			
		}
	}
//--------------------------------------------------------------------------------//
//--TOSTRING	
  	public function ToString()
	{
	  	return $this->id."-".$this->idCliente."-".$this->idProducto;
	}
//--------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------//
//--METODO DE CLASE
	public static function TraerUnaReserva($idParametro) 
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from Reservas where id =:id");
        //$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerUnUsuario(:id)");
		$consulta->bindValue(':id', $idParametro, PDO::PARAM_INT);
		$consulta->execute();
		$ofertaBuscada= $consulta->fetchObject('reservas');
		return $ofertaBuscada;						
	}
	
	public static function TraerTodasLasReservas()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT r.id, r.idCLiente, IfNULL((select nombre from Clientes where ID = r.idCliente),'Generico') as Cliente, p.nombre, p.direccion, p.tipo, r.fechaDesde, r.fechaHasta FROM Reservas r join Productos p on r.idProducto = p.id ");
		$consulta->execute();			
		$arrofertas= $consulta->fetchAll(PDO::FETCH_CLASS, "reserva");	
		return $arrofertas;
	}

	public static function TraerTodasLasReservasCliente($idParametro)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select p.nombre, p.direccion, r.tipoProducto, r.fechaDesde, r.fechaHasta from Reservas r join Productos p on p.ID = r.idProducto where idCLiente=:idCliente");
		$consulta->bindValue(':idCliente', $idParametro, PDO::PARAM_INT);		
		$consulta->execute();			
		$arrofertas= $consulta->fetchAll(PDO::FETCH_CLASS, "reserva");	
		return $arrofertas;
	}	
	public static function TraerTodasLasReservasUsuario($idParametro)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select p.nombre, p.direccion, r.tipoProducto, r.fechaDesde, r.fechaHasta from Reservas r join Productos p on p.ID = r.idProducto where usuarioLogueado=:usuarioLogueado");
		$consulta->bindValue(':usuarioLogueado', $idParametro, PDO::PARAM_INT);		
		$consulta->execute();			
		$arrofertas= $consulta->fetchAll(PDO::FETCH_CLASS, "reserva");	
		return $arrofertas;
	}		
	
	public static function BorrarReserva($idParametro)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("DELETE from Reservas WHERE id=:id");		
		$consulta->bindValue(':id',$idParametro, PDO::PARAM_INT);		
		$consulta->execute();
		return $consulta->rowCount();
		
	}
	
	public static function ModificarReserva($reserva)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		
		$consulta =$objetoAccesoDato->RetornarConsulta("UPDATE Reservas set idCliente=:idCliente, fechaDesde=:fechaDesde, fechaHasta=:fechaHasta WHERE id=:id");
		$consulta->bindValue(':id',$reserva->id, PDO::PARAM_STR);
		$consulta->bindValue(':idCliente',$reserva->idCliente, PDO::PARAM_STR);
		$consulta->bindValue(':fechaDesde',$reserva->fechaDesde, PDO::PARAM_STR);
		$consulta->bindValue(':fechaHasta',$reserva->fechaHasta, PDO::PARAM_STR);			
		return $consulta->execute();
	}
//--------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------//
	public static function InsertarReserva($reserva)
	{
		//substring(NOW(),1,10)
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		//$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into Reservas (idCliente, fecha, idProducto, tipoProducto, fechaDesde,fechaHasta)values(:idCliente,:fecha, :idProducto, :tipoProducto, :fechaDesde, :fechaHasta)");
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into Reservas (idCliente, fecha, idProducto, tipoProducto, fechaDesde,fechaHasta, usuarioLogueado)values(:idCliente,:fecha, :idProducto, :tipoProducto, :fechaDesde, :fechaHasta, :usuarioLogueado)");
		$consulta->bindValue(':idCliente',$reserva->idCliente, PDO::PARAM_STR);
		$consulta->bindValue(':fecha', $reserva->fecha, PDO::PARAM_STR);
		$consulta->bindValue(':idProducto', $reserva->idProducto, PDO::PARAM_STR);
		$consulta->bindValue(':tipoProducto', $reserva->tipoProducto, PDO::PARAM_STR);
		$consulta->bindValue(':fechaDesde', $reserva->fechaDesde, PDO::PARAM_STR);
		$consulta->bindValue(':fechaHasta',$reserva->fechaHasta, PDO::PARAM_STR);			
		$consulta->bindValue(':usuarioLogueado',$reserva->usuarioLogueado, PDO::PARAM_STR);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();				
	}	
	
	public static function InsertarReservaCliente($reserva)
	{
		//substring(NOW(),1,10)
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		//$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into Reservas (idCliente, fecha, idProducto, tipoProducto, fechaDesde,fechaHasta)values(:idCliente,:fecha, :idProducto, :tipoProducto, :fechaDesde, :fechaHasta)");
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into Reservas (idCLiente, fecha, idProducto, tipoProducto, fechaDesde,fechaHasta, usuarioLogueado)values((select ID from Clientes where nombre=:idCliente),:fecha, :idProducto, :tipoProducto, :fechaDesde, :fechaHasta, :usuarioLogueado)");
		$consulta->bindValue(':idCliente',$reserva->idCliente, PDO::PARAM_STR);
		$consulta->bindValue(':fecha', $reserva->fecha, PDO::PARAM_STR);
		$consulta->bindValue(':idProducto', $reserva->idProducto, PDO::PARAM_STR);
		$consulta->bindValue(':tipoProducto', $reserva->tipoProducto, PDO::PARAM_STR);
		$consulta->bindValue(':fechaDesde', $reserva->fechaDesde, PDO::PARAM_STR);
		$consulta->bindValue(':fechaHasta',$reserva->fechaHasta, PDO::PARAM_STR);			
		$consulta->bindValue(':usuarioLogueado',$reserva->usuarioLogueado, PDO::PARAM_STR);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();				
	}	

	
}