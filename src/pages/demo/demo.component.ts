import { Component } from '@angular/core';
import {BookConsultationComponent} from '../../common/sharedComponents/book-consultation/book-consultation.component';
import {TransformCustomerServiceComponent} from '../../common/sharedComponents/transform-customer-service/transform-customer-service.component';
@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [BookConsultationComponent, TransformCustomerServiceComponent ],
  templateUrl: './demo.component.html',
  styleUrl: './demo.component.scss'
})
export class DemoComponent {
  title: string = 'Powering Exceptional \n Customer Journey.';
}
