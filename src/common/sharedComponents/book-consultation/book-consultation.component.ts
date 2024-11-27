import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-book-consultation',
  standalone: true,
  imports: [],
  templateUrl: './book-consultation.component.html',
  styleUrls: ['./book-consultation.component.scss']
})
export class BookConsultationComponent {
  @Input() title!: string; // Use ! to assert that title will be initialized later
  @Output() bookConsultEvt: EventEmitter<string> = new EventEmitter();
  bookConsult() {
    this.bookConsultEvt.emit('');
  }
}
