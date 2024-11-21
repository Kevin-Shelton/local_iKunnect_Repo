import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
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
export class SelfcheckoutComponent {
  title: string = 'Powering Exceptional \n Customer Journey.';
  showCardDetails: boolean = false;
  paymentInfo!: {amount: number};
  constructor(private cdr: ChangeDetectorRef) {}
  ngAfterViewInit() {
    setTimeout(() => {
      this.cdr.detectChanges();
    });
  }

  handleCheckout() {
    this.showCardDetails = true;
    this.paymentInfo = {amount: 10000};
  }

  
}
