import { Component } from '@angular/core';
import { ContactUsComponent } from '../../common/sharedComponents/contact-us/contact-us.component';
import { BookConsultationComponent } from '../../common/sharedComponents/book-consultation/book-consultation.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [ContactUsComponent, BookConsultationComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  title: string = 'Powering Exceptional \n Customer Journey.';
}
