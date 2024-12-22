// src/app/models/order.model.ts
export interface Order {
    id?: number; // Opcional porque será autogenerado por la base de datos
    address: Address;
    id_tenant?:number;
    business_name?: string;
    tel: string;
    options : JSON;
    name_client: string;
    country : JSON,
    note?: string; // Opcional porque puede ser nulo
    total?: number;
    subtotal?:number;
    extraFee?:number;
    cart: any; // Ajusta el tipo según tu estructura real
    status?: number;
    created_at?: Date; // Opcional porque será autogenerado por la base de datos
  updated_at?: Date | any; // Opcional porque será autogenerado por la base de datos
  aux_date?: any;
  }
  
export  interface Address {
    lat: number;
    lon: number;
    name : string;
    // Otras propiedades de la dirección
  }  