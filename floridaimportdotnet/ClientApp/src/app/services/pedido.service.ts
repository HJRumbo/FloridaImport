import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HandleHttpErrorService } from '../@base/handle-http-error.service';
import { Observable } from 'rxjs';
import { Pedido } from '../florida/models/pedido';
import { catchError, tap } from 'rxjs/operators';

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
export class PedidoService {

  baseUrl: string;

constructor(

private http: HttpClient,

@Inject('BASE_URL') baseUrl: string,

private handleErrorService: HandleHttpErrorService)

{

this.baseUrl = baseUrl;
}

get(): Observable<Pedido[]> {

  return this.http.get<Pedido[]>(this.baseUrl + 'api/Pedido')
  
  .pipe(
  
  tap(_ => this.handleErrorService.log('Consulta')),
  
  catchError(this.handleErrorService.handleError<Pedido[]>('Consulta Pedido', null))
  
  );
  
  }

  post(pedido: Pedido): Observable<Pedido> {


      return this.http.post<Pedido>(this.baseUrl + 'api/Pedido', pedido)
        .pipe(

          tap(_ => this.handleErrorService.log('Pedido registrado correctamente.')),
      
          catchError(this.handleErrorService.handleError<Pedido>('Registrar Pedido', null))

    );


  }


  getCodigo(codigo: number): Observable<Pedido> {
    const url = `${this.baseUrl + 'api/Pedido'}/${codigo}`;
      return this.http.get<Pedido>(url, httpOptions)
      .pipe(
        tap(_ => this.handleErrorService.log('Consulta')),
        catchError(this.handleErrorService.handleError<Pedido>('Buscar Pedido', null))
      );
  }

  put(pedido: Pedido): Observable<any> {
    const url = `${this.baseUrl}api/Pedido/${pedido.codigoPedido}`;
    return this.http.put(url, pedido, httpOptions)
    .pipe(
      tap(_ => this.handleErrorService.log('Informacion del pedido modificada correctamente')),
      catchError(this.handleErrorService.handleError<any>('Editar Pedido'))
    );
  }

  getTotal(): Observable<number> {

    return this.http.get<number>(this.baseUrl + 'api/Pedido/totalVendido')
    
    .pipe(
    
    tap(_ => this.handleErrorService.log('Consulta')),
    
    catchError(this.handleErrorService.handleError<number>('Consulta del total vendido', null))
    
    );
    
    }

}
