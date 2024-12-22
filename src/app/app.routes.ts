import { Routes } from '@angular/router';
import { FoodLayoutComponent } from './food/pages/food-layout/food-layout.component';
import { HomeComponent } from './food/pages/home/home.component';
import { activeSubscriptionGuard } from './food/guard/active-subscription.guard';
import { ProductExplorerComponent } from './food/pages/product-explorer/product-explorer.component';
import { InactiveStoreComponent } from './shared/pages/inactive-store/inactive-store.component';

export const routes: Routes = [
  {
    path: '',
    component: FoodLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        canActivate: [activeSubscriptionGuard],
      },
      {
        path: 'product-explorer',
        component: ProductExplorerComponent,
        canActivate: [activeSubscriptionGuard],
        },
      {
        path: 'inactive',
        component: InactiveStoreComponent,
        // canActivate: [activeSubscriptionGuard],
        },
      {
        path: '**',
        redirectTo: '/inactive',
        pathMatch: 'full',
      },
    ],
  },
];
