import { Component, OnInit } from '@angular/core';
import { Proveedor } from '../models/proveedor';
import { ProveedorService } from 'src/app/services/proveedor.service';

@Component({
  selector: 'app-proveedor-consulta',
  templateUrl: './proveedor-consulta.component.html',
  styleUrls: ['./proveedor-consulta.component.css']
})
export class ProveedorConsultaComponent implements OnInit {

  proveedores : Proveedor[];
  searchText:string;
  constructor(private proveedorServicio: ProveedorService) { }

  ngOnInit() {
    this.get();
  }

  get(){

    this.proveedorServicio.get().subscribe(result => {
      this.proveedores = result;
    })
}

}
