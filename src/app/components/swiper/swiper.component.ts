import {AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild} from '@angular/core';
import {CommonModule} from "@angular/common";
import {Swiper } from 'swiper';
import 'swiper/swiper-bundle.css';
import {SwiperOptions} from "swiper/types";
@Component({
  selector: 'app-swiper',
  imports: [CommonModule],
  templateUrl: './swiper.component.html',
  styleUrl: './swiper.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SwiperComponent implements AfterViewInit{
  @ViewChild('slider') slider!: ElementRef;
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
  swiper!: Swiper;

  ngAfterViewInit() {
    const subSwiperOptions: SwiperOptions = {
      breakpoints: {
        640: {
          slidesPerView: 3,
          spaceBetween: 8,
          slidesPerGroup: 3,
        },
        1024: {
          slidesPerView: 4,
          slidesPerGroup: 4,
          spaceBetween: 8,
        },
        1440: {
          slidesPerGroup: 5,
          slidesPerView: 5,
          spaceBetween: 8,
        },
      },
    };
    const subSwiperElement = document.querySelector('swiper-container.slider2');
    Object.assign(subSwiperElement || {}, subSwiperOptions);
    const swiperOptions: SwiperOptions = {

    }
    const swiperElement = document.querySelector('swiper-container.slider1');
    Object.assign(swiperElement || {}, swiperOptions)
  }
}
