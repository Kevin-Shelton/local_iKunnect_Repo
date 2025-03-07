import { Component } from '@angular/core';
import { BookConsultationComponent } from '../../common/sharedComponents/book-consultation/book-consultation.component';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [BookConsultationComponent],
  templateUrl: './terms.component.html',
  styleUrl: './terms.component.scss',
})
export class TermsComponent {
  title: string = 'Powering Exceptional \n Customer Journeys.';
}
