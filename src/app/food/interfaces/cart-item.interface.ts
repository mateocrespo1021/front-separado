import { Additional } from './additional.interface'; 
import { Product } from './product.interface';
import { Variant } from './variant.interface';

export interface CartItem {
  id: string;
  product: Product;
  variant: Variant;
  additionals: Additional[];
  amount:number;
  totalCv: number;
  totalAd : number;
}
