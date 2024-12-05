import { Component } from '@angular/core';
import {BookConsultationComponent} from '../../common/sharedComponents/book-consultation/book-consultation.component';
import {TransformCustomerServiceComponent} from '../../common/sharedComponents/transform-customer-service/transform-customer-service.component';
import {ContactUsComponent} from '../../common/sharedComponents/contact-us/contact-us.component'
@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [BookConsultationComponent, TransformCustomerServiceComponent, ContactUsComponent ],
  templateUrl: './demo.component.html',
  styleUrl: './demo.component.scss'
})
export class DemoComponent {
  title: string = 'Powering Exceptional \n Customer Journeys.';
}
