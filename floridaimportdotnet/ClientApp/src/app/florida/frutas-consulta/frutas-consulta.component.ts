import { Component, OnInit } from '@angular/core';
import { Producto } from '../models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertModalComponent } from 'src/app/@base/alert-modal/alert-modal.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-frutas-consulta',
  templateUrl: './frutas-consulta.component.html',
  styleUrls: ['./frutas-consulta.component.css']
})
export class FrutasConsultaComponent implements OnInit {

  frutas = new Array<Producto>();
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
  mensajeNuevo: string;

  constructor(private productoServicio: ProductoService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.get();
    this.codigo = 0;
    this.codigo1 = 0;
    this.add = false;
    this.mIsEnable = true;
    this.cantidad = 1;
    this.cantidadNueva = 1;
    this.mensaje = this.cantidad + " lb";
    this.mensajeNuevo = this.cantidadNueva + " lb";
  }

  get(){

    this.productoServicio.get().subscribe(result => {
      this.productos = result;
      this.productosTipo();
    })
  }

  productosTipo(){

  this.productos.forEach(element => {
    
      if(element.tipo==="Fruta"){
        this.frutas.push(element);
      }
  });
  
  }

  cont = 0;

  mas(codigo){
    this.cont++;
    if(this.cont==1){
      this.codigo=codigo;
      this.cantidad=this.cantidad+1;
      this.mensaje = this.cantidad + " lb";
      if(this.cantidad <= 2){
        this.mIsEnable = false;
      }
      if(this.cantidad == 1){
        this.mIsEnable = true;
      }
    }else{
      if(codigo==this.codigo){
        this.cantidad=this.cantidad+1;
        this.mensaje = this.cantidad + " lb";
        if(this.cantidad <= 2){
          this.mIsEnable = false;
        }
        if(this.cantidad == 1){
          this.mIsEnable = true;
        }
      }else{
        this.codigo=codigo;
        this.cantidad = 1;
        this.cantidad++;
        this.mensaje = this.cantidad + " lb";
        if(this.cantidad <= 2){
          this.mIsEnable = false;
        }
        if(this.cantidad == 1){
          this.mIsEnable = true;
        }
      }
    }
  }

  cont2 = 0;

  menos(codigo){
    
    this.cont2++;
    if(this.cont2==1){
      this.codigo=codigo;
      this.cantidad=this.cantidad-1;
      this.mensaje = this.cantidad + " lb";
      if(this.cantidad == 1){
        this.mIsEnable = true;
      }
    }else{
      if(codigo==this.codigo){
        this.cantidad=this.cantidad-1;
        this.mensaje = this.cantidad + " lb";
        if(this.cantidad == 1){
          this.mIsEnable = true;
        }
      }else{
        this.codigo=codigo;
        this.cantidad = 1;
        this.mensaje = this.cantidad + " lb";
          this.mIsEnable = true;
        
      }
    }
  }

  valores: any;
  listaProduct = new Array<Producto>();
  agregar(producto: Producto){

    if(this.cantidad>producto.cantidad){

      Swal.fire({
        icon: 'error',
        title: 'Lo sentimos...',
        text: 'No contamos con la cantidad que desea comprar.'
      })

    }else{

    if(producto.cantidad==0){
      Swal.fire({
        icon: 'error',
        title: 'Lo sentimos...',
        text: 'El producto se ha agotado.'
      })

    }else{

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'El producto se ha agregado al carrito.',
        showConfirmButton: false,
        timer: 1500
      })


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
