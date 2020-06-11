import { Injectable, Inject } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { HandleHttpErrorService } from '../@base/handle-http-error.service';
import { Observable } from 'rxjs';
import { ProductoProveedor } from '../florida/models/producto-proveedor';
import { tap, catchError } from 'rxjs/operators';

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
export class ProductoProveedorService {

  baseUrl: string;

  constructor(
  
  private http: HttpClient,
  
  @Inject('BASE_URL') baseUrl: string,
  
  private handleErrorService: HandleHttpErrorService)
  
  {
  
  this.baseUrl = baseUrl;
  }
  
  get(): Observable<ProductoProveedor[]> {
  
    return this.http.get<ProductoProveedor[]>(this.baseUrl + 'api/ProductoProveedor')
    
    .pipe(
    
    tap(_ => this.handleErrorService.log('Consulta')),
    
    catchError(this.handleErrorService.handleError<ProductoProveedor[]>('Consulta Producto Proveedor', null))
    
    );
    
    }
  
    post(producto: ProductoProveedor): Observable<ProductoProveedor> {
  
  
        return this.http.post<ProductoProveedor>(this.baseUrl + 'api/ProductoProveedor', producto)
          .pipe(
  
            tap(_ => this.handleErrorService.log('Producto registrado correctamente.')),
        
            catchError(this.handleErrorService.handleError<ProductoProveedor>('Registrar Producto Proveedor', null))
  
      );
  
  
    }
  
    getCodigo(codigo: number): Observable<ProductoProveedor> {
      const url = `${this.baseUrl + 'api/ProductoProveedor'}/${codigo}`;
        return this.http.get<ProductoProveedor>(url, httpOptions)
        .pipe(
          tap(_ => this.handleErrorService.log('Consulta')),
          catchError(this.handleErrorService.handleError<ProductoProveedor>('Buscar Producto Proveedor', null))
        );
    }

    getIdentificacion(id: string): Observable<ProductoProveedor[]> {
      const url = `${this.baseUrl + 'api/ProductoProveedor'}/${id}`;
        return this.http.get<ProductoProveedor[]>(url, httpOptions)
        .pipe(
          tap(_ => this.handleErrorService.log('Consulta')),
          catchError(this.handleErrorService.handleError<ProductoProveedor[]>('Buscar Producto Producto Proveedor', null))
        );
    }

    put(producto: ProductoProveedor): Observable<any> {
      const url = `${this.baseUrl}api/ProductoProveedor/${producto.codigo}`;
      return this.http.put(url, producto, httpOptions)
      .pipe(
        tap(_ => this.handleErrorService.log('Informacion del producto modificada correctamente')),
        catchError(this.handleErrorService.handleError<any>('Editar Producto Proveedor'))
      );
    }

    delete(producto: ProductoProveedor| string): Observable<string> {
      const codigo = typeof producto === 'string' ? producto : producto.codigo;
      return this.http.delete<string>(this.baseUrl + 'api/ProductoProveedor/'+ codigo)
      .pipe(
        tap(_ => this.handleErrorService.log('datos enviados')),
        catchError(this.handleErrorService.handleError<string>('Elimiar producto', null))
      );
    }
}

