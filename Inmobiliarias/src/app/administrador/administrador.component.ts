import { Component, OnInit } from '@angular/core';
import { ServicioUsuariosService } from '../servicio-usuarios.service';
import { Usuario } from '../../clases/usuario.class';
import { ServicioLocalesService } from '../servicio-locales.service';
import { Local } from '../../clases/local.class';
import { EmpleadoLocal } from '../../clases/empleadoLocal.class';
import { ServicioEmpleadosService } from '../servicio-empleados.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ServicioEstadisticasService } from '../servicio-estadisticas.service';

import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { CarouselModule } from 'ngx-bootstrap';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { SpinnerComponentModule } from 'ng2-component-spinner';
// import { RotatingPlaneComponent } from 'ng2-spin-kit/app/spinner/rotating-plane.component'
import { FadingCircleComponent } from 'ng2-spin-kit/app/spinner/fading-circle'

const URL = 'http://nfranzeseutn.hol.es/miAPIRest/index.php/uploadFoto';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {
  public contImagen;    

  public usuarios;
  public nombreUsuarioAdministrador: string;
  public usuarioUsuarioAdministrador: string;
  public passwordUsuarioAdministrador: string;
  public tipoUsuarioAdministrador: any;
  public idUsuarioAdministrador: any;
  public estadoUsuarioAdministrador: any;

  public locales;
  public idLocalAdministrador: any;
  public nombreLocalAdministrador: any;
  public direccionLocalAdministrador: any;
  public usuariosEncargados: any;
  public encargadoLocalAdministrador: any;
  public foto1LocalAdministrador: any;
  public foto2LocalAdministrador: any;
  public foto3LocalAdministrador: any;
  public empleadosLocales;
  public localEmpleado;
  public idLocalEmpleado;
  public EmpleadoLocalAdministrador;
  public empleados;

  public mensaje: string;
  public success: boolean = false;
  public error: boolean = false;
  public operacion: string;

  public uploaderLocal:FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;

  public show;

 //graficos
  public graficoUno;
  public localesG1;

  //Fileupload
  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
 
  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }

  constructor(public usuarioService: ServicioUsuariosService, 
              public localService: ServicioLocalesService,
              public empleadoService: ServicioEmpleadosService,
              public router: Router,
              public authService: AuthService,
              public estadisticasService: ServicioEstadisticasService) {
    this.show = false;                
    this.TraerUsuarios();
    this.TraerLocales();
    this.TraerUsuariosLocales();
    this.TraerEmpleados();    
    //this.TraerLocalesG1();
    this.getGrafico1();

    this.uploaderLocal.onBeforeUploadItem=(item)=>
    {
      //Extraigo el nombre de la imagen, luego la extensión.
      ///console.log((this.TomarUltimoId() + "") + '.' + extension);
      //Le asigno un nuevo nombre a la imagen compuesta por el proximo id de la tabla
      //console.log(item['file']);
      console.log(this.contImagen);
          
      if (this.contImagen == 1){       
          console.log("entró 1");     
          this.foto1LocalAdministrador = item['file'].name;
          this.contImagen = this.contImagen + 1;  
          item.withCredentials = false;   
      }else if (this.contImagen == 2){
        console.log("entró 2");
        this.foto2LocalAdministrador = item['file'].name;
        this.contImagen = this.contImagen + 1;  
        item.withCredentials = false;           
      }else if (this.contImagen == 3){
        console.log("entró 3");
        this.foto3LocalAdministrador = item['file'].name;        
        //this.contImagen = 1;
        item.withCredentials = false;   
      }
    
    }
  }

  ngOnInit() {
  }

  MostrarLocales() {
    document.getElementById("LocalesAdministrador").style.display = "inline";
    document.getElementById("altaEmpleadosLocalesAdministrador").style.display = "none";      
    document.getElementById("UsuariosAdministrador").style.display = "none";
    document.getElementById("EstadisticasAdministrador").style.display = "none";
    this.TraerUsuariosLocales();
    this.TraerEmpleados();
  }
  MostrarUsuarios() {    
    document.getElementById("LocalesAdministrador").style.display = "none";
    document.getElementById("altaEmpleadosLocalesAdministrador").style.display = "none";          
    document.getElementById("UsuariosAdministrador").style.display = "inline";
    document.getElementById("EstadisticasAdministrador").style.display = "none";
  }
  MostrarEstadisticas() {
    document.getElementById("LocalesAdministrador").style.display = "none";
    document.getElementById("altaEmpleadosLocalesAdministrador").style.display = "none";          
    document.getElementById("UsuariosAdministrador").style.display = "none";
    document.getElementById("EstadisticasAdministrador").style.display = "inline";
  }
  altaUsuario() {
    this.operacion = "Insertar";
    document.getElementById("altaUsuariosAdministrador").style.display = "inline";
  }
  altaLocal() {
    this.operacion = "Insertar";
    document.getElementById("altaLocalesAdministrador").style.display = "inline";
    this.foto1LocalAdministrador="";
    this.foto2LocalAdministrador="";
    this.foto3LocalAdministrador="";
  }

  //USUARIOS
  TraerUsuarios() {
    this.usuarioService.getUsuarios().subscribe(
      data => this.usuarios = data,
      err => {
        console.error(err);
        this.error = true;
        this.show = false;        
      },
      () => {console.log("Usuarios traidos con éxito");       this.show = false;}
    );
  }

  deleteUsuario(id: number) {
    this.show = true;    
    this.usuarioService.deleteUsuario(id).subscribe(
      data => console.info('Id: ${data.id} borrado con éxito'),
      err => {console.error(err)},
      () => {console.info('éxito'); this.TraerUsuarios()}
    );
    this.TraerUsuarios();
  }

  mostrarUsuario(id, nom, usu, pass, tipo,est) {
    this.operacion = "Modificar";
    this.idUsuarioAdministrador = id;
    this.nombreUsuarioAdministrador = nom;
    this.usuarioUsuarioAdministrador = usu;
    this.passwordUsuarioAdministrador = pass;
    this.tipoUsuarioAdministrador = tipo;
    console.log(est);
    if((est == "true") || (est == 1)){
      this.estadoUsuarioAdministrador = 1;
    }else{
      this.estadoUsuarioAdministrador = 0;
    }
    
    document.getElementById("altaUsuariosAdministrador").style.display = "inline";
  }

  CancelarUsuario() {
    document.getElementById("altaUsuariosAdministrador").style.display = "none";
    this.nombreUsuarioAdministrador = "";
    this.usuarioUsuarioAdministrador = "";
    this.passwordUsuarioAdministrador = "";
    this.tipoUsuarioAdministrador = "";
    this.estadoUsuarioAdministrador = false;
    this.show = false;       
  }

  GuardarUsuario() {
    this.show = true;    
    console.log(this.estadoUsuarioAdministrador);
    if (((this.nombreUsuarioAdministrador == "") || (this.nombreUsuarioAdministrador == undefined) || (this.nombreUsuarioAdministrador == null)) ||
      ((this.usuarioUsuarioAdministrador == "") || (this.usuarioUsuarioAdministrador == undefined) || (this.usuarioUsuarioAdministrador == null)) ||
      ((this.passwordUsuarioAdministrador == "") || (this.passwordUsuarioAdministrador == undefined) || (this.passwordUsuarioAdministrador == null)) ||
      ((this.tipoUsuarioAdministrador == "") || (this.tipoUsuarioAdministrador == undefined) || (this.tipoUsuarioAdministrador == null))) {
        alert("Los Datos en pantalla son obligatorios");
        this.show = false;     
    } else {
      if (this.operacion == "Insertar") {
        if((this.estadoUsuarioAdministrador == "true") || (this.estadoUsuarioAdministrador == 1)){
          this.estadoUsuarioAdministrador = 1;
        }else{
          this.estadoUsuarioAdministrador = 0;
        }
        let objUsuario: Usuario = new Usuario(0, this.nombreUsuarioAdministrador, this.usuarioUsuarioAdministrador, this.passwordUsuarioAdministrador, this.tipoUsuarioAdministrador, this.estadoUsuarioAdministrador);
        //console.log(objUsuario);
        /*this.usuarioService.GuardarUsuario(objUsuario).subscribe(
          data => {
                    console.log("Usuario insertado");
                    this.mensaje = "Usuario agregado con éxito.";
                    this.CancelarUsuario();
                  },
          err => {  
                    console.error(err);
                    this.mensaje = "No se pudo agregar al usuario, por favor verifique los campos y su conexión a internet.";
                    this.error = true;
                  },
            () => this.TraerUsuarios()
        );*/
        this.usuarioService.GuardarUsuario(objUsuario).subscribe();

        this.TraerUsuarios();  
        this.TraerUsuarios();          
        this.CancelarUsuario();    
        /*this.usuarioService.GuardarUsuario(objUsuario).subscribe(
          data => console.info(`Id: ${data.usuario} Insertado con éxito`),
          err => console.error(err),
          () => this.TraerUsuarios()
        );*/
      } else if (this.operacion == "Modificar") {
        if((this.estadoUsuarioAdministrador == "true") || (this.estadoUsuarioAdministrador == 1)){
          this.estadoUsuarioAdministrador = 1;
        }else{
          this.estadoUsuarioAdministrador = 0;
        }

        let objUsuario: Usuario = new Usuario(this.idUsuarioAdministrador, this.nombreUsuarioAdministrador, this.usuarioUsuarioAdministrador, this.passwordUsuarioAdministrador, this.tipoUsuarioAdministrador, this.estadoUsuarioAdministrador);
        this.usuarioService.putUsuario(objUsuario).subscribe();
        this.TraerUsuarios();  
        this.TraerUsuarios();          
        this.CancelarUsuario();        
      }
      this.TraerUsuarios();  
      this.CancelarUsuario();
      this.show = false;
    }

  }

  exportarAExcelUsuarios(){    
    this.show = true;    
    console.log(this.usuarios);
    var options = { 
      fieldSeparator: ';',
      quoteStrings: '',
      decimalseparator: '.',
      showLabels: true, 
      showTitle: false,
      useBom: true
    };

    new Angular2Csv(this.usuarios, 'usuarios', options);
    this.TraerUsuarios();    
  }  

    //LOCALES
  TraerLocales() {
    this.localService.getLocales().subscribe(
      data => this.locales = data,
      err => {
        console.error(err);
        this.error = true;
        this.show = false;
      },
      () => {console.log("Locales traidos con éxito"); this.show = false;}
    );
  }

  TraerUsuariosLocales() {
    this.localService.getUsuariosEncargados().subscribe(
      data => this.usuariosEncargados = data,
      err => {
        console.error(err);
        this.error = true;
      },
      () => console.log("usuarios traidos con éxito")
    );
  }  


  deleteLocal(id: number) {
    this.show = true;
    this.localService.deleteLocal(id).subscribe(
      data => console.info('Id: ${data.id} borrado con éxito'),
      err => {console.error(err); this.show = false;},
      () => {console.info('éxito'); this.show = false;this.TraerLocales();}
    );
    this.TraerLocales();
  }

  mostrarLocal(id, nom, dir, enc, f1, f2, f3) {
    this.operacion = "Modificar";
    this.idLocalAdministrador = id;
    this.nombreLocalAdministrador = nom;
    this.direccionLocalAdministrador = dir;
    this.encargadoLocalAdministrador = enc;
    this.foto1LocalAdministrador = f1;
    this.foto2LocalAdministrador = f2;
    this.foto3LocalAdministrador = f3;    
    document.getElementById("altaLocalesAdministrador").style.display = "inline";
  }

  CancelarLocal() {
    document.getElementById("altaLocalesAdministrador").style.display = "none";
    this.idLocalAdministrador = "";
    this.nombreLocalAdministrador = "";
    this.direccionLocalAdministrador = "";
    this.encargadoLocalAdministrador = "";
    this.foto1LocalAdministrador = "";
    this.foto2LocalAdministrador = "";
    this.foto3LocalAdministrador = "";    
    this.uploaderLocal.clearQueue();    
    this.show = false;           
  }

    subirImagenesLocal() {
        this.contImagen = 1;
        this.foto1LocalAdministrador = "";
        this.foto2LocalAdministrador ="";
        this.foto3LocalAdministrador ="";
        this.uploaderLocal.uploadAll();      
        //this.uploader.clearQueue();
        //document.getElementById("fileUploadFotos").innerHTML="";
    }

  GuardarLocal() {
    this.show = true;    

    if (((this.nombreLocalAdministrador == "") || (this.nombreLocalAdministrador == undefined) || (this.nombreLocalAdministrador == null)) ||
      ((this.direccionLocalAdministrador == "") || (this.direccionLocalAdministrador == undefined) || (this.direccionLocalAdministrador == null))) {
        alert("Los Datos en pantalla son obligatorios");
        this.show = false;        
    } else {
      if (this.operacion == "Insertar") {
        let objLocal: Local = new Local(0, this.nombreLocalAdministrador, this.direccionLocalAdministrador, this.encargadoLocalAdministrador, this.foto1LocalAdministrador, this.foto2LocalAdministrador, this.foto3LocalAdministrador);
        this.localService.GuardarLocal(objLocal).subscribe();
        this.TraerLocales();
        this.CancelarLocal();
        this.uploaderLocal.clearQueue();
      } else if (this.operacion == "Modificar") {
        let objLocal: Local = new Local(this.idLocalAdministrador, this.nombreLocalAdministrador, this.direccionLocalAdministrador, this.encargadoLocalAdministrador, this.foto1LocalAdministrador, this.foto2LocalAdministrador, this.foto3LocalAdministrador);
        console.log("se va a modificar: " + objLocal);
        this.localService.putLocal(objLocal).subscribe();        
        this.TraerLocales();
        this.CancelarLocal();
        this.uploaderLocal.clearQueue();        
      }
    }
  }

  exportarAExcelLocales(){  
    this.show = true;      
    console.log(this.locales);
    var options = { 
      fieldSeparator: ';',
      quoteStrings: '',
      decimalseparator: '.',
      showLabels: true, 
      showTitle: false,
      useBom: true
    };

    new Angular2Csv(this.locales, 'locales', options);
    this.TraerLocales();
  }  

