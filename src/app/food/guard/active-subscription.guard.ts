import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  CanActivateFn,
} from '@angular/router';
import { SubscriptionService } from '../services/subscription.service';
import { TenantService } from '../services/tenant.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export const activeSubscriptionGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean> => {
  const router = inject(Router);
  const subscriptionService = inject(SubscriptionService);
  const tenantService = inject(TenantService);

  const domain = window.location.hostname;

  if (!domain) {
    router.navigate(['/inactive']);
    return of(false); // Si no hay businessName en la URL, redirige inmediatamente
  }

  return subscriptionService.getTenantStatusByBusinessName(domain).pipe(
    map((data) => {
      if (data.subscription_status === 1) {
        tenantService.currentTenant.set(data.tenant); // Actualiza el tenant actual
        return true; // Permite el acceso a la ruta
      } else {
     router.navigate(['/inactive']); // Redirige si la suscripción no es activa
        return false; // Bloquea el acceso a la ruta
      }
    }),
    catchError((err) => {
      console.error('Error fetching tenant status:', err);
    router.navigate(['/inactive']); // Redirige en caso de error
      return of(false); // Bloquea el acceso a la ruta
    })
  );
};
