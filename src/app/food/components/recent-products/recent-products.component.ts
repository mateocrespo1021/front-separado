import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { Product } from '../../interfaces/product.interface';;
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { environments } from '../../../../environments/environments';
import { CarouselProductsComponent } from '../carousel-products/carousel-products.component';
import { TenantBusinessService } from '../../../shared/services/tenant-business.service';
import { LoadingSkeletonComponent } from '../../../shared/components/loading-skeleton/loading-skeleton.component';
import { ThemeService } from '../../../shared/services/theme.service';
import { ResponsiveService } from '../../../shared/services/responsive.service';
import { ProductsClientService } from '../../services/products-client.service';
@Component({
  selector: 'app-recent-products',
  standalone: true,
  imports: [
    CommonModule,
    CarouselModule,
    ButtonModule,
    LoadingSkeletonComponent,
    CarouselProductsComponent,
  ],
  templateUrl: './recent-products.component.html',
  styleUrl: './recent-products.component.scss',
})
export class RecentProductsComponent implements OnInit {
  public baseProducts: string = environments.baseProducts;

  public products: Product[] = [];

  private productsClientService = inject(ProductsClientService);
  private tenantBusinessService = inject(TenantBusinessService);
  private themeService = inject(ThemeService);

  //Puntos responsivos para el esqueloto de carga carusel
  responsiveOptions: any[];

  //Injeccion del responsiveservice y uso de esponsiveoptions
  constructor(private responsiveService: ResponsiveService) {
    this.responsiveOptions = this.responsiveService.responsiveOptions;
  }

  //Numero del skeleto de carga
  getSkeletonArray(): number[] {
    return this.responsiveService.getSkeletonArray();
  }

  //Agreggo darkmode segun el caso para los estilos sin primeng
  get darkMode() {
    return this.themeService.signalModeDark();
  }

  public loadingProducts: boolean = false;

  

  get businessName(): string {
    return this.tenantBusinessService.businessSignal();
  }

  ngOnInit(): void {
    //console.log(this.tenantBusinessService.getBusinessName(this.activatedRoute));
    this.productsClientService
      .getRecentProducts(
       this.businessName,
        10
      )
      .subscribe((products) => {
        this.loadingProducts = true;
        this.products = products;
      });
  }
}
