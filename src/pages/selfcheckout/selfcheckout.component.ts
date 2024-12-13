import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { BookConsultationComponent } from '../../common/sharedComponents/book-consultation/book-consultation.component';
import { LicenseCustomerComponent } from './components/license-customer/license-customer.component';
import { OrderComponent } from './components/order/order.component';
import { PaymentComponent } from './components/payment/payment.component';
import { PaymentService } from './services/payment.service';
@Component({
  selector: 'app-selfcheckout',
  standalone: true,
  imports: [
    MatFormFieldModule,
    BookConsultationComponent,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    CommonModule,
    PaymentComponent,
    LicenseCustomerComponent,
    OrderComponent,
  ],
  templateUrl: './selfcheckout.component.html',
  styleUrl: './selfcheckout.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class SelfcheckoutComponent implements OnInit {
  title: string = 'Powering Exceptional \n Customer Journeys.';
  showCardDetails: boolean = false;
  statusText!: string;
  planType!: string;
  isCheckout: boolean = true;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    this.activatedRoute?.queryParams?.subscribe(params => {
      const afterPaySessionId = params['session_id'];
      if (afterPaySessionId) {
        this.handlePaymentStatus(afterPaySessionId);
        this.isCheckout = false;
      }
    });
  }

  handleCheckout() {
    this.showCardDetails = true;
    this.isCheckout = false;
  }

  // Fetches the payment intent status after payment submission
  handlePaymentStatus(sessionId: string) {
    this.paymentService.getStripeSessionStatus(sessionId).subscribe({
      next: res => {
        this.setPaymentDetails(res.status);
      },
    });
  }

  setPaymentDetails(status: string) {
    this.statusText = 'Something went wrong, please try again.';
    if (status === 'complete') this.statusText = 'Payment succeeded';
  }
}
