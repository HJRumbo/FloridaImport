import { ClienteRegistroComponent } from './florida/cliente-registro/cliente-registro.component';
import { ClienteConsultaComponent } from './florida/cliente-consulta/cliente-consulta.component';
import { ClienteEliminarComponent } from './florida/cliente-eliminar/cliente-eliminar.component';
import { ProveedorRegistroComponent } from './florida/proveedor-registro/proveedor-registro.component';
import { ProveedorConsultaComponent } from './florida/proveedor-consulta/proveedor-consulta.component';
import { AdministradorVistaComponent } from './florida/administrador-vista/administrador-vista.component';
import { ProductoRegistroComponent } from './florida/producto-registro/producto-registro.component';
import { ProductoConsultaComponent } from './florida/producto-consulta/producto-consulta.component';
import { ProductoEditarComponent } from './florida/producto-editar/producto-editar.component';
import { VerdurasConsultaComponent } from './florida/verduras-consulta/verduras-consulta.component';
import { FrutasConsultaComponent } from './florida/frutas-consulta/frutas-consulta.component';
import { HortalizasConsultaComponent } from './florida/hortalizas-consulta/hortalizas-consulta.component';
import { PersonaPerfilComponent } from './florida/persona-perfil/persona-perfil.component';
import { FormularioContactoComponent } from './florida/formulario-contacto/formulario-contacto.component';
import { NosotrosConsultaComponent } from './florida/nosotros-consulta/nosotros-consulta.component';
import { PedidoRegistroComponent } from './florida/pedido-registro/pedido-registro.component';
import { HomeComponent } from './home/home.component';
import { IngresoComponent } from './florida/ingreso/ingreso.component';
import { AgregarUbicacionComponent } from './florida/agregar-ubicacion/agregar-ubicacion.component';
import { PaisRegistroComponent } from './florida/pais-registro/pais-registro.component';
import { PaisConsultaComponent } from './florida/pais-consulta/pais-consulta.component';
import { PedidoCosultaComponent } from './florida/pedido-cosulta/pedido-cosulta.component';
import { DetallesCosultaComponent } from './florida/detalles-cosulta/detalles-cosulta.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProductoProveedorRegistroComponent } from './florida/producto-proveedor-registro/producto-proveedor-registro.component';
import { ProductoProveedorConsultaComponent } from './florida/producto-proveedor-consulta/producto-proveedor-consulta.component';
import { AuthGuard } from './services/auth.guard';
import { CiudadesConsultaComponent } from './florida/ciudades-consulta/ciudades-consulta.component';

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
    path: 'clienteEliminar/:identificacion',
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
    path: 'productoProveedorConsulta/:identificacion',
    component: ProductoProveedorConsultaComponent
  },
  {
    path: 'productoProveedorRegistro',
    component: ProductoProveedorRegistroComponent
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
    path: 'productoEditar/:codigo',
    component: ProductoEditarComponent
  },
  {
    path: 'verdurasConsulta',
    component: VerdurasConsultaComponent
  },
  {
    path: 'frutasConsulta',
    component: FrutasConsultaComponent
  },
  {
    path: 'pedidosConsulta',
    component: PedidoCosultaComponent
  },
  {
    path: 'detallesConsulta/:codigo',
    component: DetallesCosultaComponent
  },
  {
    path: 'hortalizasConsulta',
    component: HortalizasConsultaComponent
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
    path: 'agregarUbicacion/:correo',
    component: AgregarUbicacionComponent
  },
  {
    path: 'paisConsulta',
    component: PaisConsultaComponent
  },
  {
    path: 'paisRegistro',
    component: PaisRegistroComponent
  },
  {
    path: 'pedidoRegistro',
    component: PedidoRegistroComponent
  },
  {
    path: 'ciudadesConsulta/:nombre',
    component: CiudadesConsultaComponent
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
