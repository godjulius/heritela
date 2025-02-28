import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  template: `
    <div class="flex w-full h-full items-center justify-center">
      <p>Login page</p>
      <form>
        <input type="text">
        <input type="password">
      </form>
    </div>
  `,
  styles: `

  `,
})
export default class LoginComponent {
}
