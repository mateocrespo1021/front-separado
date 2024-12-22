import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { RecentProductsComponent } from '../../components/recent-products/recent-products.component';
import { PopularCategoriesComponent } from '../../components/popular-categories/popular-categories.component';
import { ProductDemonstrationComponent } from '../../components/product-demonstration/product-demonstration.component';
import { ToastModule } from 'primeng/toast';
import { ModalProductService } from '../../services/modal-product.service';
import { ModalCartProductComponent } from '../../components/modal-cart-product/modal-cart-product.component';
import { ThemeService } from '../../../shared/services/theme.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { GalleryComponent } from '../../../shared/components/gallery/gallery.component';
import { TenantBusinessService } from '../../../shared/services/tenant-business.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    CarouselModule,
    RecentProductsComponent,
    PopularCategoriesComponent,
    ProductDemonstrationComponent,
    ModalCartProductComponent,
    ToastModule,
    RouterModule,
    GalleryComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private modalProduct = inject(ModalProductService);
  private themeService = inject(ThemeService);
  private tenantBusinessService = inject(TenantBusinessService);

  get businessName(): string {
    return this.tenantBusinessService.businessSignal();
  }

 
  color: string = 'red';
  secondColor: string = '#ffc107';

  get darkMode() {
    return this.themeService.signalModeDark();
  }

  get modal() {
    return this.modalProduct.modalSignal;
  }

  ngOnInit(): void {}
}
