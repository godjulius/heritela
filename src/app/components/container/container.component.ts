import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [CommonModule],
  host: { class: 'w-full' },
  template: `
    <div
      class="w-full mx-auto px-3 
                sm:max-w-[540px] 
                md:max-w-[720px] 
                lg:max-w-[960px] 
                xl:max-w-[1140px] 
                2xl:max-w-[1320px]"
    >
      <ng-content />
    </div>
  `,
})
export class ContainerComponent {}
