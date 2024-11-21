import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { PaymentHelperService } from '../../services/helper.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit{

  noOfLicenses!: number;
  amountForLicense: number = 125.00;
  subTotalAmount: string = '125.00';
constructor(private readonly paymentService: PaymentHelperService){

}
  ngOnInit(): void {
    this.paymentService.currentLicense.subscribe({
      next: res => {
        this.noOfLicenses = res;
        this.subTotalAmount = (this.noOfLicenses * this.amountForLicense).toFixed(2);
      }
    })
  }
 
 
}
