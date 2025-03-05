import {
  Component,
  AfterViewInit,
  HostListener,
  Input,
  OnChanges,
  SimpleChanges, EventEmitter, Output
} from '@angular/core';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-carousel',
  template: `
    <div class="relative cursor-pointer overflow-hidden">
      <button (click)="prevPage()"
              class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-50">❮
      </button>
      <button (click)="nextPage()"
              class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-50">❯
      </button>
      <div class="transition-transform duration-300 ease-in-out"
           (mousedown)="onMouseDown($event)"
           (touchstart)="onMouseDown($event)"
           (touchmove)="onMouseMove($event)"
           (touchend)="onMouseUp()"
           [ngStyle]="{
            'transform': 'translateX(' + ((-currentPage * viewWidth) > -maxOffset ? (-currentPage * viewWidth) : -maxOffset) + 'px) translateX(' + translateX + 'px)',
            'transition': isDragging ? 'none' : 'transform 0.3s ease-in-out'
      }">
        <div class="w-[600px] flex">
          <img *ngFor="let image of images; index as i" [src]="image" class="object-cover rounded-xl"
               [ngClass]="i === currentIndex ? 'selected-thumbnail ' : ''"
               [ngStyle]="{
                  width: imgWidth + 'px',
                  height: imgWidth + 'px',
                }"
               (mouseup)="selectThumbNail(i)"
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
  imports: [CommonModule]
})
export class CarouselComponent implements AfterViewInit, OnChanges {
  images = [
    'https://picsum.photos/600/600?random=1',
    'https://picsum.photos/600/600?random=2',
    'https://picsum.photos/600/600?random=3',
    'https://picsum.photos/600/600?random=4',
    'https://picsum.photos/600/600?random=5',
    'https://picsum.photos/600/600?random=6',
    'https://picsum.photos/600/600?random=7',
    'https://picsum.photos/600/600?random=8'
  ];
  @Input() currentIndex = 0;
  @Output() currentIndexChange = new EventEmitter<number>();
  isDragging = false;
  private startX = 0;
  translateX = 0;
  maxOffset = 0;
  currentPage = 0;
  totalPage = 0;
  imgWidth = 0;
  @Input() viewWidth = 600;
  @Input() imgPerView = 4;

  ngAfterViewInit() {
  }

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['viewWidth']) {
      this.imgWidth = this.viewWidth / this.imgPerView;
      this.maxOffset = this.images.length * this.imgWidth - this.viewWidth;
      this.totalPage = Math.ceil(this.images.length * this.imgWidth / this.viewWidth);
    }
    if (changes['currentIndex']) {
      this.currentPage = Math.floor(this.currentIndex / this.imgPerView);
    }
  }

  onMouseDown(event: MouseEvent | TouchEvent) {
    event.preventDefault();
    this.startX = (event instanceof MouseEvent) ? event.clientX : event.touches[0].clientX;
    this.isDragging = true;
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent | TouchEvent) {
    if (!this.isDragging) return;
    event.preventDefault();
    const moveX = ((event instanceof MouseEvent) ? event.clientX : event.touches[0].clientX) - this.startX;
    this.translateX = moveX;
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
      this.currentIndex = index;
      this.currentIndexChange.emit(this.currentIndex)
    }
  }
}
