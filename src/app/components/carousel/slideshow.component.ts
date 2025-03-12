import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from '../sub-carousel /sub-carousel.component';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css'],
  standalone: true,
  imports: [CommonModule, CarouselComponent],
})
export class SlideshowComponent {
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
  currentIndex = 0;
  startX = 0;
  translateX = 0;
  isDragging = false;

  constructor() {}

  onMouseDown(event: MouseEvent | TouchEvent) {
    event.preventDefault();
    this.startX =
      event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
    this.isDragging = true;
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent | TouchEvent) {
    if (!this.isDragging) return;
    event.preventDefault();
    this.translateX =
      (event instanceof MouseEvent ? event.clientX : event.touches[0].clientX) -
      this.startX;
  }

  onMouseUp() {
    this.isDragging = false;
    const threshold = 200; // Ngưỡng để quyết định ảnh nào hiển thị
    if (Math.abs(this.translateX) > threshold / 2) {
      if (this.translateX < 0) {
        this.nextImage();
      } else {
        this.prevImage();
      }
    }
    this.translateX = 0;
  }

  @HostListener('document:mouseup')
  onDragEnd() {
    if (this.isDragging) {
      this.onMouseUp();
    }
  }

  prevImage() {
    if (this.currentIndex === 0) {
      return;
    }
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  nextImage() {
    if (this.currentIndex === this.images.length - 1) {
      return;
    }
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }
}
