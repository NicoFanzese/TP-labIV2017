import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdministradorComponent } from './administrador/administrador.component';
import { EncargadoComponent } from './encargado/encargado.component';
import { EmpleadoComponent } from './empleado/empleado.component';
import { ClienteComponent } from './cliente/cliente.component';
import { RegistracionComponent } from './registracion/registracion.component';

import { AlertModule } from 'ngx-bootstrap';
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { FileUploadModule } from 'ng2-file-upload';
import { CarouselModule } from 'ngx-bootstrap';

import { RouterModule, Routes } from '@angular/router';
import { ServicioUsuariosService} from './servicio-usuarios.service';
import { Usuario } from '../clases/usuario.class';
import { ServicioLocalesService } from './servicio-locales.service';
import { Local } from '../clases/local.class';
import { ServicioClientesService } from './servicio-clientes.service';
import { Cliente } from '../clases/cliente.class';
import { ServicioProductosService } from './servicio-productos.service';
import { Producto } from '../clases/producto.class';
import { ServicioEmpleadosService } from './servicio-empleados.service';
import { Empleado } from '../clases/empleado.class';

import { ServicioReservasService } from './servicio-reservas.service';
import { ServicioLoginService } from './servicio-login.service';

import { ServicioOfertaService } from './servicio-oferta.service';
import { ServicioOfertasService } from './servicio-ofertas.service';
import { Oferta } from '../clases/oferta.class';
import { ProductoOferta } from '../clases/productoOferta.class';
import { MapaProductoComponent } from './mapa-producto/mapa-producto.component';

import { AgmCoreModule } from 'angular2-google-maps/core';
//import { AgmCoreModule } from '@agm/core';
//import { Ng2MapModule} from 'ng2-map';
//en imports:
//Ng2MapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyA1DHRuo02hKYjdhODQgaENNVpiQN8_W24'}),

import { ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl } from "@angular/forms";
import { MapsAPILoader } from 'angular2-google-maps/core';
import {GoogleMapsNg2Module} from 'google-maps-ng2';
//import {GoogleMapComponent, MapsManager} from "google-maps-ng2";

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'administrador', component: AdministradorComponent },
  { path: 'encargado', component: EncargadoComponent },
  { path: 'empleado', component: EmpleadoComponent },
  { path: 'cliente', component: ClienteComponent },
  { path: 'mapa', component: MapaProductoComponent },
  { path: 'registracion', component: RegistracionComponent },
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
    ClienteComponent,
    MapaProductoComponent,
    RegistracionComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    ReactiveFormsModule,
    AlertModule.forRoot(),
    //AlertModule,
    HttpModule,
    FileUploadModule,
    CarouselModule,    
    RouterModule.forRoot(appRoutes),    
    //Ng2MapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyA1DHRuo02hKYjdhODQgaENNVpiQN8_W24'}),    
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA1DHRuo02hKYjdhODQgaENNVpiQN8_W24',
      libraries: ['places']
    })/*,
     GoogleMapsNg2Module.forRoot({
      apiKey: "AIzaSyA1DHRuo02hKYjdhODQgaENNVpiQN8_W24",
      libraries: ["places", "geometry"]
    })*/
  ],
  providers: [ServicioUsuariosService,
              ServicioLocalesService,
              ServicioClientesService,
              ServicioProductosService,
              ServicioEmpleadosService,
              ServicioOfertasService,
              ServicioOfertaService,
              ServicioReservasService,
              ServicioLoginService],
  bootstrap: [AppComponent]
})
export class AppModule { 
  //rootPage:any = LoginComponent;
}
