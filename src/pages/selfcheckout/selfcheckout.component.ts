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
  planType!:  string;
  constructor(private readonly activatedRoute: ActivatedRoute, private readonly paymentService: PaymentService, private readonly paymentHelperService: PaymentHelperService) {}

  ngOnInit(): void {
    this.activatedRoute?.queryParams?.subscribe(params => {
      const afterPaySessionId = params['session_id'];
     if(afterPaySessionId) this.handlePaymentStatus(afterPaySessionId);
    });   
  }
 

  handleCheckout() {
    this.showCardDetails = true;
  }

  // Fetches the payment intent status after payment submission
async  handlePaymentStatus(sessionId: string) {
       const response= await this.paymentService.getStripeSessionStatus(sessionId);
       const { status, customer_email } = await response.json();
      this.setPaymentDetails(status);
  
}

setPaymentDetails(status: string) {
  this.statusText = "Something went wrong, please try again.";
  if(status === 'complete')   this.statusText = "Payment succeeded";


}


  
}
