import { Component, signal } from '@angular/core';
import {RouterLink} from "@angular/router";
import {SlideshowComponent} from "../components/carousel/slideshow.component";
import {CarouselComponent} from "../components/sub-carousel /sub-carousel.component";

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
   <div class="w-screen h-screen flex justify-center items-center">
     <div class="h-[80vh] w-[60vw]">
        <app-slideshow [viewWidth]="600"></app-slideshow>

     </div>
   </div>
  `,
  styles: `

  `,
  imports: [
    RouterLink,
    SlideshowComponent,
    CarouselComponent
  ]
})
export default class HomeComponent {
}
