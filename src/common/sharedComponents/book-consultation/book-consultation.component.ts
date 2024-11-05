import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-book-consultation',
  standalone: true,
  imports: [],
  templateUrl: './book-consultation.component.html',
  styleUrls: ['./book-consultation.component.scss']
})
export class BookConsultationComponent {
  @Input() title!: string; // Use ! to assert that title will be initialized later
}
