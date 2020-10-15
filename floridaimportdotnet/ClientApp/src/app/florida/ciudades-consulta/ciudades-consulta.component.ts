import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaisService } from 'src/app/services/pais.service';
import { Pais } from '../models/pais';

@Component({
  selector: 'app-ciudades-consulta',
  templateUrl: './ciudades-consulta.component.html',
  styleUrls: ['./ciudades-consulta.component.css']
})
export class CiudadesConsultaComponent implements OnInit {

  paises: Pais[];
  pais: Pais;
  searchText:string;
  constructor(private paisServicio: PaisService, private rutaActiva: ActivatedRoute) { }

  ngOnInit(): void {
    
    this.getPaises();
  }

  getPaises(){
    this.pais = new Pais();
    const nombre = this.rutaActiva.snapshot.params.nombre;
    this.paisServicio.getNombre(nombre).subscribe(p => {
      this.pais = p;
    });
  }

}
