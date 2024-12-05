import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { PaymentHelperService } from '../../services/helper.service';
import { BundleDetails, PlanDuration } from '../../../../models/website-models';
import { PricesByDuration } from '../../../../config/license-bundle-pricing';

@Component({
  selector: 'app-license-customer',
  standalone: true,
  imports: [],
  templateUrl: './license-customer.component.html',
  styleUrl: './license-customer.component.scss'
})
export class LicenseCustomerComponent  implements OnInit{
  bundleDetails!: BundleDetails;
  constructor(private readonly paymentHelperService: PaymentHelperService){

  }
  ngOnInit(): void {
    this.paymentHelperService.currentBundleDetails.subscribe({
      next: res => {        
       this.bundleDetails = res;
      }
    })
  }

  planDurationChange() {
    if(this.bundleDetails.duration === PlanDuration.MONTHLY) {
      this.bundleDetails.duration = PlanDuration.ANNUALLY;
      let priceDet = PricesByDuration.year;
      let bundleAmount = priceDet[this.bundleDetails.type];
      this.bundleDetails.amount =  bundleAmount;

      let total = {value: this.bundleDetails.quantity * this.bundleDetails.amount.value, disValue:`$${(this.bundleDetails.quantity * this.bundleDetails.amount.value).toFixed(2)}` };
      this.bundleDetails.totalAmount = total;

    } else {
      this.bundleDetails.duration = PlanDuration.MONTHLY;
      let priceDet = PricesByDuration.month;
      let bundleAmount = priceDet[this.bundleDetails.type];
      this.bundleDetails.amount =  bundleAmount;
      let total = {value: this.bundleDetails.quantity * this.bundleDetails.amount.value, disValue:`$${(this.bundleDetails.quantity * this.bundleDetails.amount.value).toFixed(2)}` };
      this.bundleDetails.totalAmount = total;
    }
  }

  decrementBundleQuantity() {
    if(this.bundleDetails.quantity > 1) {
      this.bundleDetails.quantity = this.bundleDetails.quantity - 1;
      let total = {value: this.bundleDetails.quantity * this.bundleDetails.amount.value, disValue:`$${(this.bundleDetails.quantity * this.bundleDetails.amount.value).toFixed(2)}` };
      this.bundleDetails.totalAmount = total;
      this.paymentHelperService.changeBundleDetails(this.bundleDetails);
    }
  }
  incrementBundleQuantity() {      
      this.bundleDetails.quantity = this.bundleDetails.quantity + 1;
      let total = {value: this.bundleDetails.quantity * this.bundleDetails.amount.value, disValue:`$${(this.bundleDetails.quantity * this.bundleDetails.amount.value).toFixed(2)}` };
      this.bundleDetails.totalAmount = total;
     
      this.paymentHelperService.changeBundleDetails(this.bundleDetails);
  }
}
