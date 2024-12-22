import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Inject,
  OnInit,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { RouterModule } from '@angular/router';
import { TenantService } from '../../../food/services/tenant.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent implements OnInit {
  date: number;
  is768px: boolean = false;
  private themeService = inject(ThemeService);
  private tenantService = inject(TenantService);

  get socialMedias() {
    if (this.currentTenant.social_networks) {
      return JSON.parse(this.currentTenant.social_networks);
    }
  }

  get currentTenant() {
    return this.tenantService.currentTenant();
  }

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.date = new Date().getFullYear();
  }

 
  get darkMode() {
    return this.themeService.signalModeDark();
  }

  
  ngOnInit(): void {
   // this.checkWidth();
  }
}
