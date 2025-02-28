import { Component, signal } from '@angular/core';
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-products',
  standalone: true,
  template: `
    <h1>Products layout</h1>
    <router-outlet></router-outlet>
  `,
  styles: `

  `,
  imports: [
    RouterOutlet
  ]
})
export default class ProductsComponent {
}
