import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { PaymentHelperService } from '../../services/helper.service';

@Component({
  selector: 'app-license-customer',
  standalone: true,
  imports: [],
  templateUrl: './license-customer.component.html',
  styleUrl: './license-customer.component.scss'
})
export class LicenseCustomerComponent  {
  noOfLicenseSeats: number = 1;

  constructor(private readonly paymentService: PaymentHelperService){

  }

  decrementLicenseSeats() {
    if(this.noOfLicenseSeats > 1) {
      this.noOfLicenseSeats = this.noOfLicenseSeats - 1;
      this.paymentService.changelicense(this.noOfLicenseSeats);
    }
  }
  incrementLicenseSeats() {
   
      this.noOfLicenseSeats = this.noOfLicenseSeats + 1;
      this.paymentService.changelicense(this.noOfLicenseSeats);
  }
}
