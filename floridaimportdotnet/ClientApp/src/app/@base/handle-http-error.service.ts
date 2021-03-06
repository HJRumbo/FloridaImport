import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class HandleHttpErrorService {

  constructor(private modalService: NgbModal) { }
  
  public handleError<T>(operation = 'operation', result?: T) {
  
      return (error: any): Observable<T> => {
      
        if (error.status == "500") {
          this.mostrarError500(error);
          }          
          if (error.status == "400") {         
          this.mostrarError400(error);       
        }
  
      return of(result as T);
  
  };
  
  }

  private mostrarError500(error: any) {
    console.error(error);
  }

  public log(message: string) {

  if(message!=='Consulta'){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Resultado Operación.',
      text: message,
      showConfirmButton: false,
      timer: 1500
    })
    console.log(message);
  }else{
    console.log('Datos enviados');
  }
  
  
  }

  private mostrarError400(error: any): void {

    console.error(error);
    let contadorValidaciones: number = 0;    
    let mensajeValidaciones: string =
    
    `Señor(a) usuario(a), se han presentado algunos errores de validación, por favor revíselos y vuelva a realizar la
    operación.<br/><br/>`;
    
    for (const prop in error.error.errors) {
    
    contadorValidaciones++;
    mensajeValidaciones += `<strong>${contadorValidaciones}. ${prop}:</strong>`;   
    error.error.errors[prop].forEach(element => {    
    mensajeValidaciones += `<br/> - ${element}`;
    
    });
    
    mensajeValidaciones += `<br/>`;
    
    }
    
    Swal.fire({
      icon: 'error',
      title: 'Mensaje de Error...',
      html: mensajeValidaciones
    })
    
    }
  
  }
