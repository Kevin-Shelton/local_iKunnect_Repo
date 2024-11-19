import { Component } from '@angular/core';
import {BookConsultationComponent} from '../../common/sharedComponents/book-consultation/book-consultation.component';

@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [BookConsultationComponent],
  templateUrl: './resources.component.html',
  styleUrl: './resources.component.scss'
})
export class ResourcesComponent {
  title: string = 'Powering Exceptional \n Customer Journey.';
}
