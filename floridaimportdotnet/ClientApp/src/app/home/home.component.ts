import { Component, OnInit } from '@angular/core';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Producto } from '../florida/models/producto';
import { ProductoService } from '../services/producto.service';
import { Proveedor } from '../florida/models/proveedor';
import { ProveedorService } from '../services/proveedor.service';
import { AlertModalComponent } from '../@base/alert-modal/alert-modal.component';
import Swal from 'sweetalert2';
import { ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { PedidoService } from '../services/pedido.service';
import { Pedido } from '../florida/models/pedido';
import { groupBy } from 'rxjs/operators';
import { ClienteService } from '../services/cliente.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  correo: string;
  proveedor: Proveedor;
  proveedores: Proveedor[];
  pais: string;
  isEnabled: boolean;
  rol: string;
  nombre: string
  productos : Producto[];
  frutas = new Array<Producto>();
  verduras = new Array<Producto>();
  hortalizas = new Array<Producto>();
  pedidos = new Array<Pedido>();
  acu = 0;
  searchText:string;
  add: boolean;
  codigo: number;
  mIsEnable: boolean;
  cantidad: number;
  cantidadNueva: number;
  mensaje: string;
  mensajeNuevo: string;
  codigo1: number;
  codio2: number;
  id: string;
  numeroCliente: number;
  numeroProducto: number;
  totalVendido: number;
  numeroProveedor: number;
  constructor(private productoServicio: ProductoService, 
    private proveedorServicio: ProveedorService, 
    private modalService: NgbModal,
    private pedidoService: PedidoService,
    private clienteService: ClienteService) { }

  ngOnInit(){
    this.rol = sessionStorage.getItem('User');
    this.nombre = sessionStorage.getItem('Nom');
    this.get();
    this.add = false;
    this.codigo = 0;
    this.mIsEnable = true;
    this.cantidad = 1;
    this.cantidadNueva = 1;
    this.mensaje = this.cantidad + " lb";
    this.mensajeNuevo = this.cantidadNueva + " lb";
    this.codigo1 = 1;
    
    if(this.rol=="Prove"){
      this.proveedor = new Proveedor();
      this.getProv();
      this.isEnabled = true;
    }
    if(this.rol=="Admin"){
      this.getDatos();
    }
  }

  getProv(){
    this.correo = sessionStorage.getItem('Correo');
    this.proveedorServicio.getCorreo(this.correo).subscribe(proveedor => {
      this.proveedor = proveedor;
      this.id = proveedor.identificacion;
    })
  }

  habilitarBoton(){
    this.isEnabled = false;
  }

  cancel2(){
    this.get();
    this.isEnabled = true;
  }

  update() {
    
    this.proveedorServicio.put(this.proveedor).subscribe(c => {
      this.isEnabled = true;
      const messageBox = this.modalService.open(AlertModalComponent)

        messageBox.componentInstance.title = "Resultado de edicion de datos.";
        messageBox.componentInstance.message = 'Los datos fueron modificados correctamente.';
        
    });
    
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

  cancel(){
    this.add=false;
    this.codigo = 0;
  }

  //Gráfica dinámica: No funcional aún--------------------------------------------------------------------------------

  getPedidos(){
    this.pedidoService.get().subscribe(p => {
      this.pedidos = p;
      this.pedidos.forEach(element => {
        let date = new Date(element.fechaPedido.replace(/-+/g, '/'));
        //const result = _.chain(element).groupBy(element.fechaPedido);

      });
      //const results = groupBy(p, i => i.fechaPedido);
    })
    
  }

  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Frutas' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Verduras' },
    { data: [180, 480, 770, 90, 1000, 270, 400], label: 'Hortalizas', yAxisID: 'y-axis-1' }
  ];
  public lineChartLabels: Label[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
  'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  getDatos(){
    this.clienteService.getCount().subscribe(numero => {
      this.numeroCliente = numero;
    })
    this.productoServicio.getCount().subscribe(numero => {
      this.numeroProducto = numero;
    })
    this.pedidoService.getTotal().subscribe(numero => {
      this.totalVendido = numero;
    })
    this.proveedorServicio.getCount().subscribe(numero => {
      this.numeroProveedor = numero;
    })
  }

}

