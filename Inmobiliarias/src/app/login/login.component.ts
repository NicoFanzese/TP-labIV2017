import { Component, OnInit } from '@angular/core';
import { ServicioLoginService } from '../servicio-login.service';
import { Router } from '@angular/router';

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
              public router: Router) { }

  ngOnInit() {
  }

  login(){
    console.log(this.username, this.password);
    this.loginService.getLogin(this.username, this.password).subscribe(
      data => this.existeUsuario = data,
      err => {
        console.error(err);
        this.error = true;
      },
      () => console.log("")
    );
    //console.log(this.existeUsuario);
    if (this.existeUsuario == true){
      localStorage.setItem("usuarioLogueado",this.username);      
      this.router.navigate(['/cliente']);
    }
  }

  loginTesteo(){
    localStorage.setItem("usuarioLogueado","Generico");
    this.router.navigate(['/'+this.tipoUsuarioLogin]);
  } 

}
