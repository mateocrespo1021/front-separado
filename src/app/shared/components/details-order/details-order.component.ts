import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  OnInit,
  Output,
  PLATFORM_ID,
  inject,
  signal,
} from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';

import { ButtonModule } from 'primeng/button';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { GeolocationService } from '../../../food/services/geolocation.service';
import { CartService } from '../../../food/services/cart.service';
import { MessageService } from 'primeng/api';
import { CartItem } from '../../../food/interfaces/cart-item.interface';
import { InputMaskModule } from 'primeng/inputmask';
import { Order } from '../../../food/interfaces/order.interface';
import { TenantBusinessService } from '../../services/tenant-business.service';
import { ViewChild } from '@angular/core';
import { TenantService } from '../../../food/services/tenant.service';
import { DropdownModule } from 'primeng/dropdown';
import { OrdersClientService } from '../../../food/services/orders-client.service';
import { TagModule } from 'primeng/tag';
import { InvokeFunctionExpr } from '@angular/compiler';
import { ValidatorService } from '../../services/validator.service';
import { OrdersOptions } from '../../../food/interfaces/tenant.interface';

declare var intlTelInput: any;
@Component({
  selector: 'app-details-order',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    RadioButtonModule,
    ButtonModule,
    InputMaskModule,
    DropdownModule,
    TagModule,
  ],
  templateUrl: './details-order.component.html',
  styleUrl: './details-order.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsOrderComponent implements OnInit, AfterViewInit {
  private fb = inject(FormBuilder);
  private geolocationService = inject(GeolocationService);
  private cartService = inject(CartService);
  private messageService = inject(MessageService);
  private ordersClientService = inject(OrdersClientService);
  private tenantBusinessService = inject(TenantBusinessService);
  private tenantService = inject(TenantService);
  private validatorService = inject(ValidatorService);
  private iti: any;
  private isBrowser: boolean;
  ordersOptions!: OrdersOptions;
  extraFeeTotal: number = 0;
  total: number = 0;
  detailsSelected: any[] = [];

  public formDetails: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    note: [''],
    tel: [
      '',
      [Validators.required, , Validators.pattern(/^\+?[1-9]\d{6,14}$/)],
    ],
    address: ['', Validators.required],
    country: ['', Validators.required],
  });

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.getAddressLocalStorage();
    this.getTelLocalStorage();
    //Obtenmos las opciones a iterar
    let options = this.currentTenant.orders_options;
    if (options && typeof options === 'string' && options.trim() !== '') {
      options = JSON.parse(options);
      this.ordersOptions = options;
      // Crear controles dinámicos para cada opción
      this.ordersOptions.options.forEach((option) => {
        const controlName = option.name;
        this.formDetails.addControl(
          controlName,
          this.fb.control('', Validators.required)
        );
      });
    }
  }

  @ViewChild('phoneInput', { static: false }) phoneInput!: ElementRef;

  get currentTenant() {
    return this.tenantService.currentTenant();
  }

  ngAfterViewInit(): void {
    const country = JSON.parse(this.currentTenant.country);
    //Inicializa el numero de telefono
    if (this.isBrowser) {
      const input = this.phoneInput.nativeElement;
      this.iti = intlTelInput(input, {
        initialCountry: this.tel().country
          ? this.tel().country.iso2
          : country.iso2, // Aquí usamos el país almacenado
        utilsScript:
          'https://cdn.jsdelivr.net/npm/intl-tel-input@23.8.0/build/js/utils.js',
      });

      input.addEventListener('change', () => {
        const fullNumber = this.iti.getNumber();
        const countryData = this.iti.getSelectedCountryData();
        this.formDetails.patchValue({
          tel: fullNumber,
          country: countryData,
        });
      });

      setTimeout(() => {
        const countryList = document.querySelector(
          '.iti__country-list'
        ) as HTMLElement;
        if (countryList) {
          countryList.style.backgroundColor = 'black';
          countryList.style.color = '#ccc';
        }
      }, 1000);
    }
  }

  get businessSignal() {
    return this.tenantBusinessService.businessSignal;
  }

  @Output()
  hiddenDetails = new EventEmitter<boolean>();

  emitEvent() {
    this.hiddenDetails.emit(false);
  }

  public address = signal<any>({});

  public tel = signal<any>({});

  get currentCart() {
    return this.cartService.cartSignal;
  }

  get subtotal() {
    return this.cartService.subTotalCartSignal;
  }

  //Evento que se ejecuta tras seleccionar una opcion para calcular el recargo total y el total
  changeOptionCalc(optionSelected: string, $event: any) {
    //Verificar que si existe la opcion seleccionada se intercambie
    const exist = this.detailsSelected.some(
      (item) => item.optionSelected == optionSelected
    );
    if (!exist) {
      this.detailsSelected.push({ optionSelected, ...$event.value });
    } else {
      //Actualizamos el array y hacemos el intercambio
      this.detailsSelected = this.detailsSelected.map((item) => {
        if (item.optionSelected == optionSelected) {
          item = { optionSelected, ...$event.value };
          return item;
        }
        return item;
      });
    }

    this.calcExtraFeeTotal();
  }

  calcExtraFeeTotal() {
    this.extraFeeTotal = this.detailsSelected.reduce(
      (accumulator, item) => accumulator + item.extraFee,
      0
    );

    //  console.log(this.extraFeeTotal);
  }

  isValidField(field: string) {
    return this.validatorService.isValidField(this.formDetails, field);
  }

  getFieldError(field: string) {
    return this.validatorService.getFieldError(this.formDetails, field);
  }

  saveAddressLocalStorage() {
    localStorage.setItem('address', JSON.stringify(this.address()));
  }

  saveTelLocalStorage() {
    localStorage.setItem('tel', JSON.stringify(this.tel()));
  }

  getAddressLocalStorage() {
    if (localStorage.getItem('address')) {
      this.address.set(JSON.parse(localStorage.getItem('address')!));
      //Cargar el address en el formulario
      this.formDetails.patchValue({
        address: this.address(),
      });
    }
  }

  getTelLocalStorage() {
    if (localStorage.getItem('tel')) {
      this.tel.set(JSON.parse(localStorage.getItem('tel')!));
      //Cargar el address en el formulario
      this.formDetails.patchValue({
        tel: this.tel().tel,
        country: this.tel().country,
      });
    }
  }

  deleteAddress() {
    this.address.set({});
    localStorage.removeItem('address');
  }

  getPosition() {
    this.geolocationService.getCurrentPosition().subscribe((resp) => {
      const { latitude, longitude } = resp.coords;
      if (latitude && longitude) {
        this.geolocationService
          .getAddress(latitude, longitude)
          .subscribe((resp) => {
            this.formDetails.patchValue({
              address: { lat: latitude, lon: longitude, name: resp },
            });
            this.address.set({ lat: latitude, lon: longitude, name: resp });
            //Guardamos la address en el localstorage
            this.saveAddressLocalStorage();
          });
      }
    });
  }

  get orderForm() {
    const { name, address, note, tel, country, ...options } =
      this.formDetails.value;
    //Verrficacion Note
    const noteVerfied = note == '' ? 'Ninguna' : note;
    const order = {
      name_client: name,
      address: JSON.stringify(address),
      note: noteVerfied,
      tel,
      country: JSON.stringify(country),
      cart: JSON.stringify(this.currentCart()),
      subtotal: this.subtotal(),
      total: this.subtotal() + this.extraFeeTotal,
      extraFee: this.extraFeeTotal,
      business_name: this.businessSignal(),
      options: JSON.stringify(options),
    };

    return order;
  }

  sendMessage() {
    if (!this.formDetails.valid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Ingrese todos los campos',
      });

      return;
    }

    //Guardo el localstorage el tel
    const { tel, country } = this.formDetails.value;
    this.tel.set({ tel, country });
    this.saveTelLocalStorage();

    //Enviamos el mensaje por wasap , guardamos la orden y llamamos websocket

    this.ordersClientService.addOrder(this.orderForm).subscribe((order) => {
      if (order) {
        this.currentCart.set([]);
        this.subtotal.set(0);
        //this.hiddenDetails.emit(false);
        this.cartService.saveCartStorage();
        //this.router.navigateByUrl("/")
        window.location.reload();
        this.messageService.add({
          severity: 'info',
          summary: 'Pedido realizado con exito',
        });
      }
    });

    const address = JSON.parse(this.orderForm.address);

    const googleMapsLink = `https://www.google.com/maps?q=${address.lat},${address.lon}`;

    const message = encodeURIComponent(
      '¡Hola! 🌟 Estoy interesado en encargar:\n\n' +
        this.formatCartItems(this.currentCart()) +
        `\n\n------------------------------------>\nNota : ${
          this.formDetails.get('note')!.value
        } ` +
        `\n\n------------------------------------>\nUbicación : ${address.name}` +
        `\n\n------------------------------------>\nGoogle Maps :${googleMapsLink}`
    );

    const whatsappUrl = `https://wa.me/${this.currentTenant.tel}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  }

  formatCartItems(cartItems: CartItem[]): string {
    // Recorremos los detalles seleccionados y formamos un string con las opciones
    const optionsDetails = this.detailsSelected
      .map(
        (detail) =>
          `Opción: ${detail.optionSelected} \n` +
          `Nombre: ${detail.name} \n` +
          `Recargo: $${detail.extraFee.toFixed(2)}`
      )
      .join('\n\n------------------------------------>\n');

    // Función que calcula el precio de cada producto
    const calculateItemPrice = (item: CartItem): number => {
      const totalCv = !isNaN(item.totalCv) ? item.totalCv : 0;
      const amount = !isNaN(item.amount) ? item.amount : 0;
      const totalAd = !isNaN(item.totalAd) ? item.totalAd : 0;

      return totalCv * amount + totalAd;
    };

    return (
      cartItems
        .map((item) => {
          const additionals = item.additionals.length
            ? item.additionals
                .map(
                  (add) =>
                    `${add.name + 'x' + add.amount + ' '} ($${add.price.toFixed(
                      2
                    )})`
                )
                .join(', ')
            : 'Ninguno';

          const itemPrice = calculateItemPrice(item); // Calculamos el precio del producto

          return `*${
            item.product.name +
            (item.variant.id != 0 ? ' Variante ' + item.variant.name : '')
          }*\nCantidad: ${
            item.amount
          } \n\nAdicionales: ${additionals}\n\n💵 Precio: $${itemPrice.toFixed(
            2
          )}\n\n------------------------------------>\n`;
        })
        .join('\n') +
      `\nDetalles de las opciones seleccionadas:\n` +
      optionsDetails +
      `\n\n------------------------------------>\n\n` +
      `*Subtotal: $${
        this.subtotal() && !isNaN(this.subtotal())
          ? this.subtotal().toFixed(2)
          : '0.00'
      }*\n` +
      `*Recargo: $${
        this.extraFeeTotal && !isNaN(this.extraFeeTotal)
          ? this.extraFeeTotal.toFixed(2)
          : '0.00'
      }*\n` +
      `*Total: $${
        this.subtotal() + this.extraFeeTotal &&
        !isNaN(this.subtotal() + this.extraFeeTotal)
          ? (this.subtotal() + this.extraFeeTotal).toFixed(2)
          : '0.00'
      }*`
    );
  }

  // formatCartItems(cartItems: CartItem[]): string {
  //   // Recorremos los detalles seleccionados y formamos un string con las opciones
  //   const optionsDetails = this.detailsSelected
  //     .map(
  //       (detail) =>
  //         `Opción: ${detail.optionSelected} \n` +
  //         `Nombre: ${detail.name} \n` +
  //         `Recargo: $${detail.extraFee.toFixed(2)}`
  //     )
  //     .join('\n\n------------------------------------>\n');
  //   return (
  //     cartItems
  //       .map((item) => {
  //         const additionals = item.additionals.length
  //           ? item.additionals
  //               .map(
  //                 (add) =>
  //                   `${add.name + 'x' + add.amount + ' '} ($${add.price.toFixed(
  //                     2
  //                   )})`
  //               )
  //               .join(', ')
  //           : 'Ninguno';
  //         return `*${
  //           item.product.name +
  //           (item.variant.id != 0 ? ' Variante ' + item.variant.name : '')
  //         }*\nCantidad: ${
  //           item.amount
  //         } \n\nAdicionales: ${additionals}\n\n💵 Precio: $${(
  //           item.totalCv * item.amount +
  //           item.totalAd
  //         ).toFixed(2)}\n\n------------------------------------>\n`;
  //       })
  //       .join('\n') +
  //     +(
  //       // Agregamos la sección con los detalles de las opciones seleccionadas
  //       `\nDetalles de las opciones seleccionadas:\n`
  //     ) +
  //     optionsDetails +
  //     `\n\n------------------------------------>\n\n` +
  //     `*Subtotal: $${this.subtotal().toFixed(2)}*\n` +
  //     `*Recargo: $${this.extraFeeTotal.toFixed(2)}*\n` +
  //     `*Total: $${(this.subtotal()+ this.extraFeeTotal).toFixed(2)}*`
  //   );
  // }
}
