import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../interfaces/order.interface';
import { environments } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrdersClientService {
  private baseUrl: string = environments.baseUrl;

  constructor(private httpClient:HttpClient) { }

  addOrder(order: any): Observable<Order> {
    return this.httpClient.post<Order>(`${this.baseUrl}/orders`, order);
  }


}
