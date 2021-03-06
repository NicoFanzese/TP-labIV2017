import { Component, OnInit } from '@angular/core';
import { ServicioLoginService } from '../servicio-login.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'; 
import { SpinnerComponentModule } from 'ng2-component-spinner';
// import { RotatingPlaneComponent } from 'ng2-spin-kit/app/spinner/rotating-plane.component'
import { FadingCircleComponent } from 'ng2-spin-kit/app/spinner/fading-circle'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public tipoUsuarioLogin;
  public existeUsuario;
  public username;
  public password;
  public mensaje: string;
  public success: boolean = false;
  public error: boolean = false;
  public operacion: string;
  public show;
  constructor(public loginService: ServicioLoginService,
              public router: Router,
              public authService: AuthService) {

                try {
                  // console.log(localStorage.getItem('token'));
                  // console.log(this.authService.getToken().data['tipo']);
                  // console.log(this.authService.getToken().data['nombre']);                  
                  if (this.authService.getToken().data['nombre']){
                    this.router.navigate(['/'+(this.authService.getToken().data['tipo'])]);
                  }
                } catch (error) {
                
               }
    this.show = false;
  }

  ngOnInit() {
  }

  login(){
    this.show = true;
    console.log(this.username, this.password);

    this.loginService.getLogin(this.username, this.password).subscribe(
    data => {
              if(data != false)
              {
                  console.log(data.token);
                  localStorage.setItem('token', data.token);
                  this.authService.GuardarToken();
                  //this.router.navigate(['/'+(this.authService.getToken().data['tipo'])]);
              }
              else{
                // console.log(data);
                localStorage.setItem('token', "false");
                // console.log(localStorage.getItem('token'));
                //alert("Usuario inexistente");
              }
            },
    err => {
      console.error(err);
      this.error = true;
    },
    () => this.ruteo()
  );
  
 }

  ruteo(){   
    this.show = false;     
       if (localStorage.getItem('token') != "false") {
         console.log(this.authService.getToken().data['usuario']);
         localStorage.setItem("usuarioLogueado",this.authService.getToken().data['usuario']);
         //alert("existe usuario");
         this.router.navigate(['/'+(this.authService.getToken().data['tipo'])]);
       }else{
         alert("no existe usuario");
       }
  }

  loginTesteo(){  
    localStorage.setItem("usuarioLogueado",this.tipoUsuarioLogin + "- Testeo");
    console.log(localStorage.getItem("usuarioLogueado"));
    //localStorage.setItem("usuarioLogueado","Generico");
    this.router.navigate(['/'+this.tipoUsuarioLogin]);
  } 
  
  idBienvenida(){  
    this.router.navigate(['/bienvenida']);
  } 
  irLogin(){      
    this.router.navigate(['/login']);
  }     

  registrarse(){
    this.show = true;      
    this.router.navigate(['/registracion']);
  }

  completarUsuario(){
    if (this.tipoUsuarioLogin == 'administrador'){
      this.username = 'admin'; 
      this.password = 'admin';
    }else if (this.tipoUsuarioLogin == 'encargado'){
      this.username = 'uencargado'; 
      this.password = '123';
    }else if (this.tipoUsuarioLogin == 'cliente'){
      this.username = 'ucliente'; 
      this.password = '123';
    }else if (this.tipoUsuarioLogin == 'empleado'){
      this.username = 'uempleado'; 
      this.password = '123';
    }
  }
}
