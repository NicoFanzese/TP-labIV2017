<?php
require_once"AccesoDatos.php";
class Cliente
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id;
	public $nombre;
	public $mail;
	public $telefono;
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
	public function GetMail()
	{
		return $this->mail;
	}		
	public function GetTelefono()
	{
		return $this->telefono;
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
	public function SetMail($valor)
	{
		$this->mail = $valor;
	}
	public function SetTelefono($valor)
	{
		$this->telefono = $valor;
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
			$obj = cliente::TraerUnCliente($id);			
			$this->nombre = $obj->nombre;
			$this->mail = $obj->mail;
			$this->telefono = $obj->telefono;
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
	public static function TraerUnCliente($idParametro) 
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from Clientes where id =:id");
        //$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerUnUsuario(:id)");
		$consulta->bindValue(':id', $idParametro, PDO::PARAM_INT);
		$consulta->execute();
		$clienteBuscado= $consulta->fetchObject('clientes');
		return $clienteBuscado;						
	}
	
	public static function TraerTodosLosClientes()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from Clientes");
		$consulta->execute();			
		$arrclientes= $consulta->fetchAll(PDO::FETCH_CLASS, "cliente");	
		return $arrclientes;
	}
	
	
	public static function BorrarCliente($idParametro)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("DELETE from Clientes WHERE id=:cliente");		
		$consulta->bindValue(':cliente',$idParametro, PDO::PARAM_INT);		
		$consulta->execute();
		return $consulta->rowCount();
		
	}
	
	public static function ModificarCliente($cliente)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			
			$consulta =$objetoAccesoDato->RetornarConsulta("UPDATE Clientes set nombre=:nombre, mail=:mail, telefono=:telefono, direccion=:direccion, idUsuario=:idUsuario WHERE id=:id");
			$consulta->bindValue(':id',$cliente->id, PDO::PARAM_STR);
			$consulta->bindValue(':nombre',$cliente->nombre, PDO::PARAM_STR);
			$consulta->bindValue(':mail',$cliente->mail, PDO::PARAM_STR);
			$consulta->bindValue(':telefono',$cliente->telefono, PDO::PARAM_STR);
			$consulta->bindValue(':direccion',$cliente->direccion, PDO::PARAM_STR);
			$consulta->bindValue(':idUsuario',$cliente->idUsuario, PDO::PARAM_STR);
			return $consulta->execute();
	}
//--------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------//
	public static function InsertarCliente($Cliente)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into Clientes (nombre, mail, telefono, direccion,idUsuario)values(:nombre,:mail, :telefono,:direccion,:idUsuario)");
        //$consulta =$objetoAccesoDato->RetornarConsulta("CALL Insertarusuario (:usuario,:password,:dni,:foto)");
		$consulta->bindValue(':nombre',$Cliente->nombre, PDO::PARAM_STR);
		$consulta->bindValue(':mail',$Cliente->mail, PDO::PARAM_STR);
		$consulta->bindValue(':telefono',$Cliente->telefono, PDO::PARAM_STR);
		$consulta->bindValue(':direccion',$Cliente->direccion, PDO::PARAM_STR);
		$consulta->bindValue(':idUsuario',$Cliente->idUsuario, PDO::PARAM_STR);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	
				
	}	
}