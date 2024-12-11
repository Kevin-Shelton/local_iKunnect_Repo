import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookConsultationComponent } from '../../common/sharedComponents/book-consultation/book-consultation.component';
import { TransformCustomerServiceComponent } from '../../common/sharedComponents/transform-customer-service/transform-customer-service.component';
import { HerosData } from '../../config/heros';
import { LetsChatComponent } from '../../common/sharedComponents/lets-chat/lets-chat.component';

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
  logos = [
    '../../assets/images/client-logo/jpmorgan.png',
    '../../assets/images/client-logo/wallmart.png',
    '../../assets/images/client-logo/samsung.png',
    '../../assets/images/client-logo/amazon.png',
    '../../assets/images/client-logo/lenovo.png',
    '../../assets/images/client-logo/microsoft.png',
    '../../assets/images/client-logo/jpmorgan.png',
    '../../assets/images/client-logo/wallmart.png',
    '../../assets/images/client-logo/samsung.png',
    '../../assets/images/client-logo/amazon.png',
    '../../assets/images/client-logo/lenovo.png',
    '../../assets/images/client-logo/microsoft.png',
    '../../assets/images/client-logo/jpmorgan.png',
    '../../assets/images/client-logo/wallmart.png',
    '../../assets/images/client-logo/samsung.png',
    '../../assets/images/client-logo/amazon.png',
    '../../assets/images/client-logo/lenovo.png',
    '../../assets/images/client-logo/microsoft.png',
    '../../assets/images/client-logo/jpmorgan.png',
    '../../assets/images/client-logo/wallmart.png',
    '../../assets/images/client-logo/samsung.png',
    '../../assets/images/client-logo/amazon.png',
    '../../assets/images/client-logo/lenovo.png',
    '../../assets/images/client-logo/microsoft.png'
  ];
}
