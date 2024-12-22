import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environments } from '../../../environments/environments';
import { catchError, Observable, of } from 'rxjs';
import { Order } from '../interfaces/order.interface';
import { TenantService } from './tenant.service';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private baseUrl: string = environments.baseUrl;

  private tenantService = inject(TenantService);
  // get token() {
  //   return this.authService.tokenSig;
  // }

  get tenantAdmin() {
    return this.tenantService.currentTenantAdmin();
  }

  constructor(
    private httpClient: HttpClient,
  //  private authService: AuthService
  ) {}

  // getOrders(): Observable<Order[]> {
  //   const headers = new HttpHeaders().set(
  //     'Authorization',
  //     `Bearer ${this.token}`
  //   );
  //   return this.httpClient
  //     .get<Order[]>(`${this.baseUrl}/orders`, {
  //       params: { id_tenant: this.tenantAdmin.id },
  //       headers: headers, // Añade el token en los headers
  //     })
  //     .pipe(
  //       catchError(() => {
  //         // Si ocurre algún error, devuelve un array vacío
  //         return of([]);
  //       })
  //     );
  // }

  //${user.user.tenant.business_name}

  // getOrdersStatus(status: number): Observable<Order[]> {
  //   const headers = new HttpHeaders().set(
  //     'Authorization',
  //     `Bearer ${this.token}`
  //   );
  //   return this.httpClient.get<Order[]>(`${this.baseUrl}/orders/status`, {
  //     params: { id_tenant: this.tenantAdmin.id, status: status },
  //     headers: headers,
  //   });
  // }

  // getSearchItems(query: string): Observable<Order[]> {
  //   const headers = new HttpHeaders().set(
  //     'Authorization',
  //     `Bearer ${this.token}`
  //   );
  //   return this.httpClient.get<Order[]>(`${this.baseUrl}/orders/search`, {
  //     params: { id_tenant: this.tenantAdmin.id, q: query },
  //     headers: headers, // Añade el token en los headers
  //   });
  // }

  // getSearchDates(dates: any[]): Observable<Order[]> {
  //   const headers = new HttpHeaders().set(
  //     'Authorization',
  //     `Bearer ${this.token}`
  //   );

  //   // Convertir las fechas a UTC antes de enviarlas al backend
  //   const utcDates = dates.map((date: Date) => date.toISOString());

  //   console.log(utcDates);
    

  //   return this.httpClient.post<Order[]>(
  //     `${this.baseUrl}/orders/dates`,
  //     { rangeDates: utcDates }, // Incluye las fechas convertidas a UTC
  //     {
  //       params: { id_tenant: this.tenantAdmin.id.toString() },
  //       headers: headers, // Añade el token en los headers
  //     }
  //   );
  // }

  addOrder(order: Order): Observable<Order> {
    return this.httpClient.post<Order>(`${this.baseUrl}/orders`, order);
  }

  // updateStatusOrder(id: number | any, status: number): Observable<any> {
  //   if (!id) throw Error('Order Id is required');

  //   const headers = new HttpHeaders().set(
  //     'Authorization',
  //     `Bearer ${this.token}`
  //   );

  //   return this.httpClient.put<any>(
  //     `${this.baseUrl}/orders/${id}`,
  //     { id, status },
  //     { headers: headers }
  //   );
  // }
}
