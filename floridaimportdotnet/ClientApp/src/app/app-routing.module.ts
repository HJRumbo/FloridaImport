import { ClienteRegistroComponent } from './florida/cliente-registro/cliente-registro.component';
import { ClienteConsultaComponent } from './florida/cliente-consulta/cliente-consulta.component';
import { ProveedorRegistroComponent } from './florida/proveedor-registro/proveedor-registro.component';
import { ProveedorConsultaComponent } from './florida/proveedor-consulta/proveedor-consulta.component';
import { AdministradorRegistroComponent } from './florida/administrador-registro/administrador-registro.component';
import { AdministradorConsultaComponent } from './florida/administrador-consulta/administrador-consulta.component';
import { FormularioContactoComponent } from './florida/formulario-contacto/formulario-contacto.component';
import { NosotrosConsultaComponent } from './florida/nosotros-consulta/nosotros-consulta.component';
import { HomeComponent } from './home/home.component';
import { IngresoComponent } from './florida/ingreso/ingreso.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'clienteConsulta',
    component: ClienteConsultaComponent
  },

  {
    path: 'clienteRegistro',
    component: ClienteRegistroComponent
  },
  {
    path: 'proveedorConsulta',
    component: ProveedorConsultaComponent
  },
  {
    path: 'proveedorRegistro',
    component: ProveedorRegistroComponent
  },
  {
    path: 'administradorConsulta',
    component: AdministradorConsultaComponent
  },
  {
    path: 'administradorRegistro',
    component: AdministradorRegistroComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'formularioContacto',
    component: FormularioContactoComponent
  },
  {
    path: 'nosotrosConsulta',
    component: NosotrosConsultaComponent
  },
  {
    path: 'ingreso',
    component: IngresoComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
