import { Component, signal } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <h2>Welcome</h2>
    <p>index page</p>
    <a routerLink="login" class="text-xl text-blue-600">Dang nhap with routerLink</a>
    <a href="/login" class="text-xl text-blue-500">Dang nhap with href</a>
  `,
  styles: `

  `,
  imports: [
    RouterLink
  ]
})
export default class HomeComponent {
}
