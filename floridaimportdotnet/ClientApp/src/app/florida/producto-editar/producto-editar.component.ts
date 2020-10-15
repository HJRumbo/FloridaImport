import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '../models/producto';
import { AlertModalComponent } from 'src/app/@base/alert-modal/alert-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertModalEliminarComponent } from '../../@base/alert-modal-eliminar/alert-modal-eliminar.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto-editar',
  templateUrl: './producto-editar.component.html',
  styleUrls: ['./producto-editar.component.css']
})
export class ProductoEditarComponent implements OnInit {

  formGroup: FormGroup;
  producto: Producto;
  constructor(private productoService: ProductoService, private rutaActiva: ActivatedRoute, 
    private modalService: NgbModal, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm();
    this.producto = new Producto();
    const codigo = this.rutaActiva.snapshot.params.codigo;
    this.productoService.getCodigo(codigo).subscribe(p => {
      this.producto = p;
    });
  }

  private buildForm(){
    this.producto = new Producto()
    this.producto.nombre = '';
    this.producto.descripcion = '';
    this.producto.cantidad = 0;
    this.producto.precio = 0;
    this.producto.proveedor = '';
    this.producto.tipo = '';

    this.formGroup = this.formBuilder.group({
      nombre: [this.producto.nombre, Validators.required],
      descripcion: [this.producto.descripcion, Validators.required],
      cantidad: [this.producto.cantidad, [Validators.required, Validators.minLength(1)]],
      precio: [this.producto.precio, [Validators.required, Validators.minLength(100)]],
      proveedor: [this.producto.proveedor, Validators.required],
      tipo: [this.producto.tipo, Validators.required]
    });
  }

  get control(){

    return this.formGroup.controls;
  }

  onSubmit(){
    if(this.formGroup.invalid){
      return;
    }
    this.update();
  }

  update() {

    Swal.fire({
      title: '¿Está seguro?',
      text: "Se guardaran los cambios realizados a los datos del producto "+this.producto.nombre,
      icon: 'question',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonColor: '#22bb33',
      cancelButtonText: 'cancelar!',
      confirmButtonText: 'Actualizar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.productoService.put(this.producto).subscribe(p => {

          Swal.fire({
            title: 'Resultado de eliminación de datos!',
            text: 'La información del producto ' + this.producto.nombre + ' fué actualizada correctamente.',
            icon: 'success',
            confirmButtonColor: '#22bb33',
          })
          
        });

        
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire({
          title: 'Cancelado',
          text: 'La actualización del producto ' + this.producto.nombre + ' fué cancelada.',
          icon: 'error',
          confirmButtonColor: '#22bb33',
        })
      }
    })

  }

  delete() {
    Swal.fire({
      title: '¿Está seguro?',
      text: "Si elimina al producto "+this.producto.nombre+", sus datos no podrán ser recuperados!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonColor: '#22bb33',
      cancelButtonText: 'cancelar!',
      confirmButtonText: 'Eliminar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.productoService.delete(this.producto.codigo.toString()).subscribe(c => {

          Swal.fire({
            title: 'Resultado de eliminación de datos!',
            text: 'El producto ' + this.producto.nombre + ' fué eliminada correctamente.',
            icon: 'success',
            confirmButtonColor: '#22bb33',
          })
          
        });

        window.location.href = "https://localhost:5001/productoConsulta";

        
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire({
          title: 'Cancelado',
          text: 'La eliminación del producto ' + this.producto.nombre + ' fué cancelada.',
          icon: 'error',
          confirmButtonColor: '#22bb33',
        })
      }
    })
  }

}
