import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';
import { TenantBusinessService } from '../../services/tenant-business.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Slider } from '../../../food/interfaces/slider.interface';
import { FormsModule } from '@angular/forms';
import { environments } from '../../../../environments/environments';
import { ButtonModule } from 'primeng/button';
import { LazyImageComponent } from '../lazy-image/lazy-image.component';
import { ThemeService } from '../../services/theme.service';
import { SlidersClientService } from '../../../food/services/sliders-client.service';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [
    CommonModule,
    GalleriaModule,
    FormsModule,
    ButtonModule,
    LazyImageComponent,
  ],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
})
export class GalleryComponent {
  sliders: Slider[] = [];
  images: any[] | undefined;
  private tenantBusinessService = inject(TenantBusinessService);
  private router = inject(Router);
  public baseSliders = environments.baseSliders;
  loading: boolean = true; // Agregado para manejar el estado de carga

  private themeService = inject(ThemeService);

  get darkMode() {
    return this.themeService.signalModeDark();
  }

  get businessName(): string {
    return this.tenantBusinessService.businessSignal();
  }

  redirectPages(link: string): void {
    // Redirige al enlace
    if (link) {
      window.open(link, '_blank'); // Abre el enlace en una nueva pestaña
    } else {
      console.error('El enlace no está definido');
    }
  }

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5,
    },
    {
      breakpoint: '768px',
      numVisible: 3,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];

  constructor(private slidersClientService: SlidersClientService) {}

  ngOnInit() {
    // console.log("Hola desde galeria");

    this.slidersClientService.getSlidersClient(this.businessName).subscribe(
      (sliders) => {
        // Maneja los valores emitidos (next)
        this.sliders = sliders;
        console.log(sliders);

        this.loading = false;
      },
      (error) => {
        // Maneja los errores (error)
        console.error('Error al cargar los sliders:', error);
        this.loading = false;
      }
    );
  }

  imageLoaded: boolean = false;

  onImageLoad(event: Event) {
    this.imageLoaded = true;
  }
}