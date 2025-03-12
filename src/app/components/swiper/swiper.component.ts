import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-swiper',
  imports: [CommonModule],
  templateUrl: './swiper.component.html',
  styleUrl: './swiper.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SwiperComponent {
  images = [
    'https://picsum.photos/600/600?random=1',
    'https://picsum.photos/600/600?random=2',
    'https://picsum.photos/600/600?random=3',
    'https://picsum.photos/600/600?random=4',
    'https://picsum.photos/600/600?random=5',
    'https://picsum.photos/600/600?random=6',
    'https://picsum.photos/600/600?random=7',
    'https://picsum.photos/600/600?random=8',
    'https://picsum.photos/600/600?random=9',
    'https://picsum.photos/600/600?random=10',
  ];
}
