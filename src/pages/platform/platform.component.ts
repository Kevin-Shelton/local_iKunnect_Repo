import { Component } from '@angular/core';
import { BookConsultationComponent } from '../../common/sharedComponents/book-consultation/book-consultation.component';

@Component({
  selector: 'app-platform',
  standalone: true,
  imports: [BookConsultationComponent],
  templateUrl: './platform.component.html',
  styleUrl: './platform.component.scss',
})
export class PlatformComponent {
  title: string = 'Powering Exceptional \n Customer Journey.';
}
