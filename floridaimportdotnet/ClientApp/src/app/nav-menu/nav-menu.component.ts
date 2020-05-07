import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit{
  isExpanded = false;

  rol : string;
  nombre :  string;
  constructor(private router : Router){  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  ngOnInit(){
    this.rol = sessionStorage.getItem('User');
    this.nombre = sessionStorage.getItem('Nom');
  }

  salir(){
    sessionStorage.removeItem('User');
    sessionStorage.removeItem('Nom');
    window.location.href="https://localhost:5001";
  }
}
