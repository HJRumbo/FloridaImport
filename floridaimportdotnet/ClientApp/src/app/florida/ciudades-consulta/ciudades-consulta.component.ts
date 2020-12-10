import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CiudadService } from 'src/app/services/ciudad.service';
import { PaisService } from 'src/app/services/pais.service';
import Swal from 'sweetalert2';
import { Ciudad } from '../models/ciudad';
import { Pais } from '../models/pais';

@Component({
  selector: 'app-ciudades-consulta',
  templateUrl: './ciudades-consulta.component.html',
  styleUrls: ['./ciudades-consulta.component.css']
})
export class CiudadesConsultaComponent implements OnInit {

  paises: Pais[];
  pais: Pais;
  ciudad: Ciudad;
  searchText:string;
  nombre: string;
  constructor(private paisServicio: PaisService, private rutaActiva: ActivatedRoute,
    private ciudadServicio: CiudadService) { }

  ngOnInit(): void {
    
    this.getPaises();
  }

  getPaises(){
    this.pais = new Pais();
    this.nombre = this.rutaActiva.snapshot.params.nombre;
    this.paisServicio.getNombre(this.nombre).subscribe(p => {
      this.pais = p;
    });
  }

  async addCiudad(){
    const { value: text } = await Swal.fire({
      title: 'Nueva ciudad',
      input: 'text',
      inputPlaceholder: 'Nombre...',
      inputAttributes: {
        'aria-label': 'Type your message here'
      },
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'El nombre de la ciudad es requerido!'
        }
      },
      confirmButtonColor: '#22bb33',
      cancelButtonColor: '#d33',
    })
    
    if (text) {
      this.ciudad = new Ciudad();
      this.ciudad.nombre = text;
      this.ciudadServicio.post(this.ciudad, this.nombre).subscribe(c => {
        this.ciudad = c;
          if(c!=null){
            this.getPaises();
            Swal.fire({
              title: 'Nueva ciudad!',
              text: text + " - "+ this.nombre,
              icon: 'success',
              showConfirmButton: false,
              timer: 1500
            })
          }
      });

    }
  }

  async update(codigo: number, nombre: string){
    const { value: text } = await Swal.fire({
      title: 'Modificar ciudad',
      input: 'text',
      inputValue: nombre,
      inputAttributes: {
        'aria-label': 'Type your message here'
      },
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'El nombre de la ciudad es requerido!'
        }
      },
      confirmButtonColor: '#22bb33',
      cancelButtonColor: '#d33',
    })
    
    if (text) {
      this.ciudad = new Ciudad();
      this.ciudad.nombre = text;
      this.ciudad.codigo = codigo;
      this.ciudadServicio.put(this.ciudad).subscribe(c => {
        this.ciudad = c;
          this.getPaises();
          Swal.fire({
            title: 'Ciudad modificada!',
            text: text + " - "+ this.nombre,
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
          })
      });

    }
  }

  async delete(ciudad: Ciudad){
    Swal.fire({
      title: '¿Está seguro?',
      text: "¿Desea eliminar la ciudad "+ciudad.nombre+"?",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonColor: '#22bb33',
      cancelButtonText: 'cancelar!',
      confirmButtonText: 'Eliminar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.ciudadServicio.delete(ciudad).subscribe(c => {
          
          this.getPaises();

          Swal.fire({
            title: 'Resultado de eliminación de datos!',
            text: 'La ciudad ' + ciudad.nombre + ' fué eliminada correctamente.',
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
          text: 'La eliminación de la ciudad ' + ciudad.nombre + ' fué cancelada.',
          icon: 'error',
          confirmButtonColor: '#22bb33',
        })
      }
    })
  }

}
