<?php        
    header('Access-Control-Allow-Origin: *');

	$local = $_POST["local"];

    $servername = "mysql.hostinger.com.ar";
    $username = "u641113296_nsf";
	$password = "octavio";
	$dbname = "u641113296_lab4";

	$enlace = mysqli_connect($servername, $username, $password,$dbname);

	if (!$enlace) {
		echo "Error: No se pudo conectar a MySQL." . PHP_EOL;		
		exit;
	}else{
		$select = "select l.nombre, sum(precio) as total from Reservas r join Productos p on  p.ID = r.idProducto join ProductosLocales pl on pl.idProducto = p.ID join Locales l on l.ID = pl.idLocal group by pl.idLocal";
		   
       	$result = $enlace->query($select);			

        if ($result->num_rows > 0) {        
	        while($row = $result->fetch_assoc()) {                    
                $arr[] =  array ('Local'=>$row["nombre"],
                                 'Total'=>$row["total"]
                                );
            }
            $data= json_encode($arr);
            echo $data;
        }
		else{
			 echo "No hay datos";
		}
	$enlace->close();
	}

?>