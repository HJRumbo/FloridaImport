import { Component, OnInit } from '@angular/core';
import { Producto } from '../models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-verduras-consulta',
  templateUrl: './verduras-consulta.component.html',
  styleUrls: ['./verduras-consulta.component.css']
})
export class VerdurasConsultaComponent implements OnInit {

  verduras = new Array<Producto>();
  productos : Producto[];
  mensaje: string;
  codigo1: number;
  codigo: number;
  add: boolean;
  mIsEnable: boolean;
  cantidad: number;
  cantidadNueva: number;
  searchText:string;
  producto: Producto;

  constructor(private productoServicio: ProductoService) { }

  ngOnInit(): void {
    this.get();
    this.codigo = 0;
    this.codigo1 = 0;
    this.add = false;
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

  this.productos.forEach(element => {
    
      if(element.tipo==="Verdura"){
        this.verduras.push(element);
      }
  });
  
  }

  mas(codigo){
    this.codigo1 = codigo; 
    this.cantidad=this.cantidad+1;
    this.mensaje = this.cantidad + " und";
      if(this.cantidad <= 2 ){
        this.mIsEnable = false;
      }
  }

  menos(codigo){
    this.codigo1 = codigo;
    this.cantidad=this.cantidad-1;
    this.mensaje = this.cantidad + " und";
    if(this.cantidad == 1){
      this.mIsEnable = true;
    }
  }

  valores: any;
  listaProduct = new Array<Producto>();
  agregar(producto: Producto){

    this.add = true;
    this.codigo = producto.codigo;
    this.valores = {

      nombre: producto.nombre,
      codigo: producto.codigo,
      precio: producto.precio,
      cantidad: this.cantidad,
      total: this.cantidad*producto.precio
    }

    var listaValidar = this.getListProduct();

    if (listaValidar == null) {

      this.listaProduct.push(this.valores);

      localStorage.setItem('datos', JSON.stringify(this.listaProduct));

      this.cantidad = 1;

    } else {

        var valid = this.validarProducto(producto.codigo, listaValidar);

        if(valid=='S'){

          var list = new Array<Producto>();
          localStorage.removeItem('datos');

          listaValidar.forEach(element => {
            if(element.codigo!=producto.codigo){
              list.push(element);
              localStorage.setItem('datos', JSON.stringify(list));
            }else{
              this.cantidad = this.cantidad + element.cantidad; 
            }
          });

          this.agregar(producto);

        }else{

            listaValidar.push(this.valores);
            localStorage.setItem('datos', JSON.stringify(listaValidar));
            this.cantidad = 1;
        }
    }

  }

  validarProducto(codigo: any, lista: any): any{
    var result = 'N';
    lista.forEach(element => {
      if(element.codigo == codigo){
        result = 'S';
      }
    });

    return result;
  }

  getListProduct() {
    return JSON.parse(localStorage.getItem('datos'));
  }
}
