import { Component, OnInit } from '@angular/core';
import { ServicioLoginService } from '../servicio-login.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'; 

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

  constructor(public loginService: ServicioLoginService,
              public router: Router,
              public authService: AuthService) {

                try {
                  console.log(localStorage.getItem('token'));
                  console.log(this.authService.getToken().data['tipo']);
                  console.log(this.authService.getToken().data['nombre']);                  
                  if (this.authService.getToken().data['nombre']){
                    this.router.navigate(['/'+(this.authService.getToken().data['tipo'])]);
                  }
                } catch (error) {
                
               }
  }

  ngOnInit() {
  }

  login(){
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
                    console.log(data);
                    localStorage.setItem('token', "false");
                    console.log(localStorage.getItem('token'));
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

}
