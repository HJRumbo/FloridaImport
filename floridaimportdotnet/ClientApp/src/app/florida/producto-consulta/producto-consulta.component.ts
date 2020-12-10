import { Component, Input, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from '../models/producto';
import {MatButtonHarness} from '@angular/material/button/testing';
import { ThemePalette } from '@angular/material/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto-consulta',
  templateUrl: './producto-consulta.component.html',
  styleUrls: ['./producto-consulta.component.css']
})
export class ProductoConsultaComponent implements OnInit {

  @Input()
  color: ThemePalette;
  
  productos: Producto[];
  searchText: string;
  rol: string;
  noDispo: boolean;
  constructor(private productoServicio: ProductoService) { }

  ngOnInit() {
    this.rol = sessionStorage.getItem('User');
    this.noDispo = false;
    if (this.rol == "Admin") {

      this.get();

    }
  }

  get(){
    this.noDispo = false;
    this.productoServicio.get().subscribe(result => {
      this.productos = result;
    })
}

verEliminados(){
  this.noDispo = true;
  this.productoServicio.getNoDisponible().subscribe(result => {
    this.productos = result;
  })
}

reactivar(codigo){
    Swal.fire({
      title: '¿Está seguro de reactivar este producto?',
      icon: 'question',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonColor: '#22bb33',
      cancelButtonText: 'cancelar!',
      confirmButtonText: 'Aceptar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.productoServicio.reactivar(codigo).subscribe(result => {
            Swal.fire({
              title: 'Transacción exitosa!',
              text: 'Se ha reactivado el producto satisfactoriamente ',
              icon: 'success',
              confirmButtonColor: '#22bb33',
            })
            this.verEliminados();
          
        });
        
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire({
          title: 'Cancelado',
          text: 'La operación ha sido cancelada ',
          icon: 'error',
          confirmButtonColor: '#22bb33',
        })
      }
    })

}

}
