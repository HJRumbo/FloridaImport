import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HandleHttpErrorService } from '../@base/handle-http-error.service';
import { Pais } from '../florida/models/pais';

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
export class PaisService {

  baseUrl: string;

constructor(

private http: HttpClient,

@Inject('BASE_URL') baseUrl: string,

private handleErrorService: HandleHttpErrorService)

{

this.baseUrl = baseUrl;
}

get(): Observable<Pais[]> {

  return this.http.get<Pais[]>(this.baseUrl + 'api/Pais')
  
  .pipe(
  
  tap(_ => this.handleErrorService.log('Consulta')),
  
  catchError(this.handleErrorService.handleError<Pais[]>('Consulta Pais', null))
  
  );
  
  }

  post(pais: Pais): Observable<Pais> {


      return this.http.post<Pais>(this.baseUrl + 'api/Pais', pais)
        .pipe(

          tap(_ => this.handleErrorService.log('Pais registrado correctamente.')),
      
          catchError(this.handleErrorService.handleError<Pais>('Registrar Pais', null))
    );
  }

  put(pais: Pais): Observable<any> {
    const url = `${this.baseUrl}api/Cliente/${pais.codigo}`;
    return this.http.put(url, pais, httpOptions)
    .pipe(
      tap(_ => this.handleErrorService.log('Informacion del pais modificada correctamente')),
      catchError(this.handleErrorService.handleError<any>('Editar Pais'))
    );
  }

  delete(pais: Pais| string): Observable<string> {
    const codigo = typeof pais === 'string' ? pais : pais.codigo;
    return this.http.delete<string>(this.baseUrl + 'api/Pais/'+ codigo)
    .pipe(
      tap(_ => this.handleErrorService.log('datos enviados')),
      catchError(this.handleErrorService.handleError<string>('Elimiar Pais', null))
    );
  }

  getNombre(nombre: string): Observable<Pais> {
    const url = `${this.baseUrl + 'api/Pais'}/${nombre}`;
      return this.http.get<Pais>(url, httpOptions)
      .pipe(
        tap(_ => this.handleErrorService.log('Consulta')),
        catchError(this.handleErrorService.handleError<Pais>('Buscar Pais', null))
      );
  }
  
}
