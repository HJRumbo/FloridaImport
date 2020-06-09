import { Component, OnInit } from '@angular/core';
import { Pedido } from '../models/pedido';
import { PedidoService } from 'src/app/services/pedido.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Detalle } from '../models/detalle';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from '../models/producto';

class IDetalle{
  codigo: number;
  nombre: string;
  precio: number;
  cantidad: number;
  total: number;
}

@Component({
  selector: 'app-detalles-cosulta',
  templateUrl: './detalles-cosulta.component.html',
  styleUrls: ['./detalles-cosulta.component.css']
})
export class DetallesCosultaComponent implements OnInit {

  pedidos: Pedido[];
  pedido: Pedido;
  producto: Producto;
  detalles = new Array<Detalle>();
  searchText: string;
  valores: any;
  list = new Array<Detalle>();
  iDetalle:IDetalle;
  constructor(private pedidoService: PedidoService, private productoService: ProductoService, private rutaActiva: ActivatedRoute, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.pedido = new Pedido();
    const codigo = this.rutaActiva.snapshot.params.codigo;
    this.pedidoService.getCodigo(codigo).subscribe(p => {
      this.pedido = p;
      this.getProducts(this.pedido.detalles);
      
    });
  }

  getProducts(detalles){

      this.iDetalle = new IDetalle();

    detalles.forEach(element => {
      
      this.list.push(element);
       
    });

    //alert(this.producto.nombre);
  }
}
