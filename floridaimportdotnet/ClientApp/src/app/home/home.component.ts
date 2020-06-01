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
  frutas = new Array<Producto>();
  verduras = new Array<Producto>();
  hortalizas = new Array<Producto>();
  acu = 0;
  searchText:string;
  add: boolean;
  codigo: number;
  mIsEnable: boolean;
  cantidad: number;
  mensaje: string;
  mensaje1: string;
  constructor(private productoServicio: ProductoService) { }

  ngOnInit(){
    this.rol = sessionStorage.getItem('User');
    this.nombre = sessionStorage.getItem('Nom');
    this.get();
    this.add = false;
    this.codigo = 0;
    this.mIsEnable = true;
    this.cantidad = 1;
    this.mensaje = this.cantidad + " und";
  }

  get(){

    this.productoServicio.get().subscribe(result => {
      this.productos = result;
      this.productosTipo();
    })
  }

  productosTipo(){
    var contFrut = 0;
    var contVer = 0;
    var contHort = 0;
  this.productos.forEach(element => {
    if(element.tipo==="Fruta" && contFrut < 3){
      contFrut = contFrut + 1;
      this.frutas.push(element);
    }else{
      if(element.tipo==="Verdura" && contVer < 3){
        contVer = contVer + 1;
        this.verduras.push(element);
      }else{
        if(element.tipo==="Hortaliza" && contHort < 3){
          contHort = contHort + 1;
          this.hortalizas.push(element);
        }
      }
    }
  });
  
  }

  addCantidad(codigo){
    this.add=true;
    this.codigo = codigo;
  }

  mas(codigo){
    this.codigo = codigo; 
    this.cantidad=this.cantidad+1;
    this.mensaje = this.cantidad + " und";
      if(this.cantidad <= 2 ){
        this.mIsEnable = false;
      }
  }

  menos(codigo){
    this.codigo = codigo;
    this.cantidad=this.cantidad-1;
    this.mensaje = this.cantidad + " und";
    if(this.cantidad == 1){
      this.mIsEnable = true;
    }
  }

  agregar(){
    this.acu = this.acu + 1;
  }

  cancel(){
    this.add=false;
    this.codigo = 0;
  }

}

