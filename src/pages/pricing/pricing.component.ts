import { Component } from '@angular/core';
import {BookConsultationComponent} from '../../common/sharedComponents/book-consultation/book-consultation.component';
import {TransformCustomerServiceComponent} from '../../common/sharedComponents/transform-customer-service/transform-customer-service.component';
@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [BookConsultationComponent, TransformCustomerServiceComponent],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.scss'
})
export class PricingComponent {
  title: string = 'Powering Exceptional \n Customer Journey.';
}
