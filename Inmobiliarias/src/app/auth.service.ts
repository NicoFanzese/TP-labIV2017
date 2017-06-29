import { Injectable } from '@angular/core';
import { AuthHttp, AuthConfig, tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  public name: string;
  private _token: string;
  jwtHelper: JwtHelper = new JwtHelper();
  
  constructor( private router: Router ) {
    this.GuardarToken();
  }

  public isLogued()
  {
    try {
      let rta = tokenNotExpired() || false;
      return rta;
    } catch (error) {
      return false;
    }
  }

  public getToken ()
  {
    try {
      return this.jwtHelper.decodeToken(this._token);
    } catch (error) {
      return undefined;
    }
  }

  public getExpirationDate()
  {
    
    try {
      console.log('getExpirationDate', this.jwtHelper.getTokenExpirationDate(this._token))
      return this.jwtHelper.getTokenExpirationDate(this._token);
    } catch (error) {
      return null;
    }
  }

  public logOut()
  {
    try {
      localStorage.setItem('token', null);         
      this.GuardarToken();  
      this.router.navigate(['/login']); 
      //location.reload();
      //this.router.navigate(['/login']);
    } catch (error) {
      return false;
    }
  }

  public getNivel ()
  {
    // console.log(this.jwtHelper.decodeToken(this._token));
    if (this.jwtHelper.decodeToken(this._token).nivel || this.jwtHelper.decodeToken(this._token).nivel === 0)
      return this.jwtHelper.decodeToken(this._token).nivel;
    else
      return 1000;
    
  }

  public GuardarToken()
  {
    this._token = localStorage.getItem('token');
  }


}
