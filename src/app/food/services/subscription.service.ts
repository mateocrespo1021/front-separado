import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environments } from '../../../environments/environments';
import { catchError, Observable, of } from 'rxjs';
import { Subscription } from '../interfaces/subscription.interface';
//import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  private httpClient = inject(HttpClient);
  // private authService = inject(AuthService);

  private subscriptionAdmin = signal<Subscription | any>({});

  get subscriptionAdminSignal() {
    return this.subscriptionAdmin;
  }

  // get token() {
  //   return this.authService.tokenSig;
  // }

  private baseUrl: string = environments.baseUrl;

  // getSubscriptionById(id: number): Observable<Subscription | any> {
  //   const headers = new HttpHeaders().set(
  //     'Authorization',
  //     `Bearer ${this.token}`
  //   );
  //   const params = new HttpParams().set('id_tenant', id); // Agregamos el parámetro de consulta
  //   return this.httpClient
  //     .get<Subscription>(`${this.baseUrl}/subscriptions`, {
  //       params,
  //       headers: headers,
  //     }) // Pasamos los parámetros correctamente
  //     .pipe(catchError((error) => of(undefined)));
  // }

  getTenantStatusByBusinessName(business_name: string | any): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/subscriptions/status`, {
      business_name,
    });
  }

  getTenantStatusByDomain(domain: string | any): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/subscriptions/status`, {
    domain,
    });
  }

  // addSubscription(subscription: any): Observable<Subscription> {
  //   const headers = new HttpHeaders().set(
  //     'Authorization',
  //     `Bearer ${this.token}`
  //   );
  //   return this.httpClient.post<Subscription>(
  //     `${this.baseUrl}/subscriptions`,
  //     subscription,
  //     { headers: headers }
  //   );
  // }

  // updateSubscription(
  //   id_plan: number | any,
  //   id: number | any
  // ): Observable<Subscription> {
  //   if (!id) throw Error('Sub Id is required');
  //   const headers = new HttpHeaders().set(
  //     'Authorization',
  //     `Bearer ${this.token}`
  //   );
  //   return this.httpClient.put<Subscription>(
  //     `${this.baseUrl}/subscriptions/${id}`,
  //     { id_plan },
  //     { headers: headers }
  //   );
  // }
}
