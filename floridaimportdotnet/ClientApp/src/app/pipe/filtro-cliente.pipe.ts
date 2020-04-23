import { Pipe, PipeTransform } from '@angular/core';
import { Cliente } from '../florida/models/cliente';

@Pipe({
  name: 'filtroCliente'
})
export class FiltroClientePipe implements PipeTransform {

  transform(cliente: Cliente[], searchText: string): unknown {
    if (searchText == null) { return cliente; }
    return cliente.filter(c => c.nombre.toLowerCase().indexOf(searchText.toLowerCase()) !== -1||
    c.identificacion.indexOf(searchText) !== -1|| 
    c.apellido.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);
  }

}
