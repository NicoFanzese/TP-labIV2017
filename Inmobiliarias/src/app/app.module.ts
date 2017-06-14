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



import { ServicioOfertasService } from './servicio-ofertas.service';
import { Oferta } from '../clases/oferta.class';
import { ProductoOferta } from '../clases/productoOferta.class';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'administrador', component: AdministradorComponent },
  { path: 'encargado', component: EncargadoComponent },
  { path: 'empleado', component: EmpleadoComponent },
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
    FileUploadModule,
    CarouselModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ServicioUsuariosService,
              ServicioLocalesService,
              ServicioClientesService,
              ServicioProductosService,
              ServicioEmpleadosService,
              ServicioOfertasService],
  bootstrap: [AppComponent]
})
export class AppModule { 
  //rootPage:any = LoginComponent;
}
