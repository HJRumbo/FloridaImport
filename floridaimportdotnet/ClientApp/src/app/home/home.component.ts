import { Component, OnInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Producto } from '../florida/models/producto';
import { ProductoService } from '../services/producto.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  rol: string;
  nombre: string
  productos : Producto[];
  frutas: Producto[];
  searchText:string;
  constructor(private productoServicio: ProductoService) { }

  ngOnInit(){
    this.rol = sessionStorage.getItem('User');
    this.nombre = sessionStorage.getItem('Nom');
    this.get();
  }

  get(){

    this.productoServicio.get().subscribe(result => {
      this.productos = result;
    })
  }

  productosTipo(){
  this.productos.forEach(element => {
    if(element.tipo=="Fruta"){
      this.frutas.push(element);
    }
  });
  }
}

