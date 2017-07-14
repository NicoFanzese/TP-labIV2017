<?php
require_once"AccesoDatos.php";
class Producto
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id;
	public $nombre;
	public $direccion;
 	public $localidad;
	public $provincia;
	public $pais;
	public $descripcion;
	public $tipo;
	public $vDesde;
	public $vHasta;
	public $foto1;
	public $foto2;
	public $foto3;
	public $moneda;
	public $precio;
	public $lat;
	public $lng;
	public $dirURL;
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
	public function GetDireccion()
	{
		return $this->direccion;
	}		
	public function GetTipo()
	{
		return $this->tipo;
	}
	public function GetVDesde()
	{
		return $this->vDesde;
	}
	public function GetVHasta()
	{
		return $this->vHasta;
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
	public function GetMoneda()
	{
		return $this->moneda;
	}
	public function GetPrecio()
	{
		return $this->precio;
	}	
	public function GetLat()
	{
		return $this->lat;
	}	
	public function GetLng()
	{
		return $this->lng;
	}		
	public function GetDirURL()
	{
		return $this->dirURL;
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
	public function SetDireccion($valor)
	{
		$this->direccion = $valor;
	}		
	public function SetTipo($valor)
	{
		$this->tipo = $valor;
	}
	public function SetVDesde($valor)
	{
		$this->vDesde = $valor;
	}
	public function SetVHasta($valor)
	{
		$this->vHasta = $valor;
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
	public function SetMoneda($valor)
	{
		$this->moneda = $valor;
	}	
	public function SetPrecio($valor)
	{
		$this->precio = $valor;
	}	
	public function SetLat($valor)
	{
		$this->lat = $valor;
	}	
	public function SetLng($valor)
	{
		$this->lng = $valor;
	}		
	public function SetDirURL($valor)
	{
		$this->lng = $dirURL;
	}		
//--------------------------------------------------------------------------------//
//--CONSTRUCTOR
	public function __construct($id=NULL)
	{
		if($id != NULL){
			$obj = producto::TraerUnProducto($id);			
			$this->nombre = $obj->nombre;
			$this->descripcion = $obj->descripcion;			
			$this->direccion = $obj->direccion;	
			$this->tipo = $obj->tipo;	
			$this->vDesde = $obj->vDesde;	
			$this->vHasta = $obj->vHasta;	
			$this->foto1 = $obj->foto1;			
			$this->foto2 = $obj->foto2;			
			$this->foto3 = $obj->foto3;			
			$this->moneda = $obj->moneda;			
			$this->precio = $obj->precio;			
			$this->lat = $obj->lat;		
			$this->lng = $obj->lng;		
			$this->dirURL = $obj->dirURL;					
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
	public static function TraerUnProducto($idParametro) 
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from Productos where id =:id");
        //$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerUnUsuario(:id)");
		$consulta->bindValue(':id', $idParametro, PDO::PARAM_INT);
		$consulta->execute();
		$productoBuscado= $consulta->fetchObject('productos');
		return $productoBuscado;						
	}
	
	public static function TraerTodosLosProductos()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from Productos");
		$consulta->execute();			
		$arrproductos= $consulta->fetchAll(PDO::FETCH_CLASS, "producto");	
		return $arrproductos;
	}
	
	public static function TraerTodosLosProductosLocal($idParametro)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from Productos where ID in (select idProducto from ProductosLocales where idLocal =:idLocal)");
		$consulta->bindValue(':idLocal', $idParametro, PDO::PARAM_INT);		
		$consulta->execute();			
		$arrproductos= $consulta->fetchAll(PDO::FETCH_CLASS, "producto");	
		return $arrproductos;
	}	
	
	public static function BorrarProducto($idParametro)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("DELETE from Productos WHERE id=:producto");		
		$consulta->bindValue(':producto',$idParametro, PDO::PARAM_INT);		
		$consulta->execute();
		return $consulta->rowCount();
		
	}
	
	public static function ModificarProducto($producto)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			
			$consulta =$objetoAccesoDato->RetornarConsulta("UPDATE Productos set nombre=:nombre,descripcion=:descripcion, direccion=:direccion, tipo=:tipo, vDesde=:vDesde, vHasta=:vHasta, foto1=:foto1, foto2=:foto2, foto3=:foto3, moneda=:moneda, precio=:precio, lat=:lat, lng=:lng, dirURL=:dirURL WHERE id=:id");
			$consulta->bindValue(':id',$producto->id, PDO::PARAM_STR);
			$consulta->bindValue(':nombre',$producto->nombre, PDO::PARAM_STR);
			$consulta->bindValue(':descripcion',$producto->descripcion, PDO::PARAM_STR);
			$consulta->bindValue(':direccion',$producto->direccion, PDO::PARAM_STR);
			$consulta->bindValue(':tipo',$producto->tipo, PDO::PARAM_STR);
			$consulta->bindValue(':vDesde',$producto->vDesde, PDO::PARAM_STR);
			$consulta->bindValue(':vHasta',$producto->vHasta, PDO::PARAM_STR);
			$consulta->bindValue(':foto1',$producto->foto1, PDO::PARAM_STR);
			$consulta->bindValue(':foto2',$producto->foto2, PDO::PARAM_STR);
			$consulta->bindValue(':foto3',$producto->foto3, PDO::PARAM_STR);
			$consulta->bindValue(':moneda',$producto->moneda, PDO::PARAM_STR);
			$consulta->bindValue(':precio',$producto->precio, PDO::PARAM_STR);	
			$consulta->bindValue(':lat',$producto->lat, PDO::PARAM_STR);
			$consulta->bindValue(':lng',$producto->lng, PDO::PARAM_STR);	
			$consulta->bindValue(':dirURL',$producto->dirURL, PDO::PARAM_STR);	
		
			return $consulta->execute();
	}
//--------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------//
	public static function InsertarProducto($producto)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into Productos (nombre, descripcion,direccion, tipo, vDesde, vHasta, foto1, foto2, foto3, moneda, precio,lat, lng, dirURL)values(:nombre,:descripcion, :direccion, :tipo, :vDesde, :vHasta, :foto1, :foto2, :foto3, :moneda, :precio, :lat, :lng, :dirURL)");
        //$consulta =$objetoAccesoDato->RetornarConsulta("CALL Insertarusuario (:usuario,:password,:dni,:foto)");
		$consulta->bindValue(':nombre',$producto->nombre, PDO::PARAM_STR);
		$consulta->bindValue(':descripcion', $producto->descripcion, PDO::PARAM_STR);
		$consulta->bindValue(':direccion',$producto->direccion, PDO::PARAM_STR);		
		$consulta->bindValue(':tipo',$producto->tipo, PDO::PARAM_STR);
		$consulta->bindValue(':vDesde',$producto->vDesde, PDO::PARAM_STR);
		$consulta->bindValue(':vHasta',$producto->vHasta, PDO::PARAM_STR);		
		$consulta->bindValue(':foto1', $producto->foto1, PDO::PARAM_STR);
		$consulta->bindValue(':foto2', $producto->foto2, PDO::PARAM_STR);
		$consulta->bindValue(':foto3', $producto->foto3, PDO::PARAM_STR);
		$consulta->bindValue(':moneda', $producto->moneda, PDO::PARAM_STR);
		$consulta->bindValue(':precio', $producto->precio, PDO::PARAM_STR);
		$consulta->bindValue(':lat',$producto->lat, PDO::PARAM_STR);
		$consulta->bindValue(':lng',$producto->lng, PDO::PARAM_STR);		
		$consulta->bindValue(':dirURL',$producto->dirURL, PDO::PARAM_STR);			
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	
				
	}	
}