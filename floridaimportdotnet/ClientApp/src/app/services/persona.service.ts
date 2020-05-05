import { Injectable, Inject } from '@angular/core';
import { Cliente } from './../florida/models/cliente';
import { Persona } from './../florida/models/persona';
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
export class PersonaService {

  baseUrl: string;

constructor(

private http: HttpClient,

@Inject('BASE_URL') baseUrl: string,

private handleErrorService: HandleHttpErrorService)

{

this.baseUrl = baseUrl;
}

get(): Observable<Persona[]> {

  return this.http.get<Persona[]>(this.baseUrl + 'api/Cliente')
  
  .pipe(
  
  tap(_ => this.handleErrorService.log('Consulta')),
  
  catchError(this.handleErrorService.handleError<Persona[]>('Consulta Cliente', null))
  
  );
  
  }

  post(persona: Persona): Observable<Persona> {


      return this.http.post<Persona>(this.baseUrl + 'api/Cliente', persona)
        .pipe(

          tap(_ => this.handleErrorService.log('Cliente registrado correctamente.')),
      
          catchError(this.handleErrorService.handleError<Persona>('Registrar Cliente', null))

    );


  }

  getCorreo(correo: string): Observable<Persona> {
    const url = `${this.baseUrl + 'api/Cliente'}/${correo}`;
      return this.http.get<Persona>(url, httpOptions)
      .pipe(
        tap(_ => this.handleErrorService.log('Consulta')),
        catchError(this.handleErrorService.handleError<Persona>('Buscar Cliente', null))
      );
  }
}
