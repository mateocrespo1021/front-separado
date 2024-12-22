import { Injectable, signal } from '@angular/core';
import { Category } from '../interfaces/category.interface';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductExplorerService {
   
  private categoryExplorer = signal<Category>({} as Category)
  private productsExplorer = signal<Product[]>([])
  
  

  get cateExSignal(){
    return this.categoryExplorer
  }

  get proExSignal(){
    return this.productsExplorer
  }

  constructor() { }

}
