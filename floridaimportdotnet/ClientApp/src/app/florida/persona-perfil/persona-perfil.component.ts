import { Component, OnInit } from '@angular/core';
import { Cliente } from '../models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { AlertModalComponent } from 'src/app/@base/alert-modal/alert-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

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
    this.isEnabled = true;
  }

  update() {
    this.clienteServicio.put(this.cliente).subscribe(c => {
      this.isEnabled = true;
      const messageBox = this.modalService.open(AlertModalComponent)

        messageBox.componentInstance.title = "Resultado de edicion de datos.";
        messageBox.componentInstance.message = 'Los datos fueron modificados correctamente.';

    });
  }

  irAUbicacion(){
    this.router.navigate['/agregarUbicacion'];
  }
}
