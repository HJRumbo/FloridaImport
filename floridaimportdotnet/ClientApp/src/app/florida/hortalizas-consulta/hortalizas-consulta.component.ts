import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Producto } from '../models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-hortalizas-consulta',
  templateUrl: './hortalizas-consulta.component.html',
  styleUrls: ['./hortalizas-consulta.component.css']
})
export class HortalizasConsultaComponent implements OnInit {

  hortalizas = new Array<Producto>();
  productos : Producto[];
  mensaje: string;
  mensajeNuevo: string;
  codigo1: number;
  codigo: number;
  add: boolean;
  mIsEnable: boolean;
  cantidad: number;
  cantidadNueva: number;
  searchText:string;
  producto: Producto;
  @Output() productoSeleccionado = new EventEmitter<Producto>();

  constructor(private productoServicio: ProductoService) { }

  ngOnInit(): void {
    this.get();
    this.codigo = 0;
    this.codigo1 = 0;
    this.add = false;
    this.mIsEnable = true;
    this.cantidad = 1;
    this.cantidadNueva = 1;
    this.mensaje = this.cantidad + " und";
    this.mensajeNuevo = this.cantidadNueva + " und";
  }

  get(){

    this.productoServicio.get().subscribe(result => {
      this.productos = result;
      this.productosTipo();
    })
  }

  productosTipo(){

  this.productos.forEach(element => {
    
      if(element.tipo==="Hortaliza"){
        this.hortalizas.push(element);
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
  agregar(hortaliza: Producto){

    this.add = true;
    this.codigo = hortaliza.codigo;
    this.valores = {

      nombre: hortaliza.nombre,
      codigo: hortaliza.codigo,
      precio: hortaliza.precio,
      cantidad: this.cantidad,
      total: this.cantidad*hortaliza.precio
    }

    var listaValidar = this.getListProduct();

    if (listaValidar == null) {

      this.listaProduct.push(this.valores);

      localStorage.setItem('datos', JSON.stringify(this.listaProduct));

      this.cantidad = 1;

    } else {

        var valid = this.validarProducto(hortaliza.codigo, listaValidar);

        if(valid=='S'){

          var list = new Array<Producto>();
          localStorage.removeItem('datos');

          listaValidar.forEach(element => {
            if(element.codigo!=hortaliza.codigo){
              list.push(element);
              localStorage.setItem('datos', JSON.stringify(list));
            }else{
              this.cantidad = this.cantidad + element.cantidad; 
            }
          });

          this.agregar(hortaliza);

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
