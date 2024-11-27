import { Component } from '@angular/core';
import {BookConsultationComponent} from '../../common/sharedComponents/book-consultation/book-consultation.component';
import {TransformCustomerServiceComponent} from '../../common/sharedComponents/transform-customer-service/transform-customer-service.component';
import { LicensePlanPricing } from '../../config/license-bundle-pricing';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [BookConsultationComponent, TransformCustomerServiceComponent, CommonModule],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.scss'
})
export class PricingComponent {
  title: string = 'Powering Exceptional \n Customer Journey.';
  plans= LicensePlanPricing;

  
  isText(type: string) {
    return type !== 'cross' && type !== 'tick'
  }
  getDataType(val: string, type: string) {
    return val === type;
  }
}
