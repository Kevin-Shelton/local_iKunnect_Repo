import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
// import {MatTabsModule} from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {BookConsultationComponent} from '../../common/sharedComponents/book-consultation/book-consultation.component';
import { PaymentComponent } from './components/payment/payment.component';
import { CommonModule } from '@angular/common';
import { LicenseCustomerComponent } from './components/license-customer/license-customer.component';
import { OrderComponent } from './components/order/order.component';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from './services/payment.service';
import { PaymentIntent } from '@stripe/stripe-js';
import { PaymentHelperService } from './services/helper.service';
@Component({
  selector: 'app-selfcheckout',
  standalone: true,
  imports: [MatFormFieldModule, BookConsultationComponent, MatInputModule,
     MatCheckboxModule, 
     MatSelectModule,
     CommonModule,
     PaymentComponent,
     LicenseCustomerComponent,
     OrderComponent],
  templateUrl: './selfcheckout.component.html',
  styleUrl: './selfcheckout.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class SelfcheckoutComponent implements OnInit{
  title: string = 'Powering Exceptional \n Customer Journey.';
  showCardDetails: boolean = false;
  statusText!: string;
  paymentInfo!: {amount: string};
  constructor(private readonly activatedRoute: ActivatedRoute, private readonly paymentService: PaymentService, private readonly paymentHelperService: PaymentHelperService) {}

  ngOnInit(): void {
    this.activatedRoute?.queryParams?.subscribe(params => {
      console.log('query params are ::::::::',params['payment_intent_client_secret'])
      const afterPayIntent = params['payment_intent_client_secret'];
     if(afterPayIntent) this.handlePaymentStatus(afterPayIntent);
    });

    this.paymentHelperService.currentTotalAmount.subscribe({
      next: res => {
        this.paymentInfo = {amount: (Number(res) * 100).toFixed(2)};
       
      }
    })
  }
 

  handleCheckout() {
    this.showCardDetails = true;
  //  this.paymentInfo = {amount: 10000};
  }

  // Fetches the payment intent status after payment submission
async  handlePaymentStatus(clientSecret: string) {
  const stripe = await this.paymentService.getStripe()
   if(clientSecret && stripe) {
     
       const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);
     
      this.setPaymentDetails(paymentIntent);
   } else {
    this.statusText = "Something went wrong, please try again.";
   }
}

setPaymentDetails(intent: PaymentIntent | undefined) {
  this.statusText = "Something went wrong, please try again.";
  if(intent)  {

    switch (intent.status) {
      case "succeeded":
        this.statusText = "Payment succeeded";
        break;
      case "processing":
        this.statusText = "Your payment is processing.";
        break;
      case "requires_payment_method":
        this.statusText = "Your payment was not successful, please try again.";
        break;
      default:
        break;
    }
  }
}


  
}
