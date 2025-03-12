import { Component, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CurrencyPipe } from '@angular/common';
import { SelectModule } from 'primeng/select';
import { ImageModule } from 'primeng/image';
import {ContainerComponent} from "../components/container/container.component";
import {SlideshowComponent} from "../components/carousel/slideshow.component";
import {TabsModule} from "primeng/tabs";
import {BadgeModule} from "primeng/badge";
import {AvatarModule} from "primeng/avatar";
import {AccordionModule} from "primeng/accordion";
import {AnimateOnScroll} from "primeng/animateonscroll";
import {SwiperComponent} from "../components/swiper/swiper.component";

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: 'index.component.html',
  styles: [
    `
            :host {
                @keyframes slidedown-icon {
                    0% {
                        transform: translateY(0);
                    }

                    50% {
                        transform: translateY(20px);
                    }

                    100% {
                        transform: translateY(0);
                    }
                }

                .slidedown-icon {
                    animation: slidedown-icon;
                    animation-duration: 3s;
                    animation-iteration-count: infinite;
                }

                .box {
                    background-image: radial-gradient(var(--primary-300), var(--primary-600));
                    border-radius: 50% !important;
                    color: var(--primary-color-text);
                }
            }
        `
  ],
  imports: [
    ButtonModule,
    ContainerComponent,
    SlideshowComponent,
    CurrencyPipe,
    SelectModule,
    ImageModule,
    ButtonModule,
    TabsModule, AvatarModule, AccordionModule, SwiperComponent,
  ]
})
export default class HomeComponent {
  sizes = [
    { name: 'Nhỏ', value: 14 },
    { name: 'Vừa', value: 18 },
    { name: 'Lớn', value: 22 },
    { name: 'Siêu lớn', value: 26 },
  ];
}
