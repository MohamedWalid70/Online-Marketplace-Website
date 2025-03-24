import { CartCounterService } from './../services/cartCounter/cart-counter.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  private _cartCounterService !: CartCounterService;
  counterValue !: number;

  constructor(){
    this._cartCounterService = inject(CartCounterService);
  }

  ngOnInit(){
    this._cartCounterService.getCounter().subscribe(globalCounter => this.counterValue = globalCounter);
  }

}
