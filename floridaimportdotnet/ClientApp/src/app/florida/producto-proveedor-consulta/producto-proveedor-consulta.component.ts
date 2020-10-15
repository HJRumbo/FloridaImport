import { Component, OnInit } from '@angular/core';
import { ProductoProveedor } from '../models/producto-proveedor';
import { ProductoProveedorService } from 'src/app/services/producto-proveedor.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { Proveedor } from '../models/proveedor';
import { AlertModalEliminarComponent } from '../../@base/alert-modal-eliminar/alert-modal-eliminar.component';
import { AlertModalComponent } from '../../@base/alert-modal/alert-modal.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto-proveedor-consulta',
  templateUrl: './producto-proveedor-consulta.component.html',
  styleUrls: ['./producto-proveedor-consulta.component.css']
})
export class ProductoProveedorConsultaComponent implements OnInit {

  productos: ProductoProveedor[];
  proveedores: Proveedor[];
  nombre: string;
  correo: string;
  searchText: string;
  constructor(private productoService: ProductoProveedorService,
    private proveedorService: ProveedorService, 
    private rutaActiva: ActivatedRoute, 
    private modalService: NgbModal) { }

  ngOnInit(): void {

    const id = this.rutaActiva.snapshot.params.identificacion;
    this.productoService.getIdentificacion(id).subscribe(p => {
      this.productos = p;
    });
    this.proveedorService.get().subscribe(result => {
      this.proveedores = result;
      this.proveedores.forEach(element => {
        if(element.identificacion == id){
          this.nombre = element.nombre;
          this.correo = element.correo;
        }
      });
    })
  }

  delete() {

    Swal.fire({
      title: '¿Está seguro?',
      text: "Si elimina al proveedor "+this.nombre+", sus datos no podrán ser recuperados!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonColor: '#22bb33',
      cancelButtonText: 'cancelar!',
      confirmButtonText: 'Eliminar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.proveedorService.delete(this.correo).subscribe(c => {

          Swal.fire({
            title: 'Resultado de eliminación de datos!',
            text: 'El proveedor ' + this.nombre + ' fué eliminado correctamente.',
            icon: 'success',
            confirmButtonColor: '#22bb33',
          })
          
        });

        window.location.href = "https://localhost:5001/proveedorConsulta";

        
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire({
          title: 'Cancelado',
          text: 'La eliminación del proveedor ' + this.nombre + ' fué cancelada.',
          icon: 'error',
          confirmButtonColor: '#22bb33',
        })
      }
    })

  }

}
