import { Component } from '@angular/core';
import { BookConsultationComponent } from '../../common/sharedComponents/book-consultation/book-consultation.component';
import { PdfReaderComponent } from '../../common/sharedComponents/pdf-reader/pdf-reader.component';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [PdfReaderComponent, BookConsultationComponent],
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.scss',
})
export class PrivacyComponent {
  title: string = 'Powering Exceptional \n Customer Journeys.';
}
