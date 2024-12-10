import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TransformCustomerServiceComponent } from './../../common/sharedComponents/transform-customer-service/transform-customer-service.component';
@Component({
  selector: 'app-bookademo',
  standalone: true,
  imports: [CommonModule, TransformCustomerServiceComponent],
  templateUrl: './bookademo.component.html',
  styleUrl: './bookademo.component.scss',
})
export class BookademoComponent implements OnInit {
  headingText: string = 'HELLO WORLD'; // Your heading text
  headingArray: string[] = [];
  animationDuration: number = 0.2; // Animation duration per letter in seconds
  constructor() {
    // Convert the heading text into an array of characters
    this.headingArray = Array.from(this.headingText);
  }
  ngOnInit(): void {
    window.scrollTo({ top: 6, behavior: 'smooth' });
  }
}
