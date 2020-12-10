import { Injectable, Inject } from '@angular/core';
import { Cliente } from './../florida/models/cliente';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HandleHttpErrorService } from '../@base/handle-http-error.service';

const httpOptionsPut = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  responseType: 'text'
};

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
  
@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  baseUrl: string;

constructor(

private http: HttpClient,

@Inject('BASE_URL') baseUrl: string,

private handleErrorService: HandleHttpErrorService)

{

  this.baseUrl = baseUrl;
}

get(): Observable<Cliente[]> {

  return this.http.get<Cliente[]>(this.baseUrl + 'api/Cliente')
  
  .pipe(
  
  tap(_ => this.handleErrorService.log('Consulta')),
  
  catchError(this.handleErrorService.handleError<Cliente[]>('Consulta Cliente', null))
  
  );
  
  }

  post(cliente: Cliente): Observable<Cliente> {


      return this.http.post<Cliente>(this.baseUrl + 'api/Cliente', cliente)
        .pipe(

          tap(_ => this.handleErrorService.log('Cliente registrado correctamente.')),
      
          catchError(this.handleErrorService.handleError<Cliente>('Registrar Cliente', null))

    );


  }

  put(cliente: Cliente): Observable<any> {
    const url = `${this.baseUrl}api/Cliente/${cliente.identificacion}`;
    return this.http.put(url, cliente, httpOptions)
    .pipe(
      tap(_ => this.handleErrorService.log('Informacion del cliente modificada correctamente')),
      catchError(this.handleErrorService.handleError<any>('Editar Cliente'))
    );
  }

  getCorreo(correo: string): Observable<Cliente> {
    const url = `${this.baseUrl + 'api/Cliente'}/${correo}`;
      return this.http.get<Cliente>(url, httpOptions)
      .pipe(
        tap(_ => this.handleErrorService.log('Consulta')),
        catchError(this.handleErrorService.handleError<Cliente>('Buscar Cliente', null))
      );
  }

  delete(cliente: Cliente| string): Observable<string> {
    const id = typeof cliente === 'string' ? cliente : cliente.identificacion;
    return this.http.delete<string>(this.baseUrl + 'api/Cliente/'+ id)
    .pipe(
      tap(_ => this.handleErrorService.log('datos enviados')),
      catchError(this.handleErrorService.handleError<string>('Elimiar Cliente', null))
    );
  }

  getCount(): Observable<number> {

    return this.http.get<number>(this.baseUrl + 'api/Cliente/numeroClientes')
    
    .pipe(
    
    tap(_ => this.handleErrorService.log('Consulta')),
    
    catchError(this.handleErrorService.handleError<number>('Consulta del Número de Clientes', null))
    
    );
    
    }

}
