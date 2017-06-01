import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdministradorComponent } from './administrador/administrador.component';
import { EncargadoComponent } from './encargado/encargado.component';
import { EmpleadoComponent } from './empleado/empleado.component';
import { ClienteComponent } from './cliente/cliente.component';

import { AlertModule } from 'ngx-bootstrap';

import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'cliente', component: ClienteComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: LoginComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdministradorComponent,
    EncargadoComponent,
    EmpleadoComponent,
    ClienteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AlertModule.forRoot(),
    //AlertModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  //rootPage:any = LoginComponent;
}
