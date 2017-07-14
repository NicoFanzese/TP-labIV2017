<?php
$app->post('/uploadFoto[/]', function ($request, $response, $arg) {
		
		$foto = $_FILES[ 'file' ][ 'tmp_name' ];
		$rutaGuardar = "fotos/" . $_FILES[ 'file' ][ 'name' ];
		//Evalúo si existe el archivo, si no existe lo guardo
		if(!file_exists($rutaGuardar))
		{
			if ( !empty( $_FILES ) ) 
			{
				//Guardo la foto nueva
				move_uploaded_file( $foto, $rutaGuardar );
				$response->write("Archivo guardado con éxito!");
			} 
			else
			{
				$response->write("No hay archivos");
			}	
		}
			
		//Si ya existe renombro la foto guardada
		else
		{
			//Obtengo el nombre de la foto con extensión
			$nombre = $_FILES[ 'file' ][ 'name' ];
			//Obtengo la longitud del nombre de la foto
			$long = strlen($nombre);
			//Obtengo la extensión de la imagen
			$ext = pathinfo($rutaGuardar, PATHINFO_EXTENSION);
			//Obtengo el nombre de la foto sin la extensión
			$nombreSinExt = substr($nombre, $long * -1, $long -4 );
			//Guardo la fecha de hoy
			$hoy = date('Y-m-d-H-i-s');
			//Creo la ruta nueva con el nombre de la imagen + _ + fecha de hoy + extensión
			$rutaNueva = "fotos" . DIRECTORY_SEPARATOR . "viejas" . DIRECTORY_SEPARATOR . $nombreSinExt . '_' . $hoy . '.' . $ext;
			//Muevo la foto vieja
			rename($rutaGuardar, $rutaNueva);
			//Guardo la foto nueva
			move_uploaded_file( $foto, $rutaGuardar );
			$response->write("Archivo guardado con éxito!");
		}
    	return $response;
		
	});
	