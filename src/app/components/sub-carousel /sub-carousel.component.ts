import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carousel',
  template: `
    <div class="relative cursor-pointer overflow-hidden">
      <button
        (click)="prevPage()"
        class="absolute h-full left-0 top-1/2 transform -translate-y-1/2 bg-[rgba(0,0,0,0.5)] hover:bg-[rgba(0,0,0,0.7)] text-white p-2 z-50 transition-all duration-300 ease-in-out"
        [ngClass]="
          currentPage === 0 ? 'opacity-0 invisible' : 'opacity-100 visible'
        "
      >
        ❮
      </button>
      <button
        (click)="nextPage()"
        class="absolute h-full right-0 top-1/2 transform -translate-y-1/2 bg-[rgba(0,0,0,0.5)] hover:bg-[rgba(0,0,0,0.7)] text-white p-2 z-50 transition-all duration-300 ease-in-out"
        [ngClass]="
          currentPage === totalPage - 1
            ? 'opacity-0 invisible'
            : 'opacity-100 visible'
        "
      >
        ❯
      </button>
      <div
        class="transition-transform duration-300 ease-in-out"
        (mousedown)="onMouseDown($event)"
        (touchstart)="onMouseDown($event)"
        (touchmove)="onMouseMove($event)"
        (touchend)="onMouseUp()"
        [ngStyle]="{
          transform:
            'translateX(' +
            (-currentPage * viewWidth - currentPage * marginRight > -maxOffset
              ? -currentPage * viewWidth - currentPage * marginRight
              : -maxOffset) +
            'px) translateX(' +
            translateX +
            'px)',
          transition: isDragging ? 'none' : 'transform 0.3s ease-in-out',
        }"
      >
        <div #subCarousel class="w-full flex">
          <img
            *ngFor="let image of images; index as i"
            [src]="image"
            class="object-cover"
            [ngClass]="i === currentIndex ? 'selected-thumbnail ' : ''"
            [ngStyle]="{
              width: imgWidth + 'px',
              height: imgWidth + 'px',
              'margin-right': marginRight + 'px',
            }"
            (mouseup)="selectThumbNail(i)"
            (touchend)="selectThumbNail(i)"
            alt="product-thumbnail"
          />
        </div>
      </div>
    </div>
  `,
  styles: `
    .selected-thumbnail {
      filter: brightness(30%);
    }
  `,
  imports: [CommonModule],
})
export class CarouselComponent implements AfterViewInit, OnChanges {
  @ViewChild('subCarousel') subCarousel!: ElementRef;
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
  @Input() currentIndex = 0;
  @Output() currentIndexChange = new EventEmitter<number>();
  isDragging = false;
  private startX = 0;
  translateX = 0;
  maxOffset = 0;
  currentPage = 0;
  totalPage = 0;
  imgWidth = 500;
  viewWidth = 600;
  marginRight = 8;
  @Input() imgPerView = 5;

  ngAfterViewInit() {
    this.calculateViewWidth();
  }

  constructor() {}

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.calculateViewWidth();
  }

  calculateViewWidth() {
    this.viewWidth = this.subCarousel.nativeElement.clientWidth;
    const freeSpace = this.viewWidth - this.marginRight * (this.imgPerView - 1);
    this.imgWidth = freeSpace / this.imgPerView;
    this.totalPage = Math.ceil(
      (this.images.length * this.imgWidth) / this.viewWidth
    );
    this.maxOffset =
      (this.totalPage - 1) * this.viewWidth +
      this.marginRight * (this.images.length - 1);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['viewWidth']) {
      this.imgWidth = this.viewWidth / this.imgPerView;
      this.maxOffset = this.images.length * this.imgWidth - this.viewWidth;
      this.totalPage = Math.ceil(
        (this.images.length * this.imgWidth) / this.viewWidth
      );
    }
    if (changes['currentIndex']) {
      this.currentPage = Math.floor(this.currentIndex / this.imgPerView);
    }
  }

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
    const threshold = this.viewWidth / 8;
    if (Math.abs(this.translateX) > threshold) {
      if (this.translateX < 0) {
        this.nextPage();
      } else {
        this.prevPage();
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

  prevPage() {
    if (this.currentPage === 0) {
      return;
    }
    this.currentPage = (this.currentPage - 1) % this.totalPage;
  }

  nextPage() {
    if (this.currentPage === this.totalPage - 1) {
      return;
    }
    this.currentPage++;
  }

  selectThumbNail(index: number) {
    if (Math.abs(this.translateX) < 5) {
      console.log(this.translateX);
      this.currentIndex = index;
      this.currentIndexChange.emit(this.currentIndex);
    }
  }
}
