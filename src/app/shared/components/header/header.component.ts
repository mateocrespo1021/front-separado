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
import { SearchComponent } from '../search/search.component';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { CartService } from '../../../food/services/cart.service';
import { environments } from '../../../../environments/environments';
import { AmountCartComponent } from '../amount-cart/amount-cart.component';
import { CartItem } from '../../../food/interfaces/cart-item.interface';
import { ProductExplorerService } from '../../../food/services/product-explorer.service';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
} from '@angular/router';
import { SearchAutocompleteComponent } from '../search-autocomplete/search-autocomplete.component';
import { DetailsOrderComponent } from '../details-order/details-order.component';
import { DarkmodeComponent } from '../darkmode/darkmode.component';
import { ThemeService } from '../../services/theme.service';
import { TenantBusinessService } from '../../services/tenant-business.service';
import { ProductsClientService } from '../../../food/services/products-client.service';
import { TenantService } from '../../../food/services/tenant.service';
import { ModalScheduleComponent } from '../modal-schedule/modal-schedule.component';
import { AnimationsService } from '../../services/animations.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { HelpersService } from '../../services/helpers.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    SearchComponent,
    SidebarModule,
    ButtonModule,
    SearchAutocompleteComponent,
    DetailsOrderComponent,
    DarkmodeComponent,
    RouterModule,
    ModalScheduleComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  animations: [
    trigger('cartAnimation', [
      state(
        'initial',
        style({
          transform: 'scale(1)',
        })
      ),
      state(
        'bouncing',
        style({
          transform: 'scale(1.2) rotate(15deg)',
        })
      ),
      transition('initial => bouncing', [
        animate(
          '0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55)' // Añadimos un efecto de rebote suave
        ),
      ]),
      transition('bouncing => initial', [
        animate(
          '0.3s ease-out',
          style({
            transform: 'scale(0.9)', // Añade un efecto de contracción antes de volver al estado inicial
          })
        ),
        animate('0.2s ease-in'),
      ]),
    ]),
  ],
})
export class HeaderComponent implements OnInit {
  public value: string = '';
  is768px: boolean = false;
  currentWidth !: number 
  sidebarVisible: boolean = false;
  currentUrl!: string;
  public isOpen = false;

  public baseProducts: string = environments.baseProducts;
  public baseLogos: string = environments.baseLogos;

  private cartService = inject(CartService);
  private productsClientService = inject(ProductsClientService);
  private productExplorer = inject(ProductExplorerService);
  private themeService = inject(ThemeService);
  private router = inject(Router);
  private tenantBusinessService = inject(TenantBusinessService);
  private tenantService = inject(TenantService);
  private animationsService = inject(AnimationsService);
  private helpersService = inject(HelpersService);

  urlSegments!: string[];

  public sendMessage: boolean = false;
  public amountNumber: number = 1;
  public cartId!: string;
  businessName!: string;

  isModalOpen = false;

  closeModal(): void {
    this.isModalOpen = false;
  }

  get cartStateSignal() {
    return this.animationsService.cartStateSignal;
  }

  get businessSignal() {
    return this.tenantBusinessService.businessSignal;
  }

  get currentTenant() {
    return this.tenantService.currentTenant;
  }

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.currentUrl = this.router.url;
    // console.log(this.currentUrl);
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.updateUrl(event.urlAfterRedirects || event.url);
        }
      });

      this.updateUrl(this.currentUrl);
      this.checkWidth();
      //this.chargeInfoTenant();
      
       
        //Verifico si ya esta cerrado el negocio
        this.isOpen = this.helpersService.isBusinessOpen(
          JSON.parse(this.currentTenant().schedule)
        );
      
      
        
        this.isModalOpen = !this.isOpen;
      
    }
  }

  // //Carga a info del tenant
  // private chargeInfoTenant() {
  //   this.tenantService
  //     .getTenantByName(this.businessSignal())
  //     .subscribe((tenant) => {
  //       this.currentTenant.set(tenant);

  //       //Verifico si ya esta cerrado el negocio
  //       this.isOpen = this.helpersService.isBusinessOpen(
  //         JSON.parse(this.currentTenant().schedule)
  //       );

  //       this.isModalOpen = !this.isOpen
  //     });
  // }

  private updateUrl(url: string): void {
    this.currentUrl = url;

    // Divide la URL en segmentos y actualiza businessName
    this.urlSegments = this.currentUrl
      .split('/')
      .filter((segment) => segment.length > 0);

    // Aquí se asume que el nombre del negocio siempre será el último segmento de la URL
    this.businessName = this.urlSegments[this.urlSegments.length - 1];
   // console.log(this.businessName);

    this.businessSignal.set(this.businessName);
  }

  cleanCart() {
    this.currentCart.set([]);
    this.cartService.saveCartStorage();
  }

  get darkMode() {
    return this.themeService.signalModeDark();
  }

  sum(cartItem: CartItem) {
    cartItem.amount++;
    this.cartService.saveCartStorage();
  }

  min(cartItem: CartItem) {
    if (cartItem.amount == 1) return;
    cartItem.amount--;
    this.cartService.saveCartStorage();
  }

  deleteCartItem(id: string) {
    const cartDeleteUpdate = this.currentCart().filter(
      (cartItem) => cartItem.id != id
    );
    this.currentCart.set(cartDeleteUpdate);
    this.cartService.saveCartStorage();
  }

  //Carrito de compras
  get currentCart() {
    // console.log(this.currentCart());
    return this.cartService.cartSignal;
  }

  //Obtener la signal de los productos explorer
  get proExSignal() {
    return this.productExplorer.proExSignal;
  }

  //Obtener la signal del subtotal
  get subTotalSignal() {
    return this.cartService.subTotalCartSignal;
  }

  get totalItemsCart() {
    const totalItems = this.currentCart().reduce(
      (accumulator, cartItem) => accumulator + cartItem.amount,
      0
    );
    return totalItems;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkWidth();
  }

  getSearchItem($search: string) {
    //   console.log($search);
    //   console.log(this.businessName);

    this.productsClientService
      .getSearchItems(this.businessName, $search)
      .subscribe((products) => {
        if (products) {
          this.proExSignal.set(products);
        }
      });
  }

  getEmitDetails(event: any) {
    this.sendMessage = event;
  }

  sendMessageW() {
    //Verifico si ya esta cerrado el negocio
    this.isOpen = this.helpersService.isBusinessOpen(
      JSON.parse(this.currentTenant().schedule)
    );

    if (!this.isOpen) {
      this.isModalOpen = true
      return
    }
    this.sendMessage = true;
  }

  public checkWidth() {
    this.currentWidth = window.innerWidth
    this.is768px = window.innerWidth >= 768;
  }
}
