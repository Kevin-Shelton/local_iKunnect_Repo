import { Component, Input, input, OnInit } from '@angular/core';
import { Stripe, PaymentIntentResult, StripeCardElementOptions } from '@stripe/stripe-js';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaymentService } from '../../services/payment.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PaymentHelperService } from '../../services/helper.service';
import { BundleDetails } from '../../../../models/website-models';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent implements OnInit {

  stripe: Stripe | null = null;
  message: string | null = null;
  clientSecret!: string;
  stripeElements!: any;
  bundleDetails!: BundleDetails;

  constructor(
    private readonly paymentService: PaymentService,
    private readonly helperService: PaymentHelperService
  ) {
   
  }

  async ngOnInit() {
this.helperService.currentBundleDetails.subscribe({
  next: res => {
    this.bundleDetails = res;
  }
})
    this.stripe = await this.paymentService.getStripe();
   const resp = await this.paymentService.getProducts();
   
 const productDetails =  resp.productsWithPrices.find((prod: any) => {
 return prod.product.name === 'StartupTest'
 });

  const response =   await  this.paymentService.getStripeSession(productDetails.product.default_price, this.bundleDetails.quantity);
  const { clientSecret } = await response.json();
 
  await this.initStripe(clientSecret);  
  }

 async initStripe(clientSecret:string) {
  const checkout = await this.stripe?.initEmbeddedCheckout({
    clientSecret,
  });

  // Mount Checkout
  checkout?.mount('#checkout');
 
    // this.stripeElements = this.stripe?.elements({clientSecret, appearance:{
    //   theme: 'stripe',
    // } });

    // if (this.stripeElements) {
    //   const paymentElementOptions = {
    //     layout: "tabs",
    //   } as StripeCardElementOptions;
    //   const cardElement = this.stripeElements.create('payment', paymentElementOptions);
    //   cardElement.mount('#payment-element');
    // }
  }

   async pay() {
    console.log('res is :::::::',this.clientSecret);
    console.log('pay bill ', this.stripeElements)
 
     await this.stripe?.confirmPayment({
      elements:this.stripeElements,
      confirmParams: {
        
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:4200/self-checkout",
      },
    });
  
    console.log('----------------------------');
   // console.log('paymentIntent :: res ::::::',res);

   
  }
}
