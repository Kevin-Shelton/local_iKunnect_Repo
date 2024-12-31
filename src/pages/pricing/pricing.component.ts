import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BookConsultationComponent } from '../../common/sharedComponents/book-consultation/book-consultation.component';
import { TransformCustomerServiceComponent } from '../../common/sharedComponents/transform-customer-service/transform-customer-service.component';
import { PricingTableComponent } from './components/pricing-table/pricing-table.component';
@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [
    BookConsultationComponent,
    TransformCustomerServiceComponent,
    CommonModule,
    PricingTableComponent,
  ],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.scss',
})
export class PricingComponent {
  title: string = 'Powering Exceptional \n Customer Journeys.';
}
