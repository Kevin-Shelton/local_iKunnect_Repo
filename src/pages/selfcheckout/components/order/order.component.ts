import { Component } from '@angular/core';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent {
  noOfBundleQuatity!: number;
  amountForLicense: number = 125.0;
  subTotalAmount: string = '125.00';
}
