import { Component } from '@angular/core';
import { TransformCustomerServiceComponent } from '../../common/sharedComponents/transform-customer-service/transform-customer-service.component';
import { BookConsultationComponent } from '../../common/sharedComponents/book-consultation/book-consultation.component';
import { HerosData } from '../../config/heros';

@Component({
  selector: 'app-solutions',
  standalone: true,
  imports: [TransformCustomerServiceComponent, BookConsultationComponent],
  templateUrl: './solutions.component.html',
  styleUrl: './solutions.component.scss',
})
export class SolutionsComponent {
  title: string = 'Powering Exceptional \n Customer Journey.';
  herosConfig= HerosData.solution;
}
