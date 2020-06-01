import { Pipe, PipeTransform } from '@angular/core';
import { Proveedor } from '../florida/models/proveedor';

@Pipe({
  name: 'filtroProveedor'
})
export class FiltroProveedorPipe implements PipeTransform {

  transform(proveedor: Proveedor[], searchText: string): unknown {
    if (searchText == null) { return proveedor; }
    return proveedor.filter(p => p.nombre.toLowerCase().indexOf(searchText.toLowerCase()) !== -1||
    p.identificacion.indexOf(searchText) !== -1)
  }

}
