import { Component, OnInit } from '@angular/core';
import { Stripe, PaymentIntentResult, StripeCardElementOptions } from '@stripe/stripe-js';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaymentService } from '../../services/payment.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent implements OnInit {
  paymentForm: FormGroup;
  stripe: Stripe | null = null;
  message: string | null = null;
  clientSecret!: string;
  stripeElements!: any;
  constructor(
    private stripeService: PaymentService,
    private fb: FormBuilder
  ) {
    this.paymentForm = this.fb.group({
      name: ['']
    });
  }

  async ngOnInit() {
  const response =   await  this.stripeService.getStripeIntent();
  const { clientSecret, dpmCheckerLink } = await response.json();
 
  await this.initStripe(clientSecret, dpmCheckerLink)
  
  }

 async initStripe(clientSecret:string, dpmCheckerLink:any) {
    this.stripe = await this.stripeService.getStripe();
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
    const name = this.paymentForm.get('name')?.value;
    const { paymentIntent, error }: PaymentIntentResult = await this.stripe?.confirmCardPayment(
      this.clientSecret, // Replace with actual client secret from server
      {
        payment_method: {
          card: this.stripeElements,
          billing_details: { name }
        }
      }
    ) ?? { paymentIntent: { status: 404 }, error: { message: 'Failed' } } as unknown as PaymentIntentResult;

    if (error) {
      this.message = error.message ?? 'Payment failed.';
    } else if (paymentIntent?.status === 'succeeded') {
      this.message = 'Payment successful!';
    }
  }
}
