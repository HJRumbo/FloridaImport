import { Component, OnInit } from '@angular/core';

interface Paices {
    id: string;
    nombre: string;
    bandera: string;
}

const COUNTRIES: Paices[] = [
  {
    id: '1',
    nombre: 'Argentina',
    bandera: 'f/f3/Flag_of_Argentina.svg',
  },
  {
    id: '2',
    nombre: 'Chile',
    bandera: 'f/f3/Flag_of_Chile.svg',
  },
  {
    id: '3',
    nombre: 'Colombia',
    bandera: 'f/f3/Flag_of_Colombia.svg',
  },
  {
    id: '4',
    nombre: 'España',
    bandera: 'f/f3/Flag_of_Spain.svg',
  },
  {
    id: '5',
    nombre: 'Mexico',
    bandera: 'f/f3/Flag_of_Mexico.svg',
  },
  {
    id: '6',
  nombre: 'Peru',
    bandera: 'f/f3/Flag_of_Peru.svg',
  }
];

@Component({
  selector: 'app-agregar-ubicacion',
  templateUrl: './agregar-ubicacion.component.html',
  styleUrls: ['./agregar-ubicacion.component.css']
})
export class AgregarUbicacionComponent implements OnInit {

  paices: Paices[];
  constructor() { }

  ngOnInit(): void {
    this.paices = COUNTRIES;
  }

}
