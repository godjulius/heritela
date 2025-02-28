import {Component, inject, OnInit} from '@angular/core';
import {Input} from "postcss";
import {ActivatedRoute} from "@angular/router";
import {map} from "rxjs";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-about',
  standalone: true,
  template: `
    <h2>Product with id: {{ productId }} page</h2>
    <p>
      Product details
    </p>
  `,
  styles: `

  `,
  imports: [
    AsyncPipe
  ]
})
export default class AboutComponent implements OnInit{
  productId = '';
  private readonly route = inject(ActivatedRoute)
  constructor() {
      this.route.paramMap.subscribe((route: any) => {
        this.productId = route.params['productId']
      })
  }

  ngOnInit() {
  }
}
