import { Component, OnInit } from '@angular/core';
import { Producto } from './../models/producto';
import { ProductoService } from './../../services/producto.service';
import { FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import { AlertModalComponent } from 'src/app/@base/alert-modal/alert-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AngularFireStorage, AngularFireUploadTask, AngularFireStorageReference } from 'angularfire2/storage';

@Component({
  selector: 'app-producto-registro',
  templateUrl: './producto-registro.component.html',
  styleUrls: ['./producto-registro.component.css']
})
export class ProductoRegistroComponent implements OnInit {

  formGroup: FormGroup;
  producto:  Producto;
  url: any;
  rol: string;
  imageURL: string;

  constructor(private productoService: ProductoService, private formBuilder: FormBuilder, 
  private modalService: NgbModal, private storage: AngularFireStorage) { }

  ngOnInit() {
    this.rol = sessionStorage.getItem('User');
    if (this.rol == "Admin") {
      this.buildForm();
    }
  }

  private buildForm(){
    this.producto = new Producto()
    this.producto.nombre = '';
    this.producto.descripcion = '';
    this.producto.proveedor = '';
    this.producto.tipo = '';
    this.producto.imagen = '';

    this.formGroup = this.formBuilder.group({
      nombre: [this.producto.nombre, Validators.required],
      descripcion: [this.producto.descripcion, Validators.required],
      cantidad: [this.producto.cantidad, [Validators.required, Validators.minLength(1)]],
      precio: [this.producto.precio, [Validators.required, Validators.minLength(100)]],
      proveedor: [this.producto.proveedor, Validators.required],
      tipo: [this.producto.tipo, Validators.required],
      imagen: ['', Validators.required]
    });
  }

  get control(){

    return this.formGroup.controls;
  }

  onSubmit(){
    if(this.formGroup.invalid){
      return;
    }
    this.add();
  }

  add() {

    this.producto = this.formGroup.value;
    this.producto.imagen = this.imageURL;
    console.log(this.producto.imagen);
    this.productoService.post(this.producto).subscribe(p => {
      console.log(p);
      if (p != null) {
        
        this.producto = p;

      }
    });
  }

  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url


      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      }
      console.log(this.url);
    }
  }

  //LO NUEVO PARA METER LAS IMAGENES A LA BASE DE DATOS
  ///////////////////////////////////777
  //////////////////////////////////////
  //////////////////////////////////////

  onPhotoSelected(event): void {
    //SUBIR IMAGEN
    const file = event.target.files[0];
    let nombre = new Date().getTime().toString();
    nombre = nombre + file.name.toString().substring( file.name.toString().lastIndexOf('.') );
    console.log(nombre);
    const ruta = `Productos/${nombre}`;
    const refs = this.storage.ref(ruta);
    const task = refs.put(file);

  
  
  
  
    
    task.percentageChanges().subscribe(porcentaje => {
      console.log(porcentaje);
    });

    task.then(() => {
      refs.getDownloadURL().subscribe(imagenUrl => {
        this.imageURL = imagenUrl;
        console.log(this.imageURL);
      });
    });

    


  
  
  
  
  }


}
