import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Inject,
  OnInit,
  inject,
} from '@angular/core';
import { Category } from '../../interfaces/category.interface';
import { environments } from '../../../../environments/environments';
import { ProductExplorerService } from '../../services/product-explorer.service';
import { ProductsCategoryComponent } from '../../components/products-category/products-category.component';
import { ModalProductService } from '../../services/modal-product.service';
import { ModalCartProductComponent } from '../../components/modal-cart-product/modal-cart-product.component';
import { ToastModule } from 'primeng/toast';
import { ThemeService } from '../../../shared/services/theme.service';
import { ActivatedRoute } from '@angular/router';
import { TenantBusinessService } from '../../../shared/services/tenant-business.service';
import { SkeletonDataviewComponent } from '../../../shared/components/skeleton-dataview/skeleton-dataview.component';
import { LazyImageComponent } from '../../../shared/components/lazy-image/lazy-image.component';
import { CategoriesClientService } from '../../services/categories-client.service';
import { ProductsClientService } from '../../services/products-client.service';
import { SearchComponent } from '../../../shared/components/search/search.component';

@Component({
  selector: 'app-product-explorer',
  standalone: true,
  imports: [
    CommonModule,
    ProductsCategoryComponent,
    ModalCartProductComponent,
    ToastModule,
    SkeletonDataviewComponent,
    LazyImageComponent,
    SearchComponent,
  ],
  templateUrl: './product-explorer.component.html',
  styleUrl: './product-explorer.component.scss',
})
export class ProductExplorerComponent implements OnInit {
  private categoriesClientService = inject(CategoriesClientService);
  private productsClientService = inject(ProductsClientService);
  private productExplorer = inject(ProductExplorerService);
  private modalProduct = inject(ModalProductService);
  private themeService = inject(ThemeService);
  private activatedRoute = inject(ActivatedRoute);
  private tenantBusinessService = inject(TenantBusinessService);
  public baseCategories = environments.baseCategories;

  get businessName(): string {
    return this.tenantBusinessService.businessSignal();
  }

  public categories: Category[] = [];

  selectedIndex: number | null = null;
  public loadingProducts: boolean = false;
  get darkMode() {
    return this.themeService.signalModeDark();
  }
  is768px: boolean = false;
  public checkWidth() {
    this.is768px = window.innerWidth >= 768;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkWidth();
  }

  getSearchItem($search: string) {
    //   console.log($search);
    //   console.log(this.businessName);
    if ($search === '') return;
    this.productsClientService
      .getSearchItems(
       this.businessName,
        $search
      )
      .subscribe((products) => {
        if (products) {
          this.proExSignal.set(products);
        }
      });
  }

  toggleClass(index: number) {
    this.selectedIndex = index; // Selecciona el nuevo índice
  }

  get proExSignal() {
    return this.productExplorer.proExSignal;
  }

  get modal() {
    return this.modalProduct.modalSignal;
  }

  ngOnInit(): void {
    this.checkWidth();
    this.categoriesClientService
      .getCategoriesClient(
        this.businessName
      )
      .subscribe((categories) => {
        this.categories = categories;

        if (categories.length) {
          this.productsClientService
            .getProductsByCategory(categories[0].id)
            .subscribe((products) => {
              this.loadingProducts = true;
              this.selectedIndex = 0;
              this.proExSignal.set(products);
            });
        }
      });
  }

  clickCategory(category: Category, index: number) {
    this.toggleClass(index);
    this.productsClientService
      .getProductsByCategory(category.id)
      .subscribe((products) => {
        this.proExSignal.set(products);
      });
  }
}
