import { Component, OnInit } from '@angular/core';
import { Cliente } from '../models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { AlertModalComponent } from 'src/app/@base/alert-modal/alert-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AlertModalEliminarComponent } from '../../@base/alert-modal-eliminar/alert-modal-eliminar.component';

@Component({
  selector: 'app-persona-perfil',
  templateUrl: './persona-perfil.component.html',
  styleUrls: ['./persona-perfil.component.css']
})
export class PersonaPerfilComponent implements OnInit {

  correo: string;
  cliente: Cliente;
  clientes: Cliente[];
  pais: string;
  isEnabled: boolean;
  constructor(private clienteServicio: ClienteService, private modalService: NgbModal, private router: Router) { }

  ngOnInit(): void {
    this.cliente = new Cliente();
    this.get();
    this.isEnabled = true;
  }

  get(){
    this.correo = sessionStorage.getItem('Correo');
    this.clienteServicio.getCorreo(this.correo).subscribe(cliente => {
      this.cliente = cliente;
      this.pais=cliente.pais;
    })
  }

  habilitarBoton(){
    this.isEnabled = false;
  }

  cancel(){
    this.get();
    this.isEnabled = true;
  }

  update() {

    const messageBox = this.modalService.open(AlertModalEliminarComponent)
    messageBox.componentInstance.title = "Resultado de la modificación de datos.";
    messageBox.componentInstance.message = 'Señor/a ' + this.cliente.nombre + ' ' + this.cliente.apellido + ' ¿Está seguro de modificar su información?';
    messageBox.result.then((resultado: any) => {
      const messageBox = this.modalService.open(AlertModalComponent)
      if (resultado == 'Si') {

        this.clienteServicio.put(this.cliente).subscribe(c => {
          this.isEnabled = true;

          messageBox.componentInstance.title = "Resultado de la modificación de datos.";
          messageBox.componentInstance.message = 'Los datos fueron modificados correctamente.';

        });

      } else {
        messageBox.componentInstance.title = "Resultado de la modificación de datos.";
        messageBox.componentInstance.message = 'La modificación de sus datos fué cancelada.';
      }

    });
  }
    irAUbicacion(){
      this.router.navigate['/agregarUbicacion'];
    }

  delete() {

    const messageBox = this.modalService.open(AlertModalEliminarComponent)

    messageBox.componentInstance.title = "Resultado de la eliminación de datos.";
    messageBox.componentInstance.message = 'Señor/a ' + this.cliente.nombre + ' ' + this.cliente.apellido + ' ¿Está seguro de eliminar su información de nuestra aplicación? Su información no podrá ser recuperada';
    messageBox.result.then((resultado: any) => {
      const messageBox = this.modalService.open(AlertModalComponent)
      if (resultado == 'Si') {


        this.clienteServicio.delete(this.cliente.correo).subscribe(c => {

          messageBox.componentInstance.title = "Resultado de eliminación de datos.";
          messageBox.componentInstance.message = 'Señor/a ' + this.cliente.nombre + ' ' + this.cliente.apellido + ', gracias por hacer parte de Florida International Import, Esperamos que vuelvas.';

        });

        localStorage.removeItem('Correo');
        localStorage.removeItem('Nom');
        localStorage.removeItem('User');
        window.location.href = "https://localhost:5001";


      } else {
        messageBox.componentInstance.title = "Resultado de eliminación de datos.";
        messageBox.componentInstance.message = 'La eliminación de ' + this.cliente.nombre + ' fué cancelada.';
      }
    });

  }
}
