import { Component, OnInit } from '@angular/core';
import { Cliente } from '../models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { ActivatedRoute } from '@angular/router';
import { AlertModalComponent } from 'src/app/@base/alert-modal/alert-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertModalEliminarComponent } from '../../@base/alert-modal-eliminar/alert-modal-eliminar.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente-eliminar',
  templateUrl: './cliente-eliminar.component.html',
  styleUrls: ['./cliente-eliminar.component.css']
})
export class ClienteEliminarComponent implements OnInit {

  cliente: Cliente;
    rol: string;
  constructor(private clienteService: ClienteService,
    private rutaActiva: ActivatedRoute,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.rol = sessionStorage.getItem('User');

    if (this.rol == "Admin") {
      this.cliente = new Cliente();
      const correo = this.rutaActiva.snapshot.params.identificacion;
      this.clienteService.getCorreo(correo).subscribe(c => {
        this.cliente = c;
      });
    }
  }

  confDelete(){

  }
  
  delete() {

    Swal.fire({
      title: '¿Está seguro?',
      text: "Si elimina a "+this.cliente.nombre+", sus datos no podrán ser recuperados!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonColor: '#22bb33',
      cancelButtonText: 'cancelar!',
      confirmButtonText: 'Eliminar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.delete(this.cliente.correo).subscribe(c => {

          Swal.fire({
            title: 'Resultado de eliminación de datos!',
            text: 'El cliente ' + this.cliente.nombre + ' ' + this.cliente.apellido + ' fué eliminada correctamente.',
            icon: 'success',
            confirmButtonColor: '#22bb33',
          })
          
        });

        window.location.href = "https://localhost:5001/clienteConsulta";

        
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
