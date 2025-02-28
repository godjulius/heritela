import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-signup',
  standalone: true,
  template: `
    <div class="flex w-full h-full gap-6 items-center justify-center">
      <p>Signup page</p>
      <form>
        <input type="text">
        <input type="password">
      </form>
    </div>
  `,
  styles: `

  `,
})
export default class SignupComponent {
}
