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
    FiltroClientePipe
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
  providers: [ClienteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
