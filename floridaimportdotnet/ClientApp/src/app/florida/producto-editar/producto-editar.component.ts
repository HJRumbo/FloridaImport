import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '../models/producto';
import { AlertModalComponent } from 'src/app/@base/alert-modal/alert-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    this.productoService.put(this.producto).subscribe(p => {
      const messageBox = this.modalService.open(AlertModalComponent)
        messageBox.componentInstance.title = "Resultado de edicion de datos.";
        messageBox.componentInstance.message = 'Los datos fueron modificados correctamente.';

    });
  }

  delete() {
    this.productoService.delete(this.producto.codigo.toString()).subscribe(p => {
      alert(p);
    });
  }

}
