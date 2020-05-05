import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { NosotrosConsultaComponent } from './florida/nosotros-consulta/nosotros-consulta.component';
import { AppRoutingModule } from './app-routing.module';
import { ClienteConsultaComponent } from './florida/cliente-consulta/cliente-consulta.component';
import { ClienteRegistroComponent } from './florida/cliente-registro/cliente-registro.component';
import { ClienteService } from './services/cliente.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormularioContactoComponent } from './florida/formulario-contacto/formulario-contacto.component';
import { IngresoComponent } from './florida/ingreso/ingreso.component';
import { FiltroClientePipe } from './pipe/filtro-cliente.pipe';
import { ProveedorConsultaComponent } from './florida/proveedor-consulta/proveedor-consulta.component';
import { ProveedorRegistroComponent } from './florida/proveedor-registro/proveedor-registro.component';
import { AdministradorVistaComponent } from './florida/administrador-vista/administrador-vista.component';
import { ProductoConsultaComponent } from './florida/producto-consulta/producto-consulta.component';
import { ProductoRegistroComponent } from './florida/producto-registro/producto-registro.component';
import { AlertModalComponent } from './@base/alert-modal/alert-modal.component';
import { ProductoService } from './services/producto.service';
import { PersonaPerfilComponent } from './florida/persona-perfil/persona-perfil.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    NosotrosConsultaComponent,
    ClienteConsultaComponent,
    ClienteRegistroComponent,
    FormularioContactoComponent,
    IngresoComponent,
    FiltroClientePipe,
    ProveedorConsultaComponent,
    ProveedorRegistroComponent,
    AdministradorVistaComponent,
    ProductoConsultaComponent,
    ProductoRegistroComponent,
    AlertModalComponent,
    PersonaPerfilComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
    ]),
    AppRoutingModule,
    NgbModule
  ],
  entryComponents:[AlertModalComponent],
  providers: [ClienteService, ProductoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
