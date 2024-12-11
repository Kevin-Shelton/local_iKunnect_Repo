import { Component } from '@angular/core';
import { BookConsultationComponent } from '../../common/sharedComponents/book-consultation/book-consultation.component';
import { TransformCustomerServiceComponent } from '../../common/sharedComponents/transform-customer-service/transform-customer-service.component';
import { HerosData } from '../../config/heros';
import { LetsChatComponent } from '../../common/sharedComponents/lets-chat/lets-chat.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-solutions',
  standalone: true,
  imports: [TransformCustomerServiceComponent, BookConsultationComponent, LetsChatComponent, CommonModule],
  templateUrl: './solutions.component.html',
  styleUrl: './solutions.component.scss',
})
export class SolutionsComponent {
  isChatEnabled: boolean = false;
  title: string = 'Powering Exceptional \n Customer Journeys.';
  herosConfig = HerosData.solution;
}
