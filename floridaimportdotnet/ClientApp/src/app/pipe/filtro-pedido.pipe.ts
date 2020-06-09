import { Pipe, PipeTransform } from '@angular/core';
import { Pedido } from '../florida/models/pedido';

@Pipe({
  name: 'filtroPedido'
})
export class FiltroPedidoPipe implements PipeTransform {

  transform(pedido: Pedido[], searchText: string): unknown {
    if (searchText == null) { return pedido; }
    return pedido.filter(p => p.estado.toLowerCase().indexOf(searchText.toLowerCase()) !== -1||
    p.fechaPedido.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 ||
    p.horaPedido.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 ||
    p.idCliente.indexOf(searchText) !== -1);
  }

}
