import { Component, signal } from '@angular/core';
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-auth',
  standalone: true,
  template: `
    <h1>Auth layout</h1>
    <router-outlet></router-outlet>
  `,
  styles: `

  `,
  imports: [
    RouterOutlet
  ]
})
export default class AuthComponent {
}
