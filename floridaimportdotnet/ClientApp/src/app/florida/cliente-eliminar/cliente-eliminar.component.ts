import { Component, OnInit } from '@angular/core';
import { Cliente } from '../models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { ActivatedRoute } from '@angular/router';
import { AlertModalComponent } from 'src/app/@base/alert-modal/alert-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cliente-eliminar',
  templateUrl: './cliente-eliminar.component.html',
  styleUrls: ['./cliente-eliminar.component.css']
})
export class ClienteEliminarComponent implements OnInit {

  cliente: Cliente;
  constructor(private clienteService: ClienteService, private rutaActiva: ActivatedRoute, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.cliente = new Cliente();
    const correo = this.rutaActiva.snapshot.params.identificacion;
    this.clienteService.getCorreo(correo).subscribe(c => {
      this.cliente = c;
    });
  }

  confDelete(){

  }
  
  delete() {
    this.clienteService.delete(this.cliente.correo).subscribe(c => {
      const messageBox = this.modalService.open(AlertModalComponent)

        messageBox.componentInstance.title = "Resultado de eliminacion de datos.";
        messageBox.componentInstance.message = 'La persona '+ this.cliente.nombre+' fue eliminada correctamente.';

    });
  }

}