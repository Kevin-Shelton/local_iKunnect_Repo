import { Component } from '@angular/core';
import { AboutComponent } from '../about/about.component';
import {BookConsultationComponent} from '../../common/sharedComponents/book-consultation/book-consultation.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AboutComponent, BookConsultationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  title: string = 'Powering Exceptional \n Customer Journey.';
}
