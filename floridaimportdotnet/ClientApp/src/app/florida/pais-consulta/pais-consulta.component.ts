import { Component, OnInit } from '@angular/core';
import { PaisService } from 'src/app/services/pais.service';
import { Pais } from '../models/pais';

@Component({
  selector: 'app-pais-consulta',
  templateUrl: './pais-consulta.component.html',
  styleUrls: ['./pais-consulta.component.css']
})
export class PaisConsultaComponent implements OnInit {

  paises: Pais[];
  searchText:string;

  constructor(private paisServicio: PaisService) { }

  ngOnInit(): void {
    this.get();
  }

  get(){
    this.paisServicio.get().subscribe(result => {
      this.paises = result;      
    })
  }
}