//DETALLE EMPLEADO
  TraerEmpleados() {
    this.empleadoService.getEmpleados().subscribe(
      data => this.empleados = data,
      err => {
        console.error(err);
        this.error = true;
      },
      () => console.log("Empleados traidos con éxito")
    );
  }

  getDetalleEmpleadosLocales(id: number) {
    this.localService.getDetalleEmpleadosLocales(id).subscribe(
      data => this.empleadosLocales = data,
      err => {
        console.error(err);
        this.error = true;
        this.show = false;
      },
      () => {console.log("empleados de Local traidos con éxito");
          this.show = false;}
    );
    console.log("Empleados:" +this.empleadosLocales);
  }

agregarEmpleadosLocal(id, nom){
    this.show = true;  
    console.log(id);
    document.getElementById("altaEmpleadosLocalesAdministrador").style.display = "inline";
    document.getElementById("altaLocalesAdministrador").style.display = "none";    
    this.localEmpleado = nom;
    this.idLocalEmpleado = id;
    this.getDetalleEmpleadosLocales(id);    
  }

  AddEmpleadoLocal() {
    this.show = true;    

    if ((this.EmpleadoLocalAdministrador == "") || (this.EmpleadoLocalAdministrador == undefined) || (this.EmpleadoLocalAdministrador == null)) {
        alert("Debe elegir un empleado en el Combo de empleados");
    } else {   
        let objEmpleadoLocal: EmpleadoLocal = new EmpleadoLocal(0, this.idLocalEmpleado, this.EmpleadoLocalAdministrador);
        console.log(this.localService);
        this.localService.GuardarEmpleadoLocal(objEmpleadoLocal).subscribe();  
    }    
    this.getDetalleEmpleadosLocales(this.idLocalEmpleado);     
  }
  
  deleteEmpleadoLocal(id: number) {
    this.show = true;    
    this.localService.deleteEmpleadoLocal(id).subscribe(
      data => console.info('Id: ${data.id} borrado con éxito'),
      err => console.error(err),
      () => {console.info('éxito'); this.getDetalleEmpleadosLocales(this.idLocalEmpleado);}
    )
    this.getDetalleEmpleadosLocales(this.idLocalEmpleado);
  }

  CerrarEmpleadoLocal(){
     document.getElementById("altaEmpleadosLocalesAdministrador").style.display = "none";
  }

  desloguearse()
  {
    this.authService.logOut();
    // this.router.navigate(['/login']);
  }


//Gráficos
  TraerLocalesG1() {
    this.localService.getLocales().subscribe(
      data => this.localesG1 = data,
      err => {
        console.error(err);
        this.error = true;
      },
      () => console.log("Locales traidos con éxito")
    );
  }
// lineChart
  public lineChartLabels;
  public lineChartData:Array<any>;
  // public lineChartData:Array<any> = [
  //   {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
  //   {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
  //   {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
  // ];
  // public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';
 
  public randomize():void {
    let _lineChartData:Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }
 
  // events
  // public chartClicked(e:any):void {
  //   console.log(e);
  // }
 MostrarG1(local){
   console.log(local);
   this.lineChartLabels = [local];
   this.getGrafico1();
 }

  getGrafico1() {
    this.estadisticasService.getGrafico1().subscribe(
      data => this.lineChartData = data,
      err => {
        console.error(err);
        this.error = true;
      },
      () => console.log("empleados de Local traidos con éxito")
    );
    console.log("Empleados:" +this.empleadosLocales);
  }


  public chartHovered(e:any):void {
    console.log(e);
  }
}
