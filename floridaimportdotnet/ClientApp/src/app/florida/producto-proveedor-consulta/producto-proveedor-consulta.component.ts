import { Component, OnInit } from '@angular/core';
import { ProductoProveedor } from '../models/producto-proveedor';
import { ProductoProveedorService } from 'src/app/services/producto-proveedor.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { Proveedor } from '../models/proveedor';

@Component({
  selector: 'app-producto-proveedor-consulta',
  templateUrl: './producto-proveedor-consulta.component.html',
  styleUrls: ['./producto-proveedor-consulta.component.css']
})
export class ProductoProveedorConsultaComponent implements OnInit {

  productos: ProductoProveedor[];
  proveedores: Proveedor[];
  nombre: string;
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
        }
      });
    })
  }

}
