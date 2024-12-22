import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { Category } from '../../interfaces/category.interface';
import { environments } from '../../../../environments/environments';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TenantBusinessService } from '../../../shared/services/tenant-business.service';
import { ProgressiveImageComponent } from '../../../shared/components/ProgressiveImage/ProgressiveImage.component';
import { LazyImageComponent } from '../../../shared/components/lazy-image/lazy-image.component';
import { CategoriesClientService } from '../../services/categories-client.service';
import { ThemeService } from '../../../shared/services/theme.service';

@Component({
  selector: 'app-popular-categories',
  standalone: true,
  imports: [CommonModule, RouterModule, LazyImageComponent],
  templateUrl: './popular-categories.component.html',
  styleUrl: './popular-categories.component.scss',
})
export class PopularCategoriesComponent implements OnInit {
  public baseCategories: string = environments.baseCategories;

  public categories: Category[] = [];

  private categoriesClientService = inject(CategoriesClientService);

  private themeService = inject(ThemeService);
  get darkMode() {
    return this.themeService.signalModeDark();
  }

  private tenantBusinessService = inject(TenantBusinessService);

  get businessName(): string {
    return this.tenantBusinessService.businessSignal();
  }

  ngOnInit(): void {
    this.categoriesClientService
      .getRecentCategories(this.businessName, 12)
      .subscribe((categories) => {
        this.categories = categories;
      });
  }
}
 