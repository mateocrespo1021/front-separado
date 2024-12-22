import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimationsService {

  private cartState = signal<string>('initial')

  get cartStateSignal() {
    return this.cartState
  }

}
