import { Component } from '@angular/core';
import { BookConsultationComponent } from '../../common/sharedComponents/book-consultation/book-consultation.component';

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [BookConsultationComponent],
  templateUrl: './support.component.html',
  styleUrl: './support.component.scss',
})
export class SupportComponent {
  title: string =
    'Discover how our 24/7/365 customer service keeps your business connected around the clock';
}
