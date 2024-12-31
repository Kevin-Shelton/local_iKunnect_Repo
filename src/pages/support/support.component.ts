import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private readonly router: Router) {}
  bookConsult() {
    this.router.navigate(['/book-demo']);
    window.scrollTo(0, 0);
  }
}
