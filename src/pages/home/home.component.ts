import { Component } from '@angular/core';
import { AboutComponent } from '../about/about.component';
import { BookConsultationComponent } from '../../common/sharedComponents/book-consultation/book-consultation.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LetsTalkComponent } from '../../common/sharedComponents/lets-talk/lets-talk.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AboutComponent,
    BookConsultationComponent,
    MatInputModule,
    MatFormFieldModule,
    LetsTalkComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  title: string = 'Powering Exceptional \n Customer Journey.';
}
