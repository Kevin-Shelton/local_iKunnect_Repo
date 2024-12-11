import { Component, OnInit } from '@angular/core';
import { PricesByDuration } from '../../../../config/license-bundle-pricing';
import { BundleDetails, PlanDuration } from '../../../../models/website-models';
import { PaymentHelperService } from '../../services/helper.service';

@Component({
  selector: 'app-license-customer',
  standalone: true,
  imports: [],
  templateUrl: './license-customer.component.html',
  styleUrl: './license-customer.component.scss',
})
export class LicenseCustomerComponent implements OnInit {
  bundleDetails!: BundleDetails;
  constructor(private readonly paymentHelperService: PaymentHelperService) {}
  ngOnInit(): void {
    this.paymentHelperService.currentBundleDetails.subscribe({
      next: res => {
        this.bundleDetails = res;
      },
    });
  }

  planDurationChange() {
    if (this.bundleDetails.duration === PlanDuration.MONTHLY) {
      this.bundleDetails.duration = PlanDuration.ANNUALLY;
      const priceDet = PricesByDuration.year;
      const bundleAmount = priceDet[this.bundleDetails.type];
      this.bundleDetails.amount = bundleAmount;

      const total = {
        value: this.bundleDetails.quantity * this.bundleDetails.amount.value,
        disValue: `$${(this.bundleDetails.quantity * this.bundleDetails.amount.value).toFixed(2)}`,
      };
      this.bundleDetails.totalAmount = total;
    } else {
      this.bundleDetails.duration = PlanDuration.MONTHLY;
      const priceDet = PricesByDuration.month;
      const bundleAmount = priceDet[this.bundleDetails.type];
      this.bundleDetails.amount = bundleAmount;
      const total = {
        value: this.bundleDetails.quantity * this.bundleDetails.amount.value,
        disValue: `$${(this.bundleDetails.quantity * this.bundleDetails.amount.value).toFixed(2)}`,
      };
      this.bundleDetails.totalAmount = total;
    }
  }

  decrementBundleQuantity() {
    if (this.bundleDetails.quantity > 1) {
      this.bundleDetails.quantity = this.bundleDetails.quantity - 1;
      const total = {
        value: this.bundleDetails.quantity * this.bundleDetails.amount.value,
        disValue: `$${(this.bundleDetails.quantity * this.bundleDetails.amount.value).toFixed(2)}`,
      };
      this.bundleDetails.totalAmount = total;
      this.paymentHelperService.changeBundleDetails(this.bundleDetails);
    }
  }
  incrementBundleQuantity() {
    this.bundleDetails.quantity = this.bundleDetails.quantity + 1;
    const total = {
      value: this.bundleDetails.quantity * this.bundleDetails.amount.value,
      disValue: `$${(this.bundleDetails.quantity * this.bundleDetails.amount.value).toFixed(2)}`,
    };
    this.bundleDetails.totalAmount = total;

    this.paymentHelperService.changeBundleDetails(this.bundleDetails);
  }
}
