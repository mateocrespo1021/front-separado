import { Routes } from "@angular/router";
import { FoodLayoutComponent } from "./pages/food-layout/food-layout.component";
import { HomeComponent } from "./pages/home/home.component";
import { ProductExplorerComponent } from "./pages/product-explorer/product-explorer.component";
import { activeSubscriptionGuard } from "./guard/active-subscription.guard";

export const FOOD_ROUTES: Routes = [
  // {
  //   path: '',
  //   component: FoodLayoutComponent,
  //   children: [
  //     {
  //       path: '',
  //       component: HomeComponent,
  //       canActivate: [activeSubscriptionGuard],
  //     },
  //     {
  //       path: 'product-explorer',
  //       component: ProductExplorerComponent,
  //       canActivate: [activeSubscriptionGuard],
  //     },
  //     {
  //       path: '**',
  //       redirectTo: '/promotion',
  //       pathMatch: 'full',
  //     },
  //   ],
  // },
];
 