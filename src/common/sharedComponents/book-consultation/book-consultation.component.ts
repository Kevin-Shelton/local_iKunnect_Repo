import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-consultation',
  standalone: true,
  imports: [],
  templateUrl: './book-consultation.component.html',
  styleUrls: ['./book-consultation.component.scss'],
})
export class BookConsultationComponent {
  @Input() title!: string; // Use ! to assert that title will be initialized later
  @Output() bookConsultEvt: EventEmitter<string> = new EventEmitter();
  constructor(private readonly router: Router) {}
  bookConsult() {
    this.bookConsultEvt.emit('');
    this.router.navigate(['/book-demo']);
    window.scrollTo(0, 0);
  }
}
