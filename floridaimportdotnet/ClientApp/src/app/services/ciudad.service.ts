import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HandleHttpErrorService } from '../@base/handle-http-error.service';
import { Ciudad } from '../florida/models/ciudad';

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
export class CiudadService {

  baseUrl: string;

constructor(

private http: HttpClient,

@Inject('BASE_URL') baseUrl: string,

private handleErrorService: HandleHttpErrorService)

{

this.baseUrl = baseUrl;
}

post(ciudad: Ciudad, nombrePais: string): Observable<Ciudad> {

  return this.http.post<Ciudad>(this.baseUrl + 'api/Ciudad/' + nombrePais, ciudad)
    .pipe(

      tap(_ => this.handleErrorService.log('Ciudad registrado correctamente.')),
  
      catchError(this.handleErrorService.handleError<Ciudad>('Registrar Ciudad', null))
);
}

put(ciudad: Ciudad): Observable<any> {
  const url = `${this.baseUrl}api/Ciudad/${ciudad.codigo}`;
  return this.http.put(url, ciudad, httpOptions)
  .pipe(
    tap(_ => this.handleErrorService.log('Informacion del ciudad modificada correctamente')),
    catchError(this.handleErrorService.handleError<any>('Editar Ciudad'))
  );
}
}
