import { Component, OnInit } from '@angular/core';
import { Cliente } from '../models/cliente';
import { ClienteService } from './../../services/cliente.service';
import {Observable, of} from 'rxjs';
import { SignalRService } from 'src/app/services/signal-r.service';

@Component({
  selector: 'app-cliente-consulta',
  templateUrl: './cliente-consulta.component.html',
  styleUrls: ['./cliente-consulta.component.css']
})
export class ClienteConsultaComponent implements OnInit {

  clientes : Cliente[];
  searchText:string;
  constructor(private clienteServicio: ClienteService, private signalRService: SignalRService) { }

  ngOnInit() {
    this.get();
  }

  get(){

    this.clienteServicio.get().subscribe(result => {
      this.clientes = result;
    })
    this.signalRService.signalReceived.subscribe((cliente: Cliente) => { this.clientes.push(cliente) });
}

}
