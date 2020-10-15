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
import { PaisService } from './services/pais.service';
import { PersonaPerfilComponent } from './florida/persona-perfil/persona-perfil.component';
import { AgregarUbicacionComponent } from './florida/agregar-ubicacion/agregar-ubicacion.component';
import { PaisRegistroComponent } from './florida/pais-registro/pais-registro.component';
import { PaisConsultaComponent } from './florida/pais-consulta/pais-consulta.component';
import { FiltroProductoPipe } from './pipe/filtro-producto.pipe';
import { ClienteEliminarComponent } from './florida/cliente-eliminar/cliente-eliminar.component';
import { ProductoEditarComponent } from './florida/producto-editar/producto-editar.component';
import { ProveedorService } from './services/proveedor.service';
import { FiltroProveedorPipe } from './pipe/filtro-proveedor.pipe';
import { FrutasConsultaComponent } from './florida/frutas-consulta/frutas-consulta.component';
import { VerdurasConsultaComponent } from './florida/verduras-consulta/verduras-consulta.component';
import { HortalizasConsultaComponent } from './florida/hortalizas-consulta/hortalizas-consulta.component';
import { PedidoRegistroComponent } from './florida/pedido-registro/pedido-registro.component';
import { ReistroPagoComponent } from './florida/reistro-pago/reistro-pago.component';
import { ConsultaPagoComponent } from './florida/consulta-pago/consulta-pago.component';
import { ModificarUbicacionComponent } from './florida/modificar-ubicacion/modificar-ubicacion.component';
import { PedidoService } from './services/pedido.service';
import { PedidoCosultaComponent } from './florida/pedido-cosulta/pedido-cosulta.component';
import { DetallesCosultaComponent } from './florida/detalles-cosulta/detalles-cosulta.component';
import { JwtInterceptor } from './services/jwt.interceptor';
import { PedidoEditarComponent } from './florida/pedido-editar/pedido-editar.component';
import { FiltroPedidoPipe } from './pipe/filtro-pedido.pipe';
import { ProductoProveedorRegistroComponent } from './florida/producto-proveedor-registro/producto-proveedor-registro.component';
import { ProductoProveedorConsultaComponent } from './florida/producto-proveedor-consulta/producto-proveedor-consulta.component';
import { ProductoProveedorService } from './services/producto-proveedor.service';

//Graficos
import { ChartsModule } from 'ng2-charts';

import { AngularFireModule } from 'angularfire2';
import { environment } from 'src/environments/environment';
import { AngularFireStorage } from 'angularfire2/storage';
import { CiudadesConsultaComponent } from './florida/ciudades-consulta/ciudades-consulta.component';
import { AlertModalEliminarComponent } from './@base/alert-modal-eliminar/alert-modal-eliminar.component';

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
    PersonaPerfilComponent,
    AgregarUbicacionComponent,
    PaisRegistroComponent,
    PaisConsultaComponent,
    FiltroProductoPipe,
    ClienteEliminarComponent,
    ProductoEditarComponent,
    FiltroProveedorPipe,
    FrutasConsultaComponent,
    VerdurasConsultaComponent,
    HortalizasConsultaComponent,
    PedidoRegistroComponent,
    ReistroPagoComponent,
    ConsultaPagoComponent,
    ModificarUbicacionComponent,
    PedidoCosultaComponent,
    DetallesCosultaComponent,
    PedidoEditarComponent,
    FiltroPedidoPipe,
    ProductoProveedorRegistroComponent,
    ProductoProveedorConsultaComponent,
    CiudadesConsultaComponent,
    AlertModalEliminarComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
    ]),
    AppRoutingModule,
    NgbModule,
    ChartsModule
  ],
  entryComponents: [AlertModalComponent, AlertModalEliminarComponent],
  providers: [ClienteService, 
    ProductoService, 
    PaisService, 
    ProveedorService, 
    PedidoService, 
    ProductoProveedorService,
    AngularFireStorage,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
