import { Injectable, Inject } from '@angular/core';
import { Proveedor } from './../florida/models/proveedor';
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
export class ProveedorService {

  baseUrl: string;

constructor(

private http: HttpClient,

@Inject('BASE_URL') baseUrl: string,

private handleErrorService: HandleHttpErrorService)

{

this.baseUrl = baseUrl;
}

get(): Observable<Proveedor[]> {

  return this.http.get<Proveedor[]>(this.baseUrl + 'api/Proveedor')
  
  .pipe(
  
  tap(_ => this.handleErrorService.log('Consulta')),
  
  catchError(this.handleErrorService.handleError<Proveedor[]>('Consulta Proveedor', null))
  
  );
  
  }

  post(proveedor: Proveedor): Observable<Proveedor> {


      return this.http.post<Proveedor>(this.baseUrl + 'api/Proveedor', proveedor)
        .pipe(

          tap(_ => this.handleErrorService.log('Proveedor registrado correctamente.')),
      
          catchError(this.handleErrorService.handleError<Proveedor>('Registrar Proveedor', null))

    );


  }

  put(proveedor: Proveedor): Observable<any> {
    const url = `${this.baseUrl}api/Proveedor/${proveedor.identificacion}`;
    return this.http.put(url, proveedor, httpOptions)
    .pipe(
      tap(_ => this.handleErrorService.log('Informacion del proveedor modificada correctamente')),
      catchError(this.handleErrorService.handleError<any>('Editar Proveedor'))
    );
  }

  getCorreo(correo: string): Observable<Proveedor> {
    const url = `${this.baseUrl + 'api/Proveedor'}/${correo}`;
      return this.http.get<Proveedor>(url, httpOptions)
      .pipe(
        tap(_ => this.handleErrorService.log('Consulta')),
        catchError(this.handleErrorService.handleError<Proveedor>('Buscar proveedor', null))
      );
  }

  delete(proveedor: Proveedor| string): Observable<string> {
    const id = typeof proveedor === 'string' ? proveedor : proveedor.identificacion;
    return this.http.delete<string>(this.baseUrl + 'api/Proveedor/'+ id)
    .pipe(
      tap(_ => this.handleErrorService.log('datos enviados')),
      catchError(this.handleErrorService.handleError<string>('Elimiar Proveedor', null))
    );
  }

  getCount(): Observable<number> {

    return this.http.get<number>(this.baseUrl + 'api/Proveedor/numeroProveedores')
    
    .pipe(
    
    tap(_ => this.handleErrorService.log('Consulta')),
    
    catchError(this.handleErrorService.handleError<number>('Consulta del Número de Proveedores', null))
    
    );
    
    }

}
