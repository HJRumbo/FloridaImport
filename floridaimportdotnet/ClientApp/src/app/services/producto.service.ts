import { Injectable, Inject } from '@angular/core';
import { Producto } from './../florida/models/producto';
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
export class ProductoService {

  baseUrl: string;

  constructor(
  
  private http: HttpClient,
  
  @Inject('BASE_URL') baseUrl: string,
  
  private handleErrorService: HandleHttpErrorService)
  
  {
  
  this.baseUrl = baseUrl;
  }
  
  get(): Observable<Producto[]> {
  
    return this.http.get<Producto[]>(this.baseUrl + 'api/Producto')
    
    .pipe(
    
    tap(_ => this.handleErrorService.log('Consulta')),
    
    catchError(this.handleErrorService.handleError<Producto[]>('Consulta Cliente', null))
    
    );
    
    }
  
    post(producto: Producto): Observable<Producto> {
  
  
        return this.http.post<Producto>(this.baseUrl + 'api/Producto', producto)
          .pipe(
  
            tap(_ => this.handleErrorService.log('Producto registrado correctamente.')),
        
            catchError(this.handleErrorService.handleError<Producto>('Registrar Producto', null))
  
      );
  
  
    }
  
    getCorreo(codigo: number): Observable<Producto> {
      const url = `${this.baseUrl + 'api/Producto'}/${codigo}`;
        return this.http.get<Producto>(url, httpOptions)
        .pipe(
          tap(_ => this.handleErrorService.log('Consulta')),
          catchError(this.handleErrorService.handleError<Producto>('Buscar Producto', null))
        );
    }
}
