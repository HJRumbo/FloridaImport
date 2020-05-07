import { Pipe, PipeTransform } from '@angular/core';
import { Producto } from '../florida/models/producto';

@Pipe({
  name: 'filtroProducto'
})
export class FiltroProductoPipe implements PipeTransform {

  transform(producto: Producto[], searchText: string): unknown {
    if (searchText == null) { return producto; }
    return producto.filter(p => p.nombre.toLowerCase().indexOf(searchText.toLowerCase()) !== -1||
    p.tipo.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);
  }
}
