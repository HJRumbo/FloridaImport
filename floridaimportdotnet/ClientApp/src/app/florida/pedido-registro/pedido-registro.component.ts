import { Component, OnInit } from '@angular/core';
import { Producto } from '../models/producto';
import { Cliente } from '../models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import * as moment from 'moment';
import { Pedido } from '../models/pedido';
import { Detalle } from '../models/detalle';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
  selector: 'app-pedido-registro',
  templateUrl: './pedido-registro.component.html',
  styleUrls: ['./pedido-registro.component.css'],
  template: `<app-hortalizas-consulta (productoSeleccionado)="agregar($event)">
  </app-hortalizas-consulta>`
})
export class PedidoRegistroComponent implements OnInit {

  productoSelecc:Producto = null;
  cliente: Cliente;
  correo: string;
  totalPedido: number;
  currentYear:Date;
  hora: string;
  list: any;
  fecha: string;
  encontrado: boolean;
  pedido: Pedido;
  detalle: Detalle;
  detalles = new Array<Detalle>();
  pagar: boolean;
  item: number;
  vacio: boolean;
  constructor(private clienteServicio: ClienteService, private pedidoService: PedidoService) { }

  ngOnInit(): void {
    this.pagar = false;
    this.vacio = false;
    this.getListProduct();

  }

  obtenerFecha(){
    
    this.fecha = moment(new Date()).format('YYYY/MM/DD');
    this.hora = moment(new Date()).format('hh:mm:ss');
  }

  agregar(hortaliza: Producto){
    this.productoSelecc=hortaliza;
  }

  consultarJson() {

    var list = this.getListProduct();
}

getListProduct() {
  
  this.totalPedido = 0;

  this.list = JSON.parse(localStorage.getItem('datos'));

  if(this.list!=null){
    this.vacio = false;
    this.list.forEach(element => {
      this.totalPedido = this.totalPedido + element.total;
    });
    this.getCorreo();
    this.obtenerFecha();
  }else{
    this.vacio = true;
  }

}

getCorreo(){
  this.correo = sessionStorage.getItem('Correo');

  if(this.correo!=null){
    this.clienteServicio.getCorreo(this.correo).subscribe(cliente => {
      this.cliente = cliente;
    })

    this.encontrado = true;

  }else{

    this.encontrado = false;
    
  }
}

  postPedido(){

    this.pedido = new Pedido();

    this.pedido.idCliente = this.cliente.identificacion;

    this.pedido.fechaPedido = this.fecha;

    this.pedido.horaPedido = this.hora;

    this.pedido.detalles = this.datosDetalles();


    this.pedidoService.post(this.pedido).subscribe(p => {
      if (p != null) {
        
        this.pedido = p;

      }
    });

    localStorage.removeItem('datos');
    window.location.href = "https://localhost:5001/pedidoRegistro";
  }

  datosPedido(): any{

    

    /*var prueba, cont=0;

    this.pedido.detalles.forEach(element => {
      if(cont==0){
        prueba = element.codigoProducto;
      }
      cont=cont+1;
    })

    alert(
      prueba
    );*/
  }

  datosDetalles(): Detalle[]{

    
    var lista = JSON.parse(localStorage.getItem('datos'));

    lista.forEach(element => {
      this.detalle = new Detalle();

      this.detalle.codigoProducto = element.codigo;
      this.detalle.cantidadProducto = element.cantidad;
      this.detalle.totalDetalle = element.total;

      this.detalles.push(this.detalle);
      
    });

    return this.detalles;
  }

  eliminarProducto(codigo: number){

    var lista = JSON.parse(localStorage.getItem('datos'));
    var list = new Array<Producto>();
    localStorage.removeItem('datos');
    lista.forEach(element => {
      if(element.codigo!=codigo){
        
        list.push(element);
        localStorage.setItem('datos', JSON.stringify(list));
      }
    });

    this.getListProduct();

  }

  irAPagar(){

    this.pagar = true;
  }

  atras(){
    this.pagar = false;
  }

  
}
