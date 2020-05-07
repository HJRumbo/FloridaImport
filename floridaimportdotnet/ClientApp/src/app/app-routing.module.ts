import { ClienteRegistroComponent } from './florida/cliente-registro/cliente-registro.component';
import { ClienteConsultaComponent } from './florida/cliente-consulta/cliente-consulta.component';
import { ClienteEliminarComponent } from './florida/cliente-eliminar/cliente-eliminar.component';
import { ProveedorRegistroComponent } from './florida/proveedor-registro/proveedor-registro.component';
import { ProveedorConsultaComponent } from './florida/proveedor-consulta/proveedor-consulta.component';
import { AdministradorVistaComponent } from './florida/administrador-vista/administrador-vista.component';
import { ProductoRegistroComponent } from './florida/producto-registro/producto-registro.component';
import { ProductoConsultaComponent } from './florida/producto-consulta/producto-consulta.component';
import { ProductoEditarComponent } from './florida/producto-editar/producto-editar.component';
import { PersonaPerfilComponent } from './florida/persona-perfil/persona-perfil.component';
import { FormularioContactoComponent } from './florida/formulario-contacto/formulario-contacto.component';
import { NosotrosConsultaComponent } from './florida/nosotros-consulta/nosotros-consulta.component';
import { HomeComponent } from './home/home.component';
import { IngresoComponent } from './florida/ingreso/ingreso.component';
import { AgregarUbicacionComponent } from './florida/agregar-ubicacion/agregar-ubicacion.component';
import { PaisRegistroComponent } from './florida/pais-registro/pais-registro.component';
import { PaisConsultaComponent } from './florida/pais-consulta/pais-consulta.component';
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
    path: 'clienteEliminar',
    component: ClienteEliminarComponent
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
    path: 'administradorVista',
    component: AdministradorVistaComponent
  },
  {
    path: 'productoConsulta',
    component: ProductoConsultaComponent
  },
  {
    path: 'productoRegistro',
    component: ProductoRegistroComponent
  },
  {
    path: 'productoEditar',
    component: ProductoEditarComponent
  },
  {
    path: 'personaPerfil',
    component: PersonaPerfilComponent
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
  },
  {
    path: 'agregarUbicacion',
    component: AgregarUbicacionComponent
  },
  {
    path: 'paisConsulta',
    component: PaisConsultaComponent
  },
  {
    path: 'paisRegistro',
    component: PaisRegistroComponent
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
