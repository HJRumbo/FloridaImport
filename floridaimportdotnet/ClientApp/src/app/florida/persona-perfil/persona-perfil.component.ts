import { Component, OnInit } from '@angular/core';
import { Cliente } from '../models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { AlertModalComponent } from 'src/app/@base/alert-modal/alert-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AlertModalEliminarComponent } from '../../@base/alert-modal-eliminar/alert-modal-eliminar.component';
import Swal from 'sweetalert2';

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

    Swal.fire({
      title: '¿Está seguro?',
      text: "Señor/a " + this.cliente.nombre+ ' ' + this.cliente.apellido + ' ¿Está seguro de actualizar su información?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#22bb33',
      confirmButtonText: 'Actualizar!',
      cancelButtonColor: '#d33',
      cancelButtonText: 'cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteServicio.put(this.cliente).subscribe(c => {
          this.isEnabled = true;

          Swal.fire({
            title: 'Resultado de eliminación de datos!',
            text: 'Señor/a ' + this.cliente.nombre + ' ' + this.cliente.apellido + ' sus datos fueron actualizados correctamente.',
            icon: 'success',
            confirmButtonColor: '#22bb33',
          })
          
        });

        
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire({
          title: 'Cancelado',
          text: 'La modificación de ' + this.cliente.nombre + ' fué cancelada.',
          icon: 'error',
          confirmButtonColor: '#22bb33',
        })
      }
    })

  }
    irAUbicacion(){
      this.router.navigate['/agregarUbicacion'];
    }

  delete() {

    Swal.fire({
      title: '¿Está seguro?',
      text: 'Señor/a ' + this.cliente.nombre+ ' ' + this.cliente.apellido + ' ¿Está seguro de eliminar su información de nuestra aplicación? Su información no podrá ser recuperada',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#22bb33',
      confirmButtonText: 'Eliminar!',
      cancelButtonColor: '#d33',
      cancelButtonText: 'cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteServicio.delete(this.cliente.correo).subscribe(c => {

          Swal.fire({
            title: 'Resultado de eliminación de datos!',
            text: 'El cliente ' + this.cliente.nombre + ' ' + this.cliente.apellido + ' fué eliminada correctamente.',
            icon: 'success',
            confirmButtonColor: '#22bb33',
          })
          
        });

        localStorage.removeItem('Correo');
        localStorage.removeItem('Nom');
        localStorage.removeItem('User');
        window.location.href = "https://localhost:5001";

        
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire({
          title: 'Cancelado',
          text: 'La eliminación de ' + this.cliente.nombre + ' fué cancelada.',
          icon: 'error',
          confirmButtonColor: '#22bb33',
        })
      }
    })

  }
}
