import { Component, Input, input, OnInit } from '@angular/core';
import { Stripe, PaymentIntentResult, StripeCardElementOptions } from '@stripe/stripe-js';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaymentService } from '../../services/payment.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent implements OnInit {
 @Input() paymentInfo!: {amount: number};

  stripe: Stripe | null = null;
  message: string | null = null;
  clientSecret!: string;
  stripeElements!: any;
  constructor(
    private readonly paymentService: PaymentService,
    private readonly router: Router,
  ) {
   
  }

  async ngOnInit() {
    console.log('router:::::::::; ',this.router)
    console.log('paymentInfo ::::::::::::::',this.paymentInfo)
  const response =   await  this.paymentService.getStripeIntent(this.paymentInfo);
  const { clientSecret, dpmCheckerLink } = await response.json();
 
  await this.initStripe(clientSecret, dpmCheckerLink)
  
  }

 async initStripe(clientSecret:string, dpmCheckerLink:any) {
    this.stripe = await this.paymentService.getStripe();
    this.stripeElements = this.stripe?.elements({clientSecret, appearance:{
      theme: 'stripe',
    } });

    if (this.stripeElements) {
      const paymentElementOptions = {
        layout: "tabs",
      } as StripeCardElementOptions;
      const cardElement = this.stripeElements.create('payment', paymentElementOptions);
      cardElement.mount('#payment-element');
    }
  }

  async pay() {
    console.log('res is :::::::',this.clientSecret);
    console.log('pay bill ', this.stripeElements)
 
    const res= await this.stripe?.confirmPayment({
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
