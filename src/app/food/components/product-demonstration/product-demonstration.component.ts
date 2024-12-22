import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { environments } from '../../../../environments/environments';
import { Category } from '../../interfaces/category.interface';
import { DemostrationComponent } from '../demostration/demostration.component';
import { TenantBusinessService } from '../../../shared/services/tenant-business.service';
import { ActivatedRoute } from '@angular/router';
import { CategoriesClientService } from '../../services/categories-client.service';

@Component({
  selector: 'app-product-demonstration',
  standalone: true,
  imports: [CommonModule, DemostrationComponent],
  templateUrl: './product-demonstration.component.html',
  styleUrl: './product-demonstration.component.scss',
})
export class ProductDemonstrationComponent {
  public baseProducts: string = environments.baseProducts;

  public categories: Category[] = [];

  private categoriesClientService = inject(CategoriesClientService);
  private activatedRoute = inject(ActivatedRoute);
  

  private tenantBusinessService = inject(TenantBusinessService);

  get businessName(): string {
    return this.tenantBusinessService.businessSignal();
  }

  ngOnInit(): void {
    this.categoriesClientService
      .getRecentCategories(
       this.businessName,
        5
      )
      .subscribe((categories) => {
        this.categories = categories;
      });
  }
}
