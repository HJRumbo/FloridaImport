import { Component, OnInit, Input } from '@angular/core';
import { User } from '../seguridad/user';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit{
  @Input() num: number;

  isExpanded = false;
  currentUser: User;
  rol : string;
  nombre :  string;
  constructor(private router : Router, private authenticationService: AuthenticationService)
  {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

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
    sessionStorage.removeItem('Correo');
    window.location.href="https://localhost:5001/";//"https://floridainternationalimport.azurewebsites.net";
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
