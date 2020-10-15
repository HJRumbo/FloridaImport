import { Component, OnInit } from '@angular/core';
import { Pedido } from '../models/pedido';
import { PedidoService } from 'src/app/services/pedido.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from '../models/cliente';
import { AlertModalComponent } from 'src/app/@base/alert-modal/alert-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-pedido-cosulta',
  templateUrl: './pedido-cosulta.component.html',
  styleUrls: ['./pedido-cosulta.component.css']
})
export class PedidoCosultaComponent implements OnInit {

  pedidos = new Array<Pedido>();
  allPedidos : Pedido[];
  pedidoNuevo: Pedido;
  cliente: Cliente;
  correo: any;
  searchText:string;
  id: string;
  rol: string;
  cambEsta: boolean;
  codigoPe: number;
  nocamb: boolean;
  select: string;
  mostrar: boolean;
  constructor(private pedidoServicio: PedidoService, private clienteServicio: ClienteService, 
    private modalService: NgbModal) { }

  ngOnInit() {
    this.cambEsta = false;
    this.nocamb = true;
    this.codigoPe = 0;
    this.select="Recibido";
    this.rol = sessionStorage.getItem('User');
    if(this.rol=="Clien"){
      this.getCliente();
      this.mostrar = false;
    }else{
      if(this.rol=="Admin"){
        this.getAdmin();
      }
    }
    
  }

  getAdmin(){
    this.pedidoServicio.get().subscribe(result => {
      this.pedidos = result;
      
    })
  }

  getCliente(){

    this.correo = sessionStorage.getItem('Correo');
      this.clienteServicio.getCorreo(this.correo).subscribe(cliente => {
        this.cliente = cliente;
        this.id = this.cliente.identificacion;
        this.get(this.cliente.identificacion);
      })
  }
  get(id){

    this.pedidoServicio.get().subscribe(result => {
      this.allPedidos = result;
      
    this.pedidcosClient(id, this.allPedidos);
    })

}

pedidcosClient(id, allPedidos){

  allPedidos.forEach(element => {
    if(element.idCliente === id){
      this.pedidos.push(element);
      if (this.pedidos != null) {
        this.mostrar = true;
      } else {
        this.mostrar = false;
      }
    }
  });
}

cambEstado(codigo){
  
  this.cambEsta = true;
  this.codigoPe=codigo;
}

cancel(){
  this.cambEsta = false;
  this.codigoPe=0;
}

changeSelect(): any{
  var estado = this.select;

  return estado;

}

modEstado(codigo){

  this.pedidoNuevo = new Pedido();
  this.pedidoNuevo.codigoPedido = codigo;
  this.pedidoNuevo.estado = this.changeSelect();
  
  this.pedidoServicio.put(this.pedidoNuevo).subscribe(c => {
  
    if(c!=null){
      const messageBox = this.modalService.open(AlertModalComponent)

    messageBox.componentInstance.title = "Resultado de agregación de ubicación.";
    messageBox.componentInstance.message = 'Los datos fueron modificados correctamente.';
    }
    
  this.getAdmin();
  this.cambEsta = false;
  this.codigoPe=0;
  
});

}
}
