import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from '../models/producto';

@Component({
  selector: 'app-producto-consulta',
  templateUrl: './producto-consulta.component.html',
  styleUrls: ['./producto-consulta.component.css']
})
export class ProductoConsultaComponent implements OnInit {

  productos : Producto[];
  searchText:string;
  constructor(private productoServicio: ProductoService) { }

  ngOnInit() {
    this.get();
  }

  get(){

    this.productoServicio.get().subscribe(result => {
      this.productos = result;
    })
}

}
