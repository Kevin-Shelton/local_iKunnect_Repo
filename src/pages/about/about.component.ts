import { Component } from '@angular/core';
import { ContactUsComponent } from '../../common/sharedComponents/contact-us/contact-us.component';
import { BookConsultationComponent } from '../../common/sharedComponents/book-consultation/book-consultation.component';
import { HerosData } from '../../config/heros';
import { CommonModule } from '@angular/common';
import { LetsChatComponent } from '../../common/sharedComponents/lets-chat/lets-chat.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [ContactUsComponent, BookConsultationComponent, CommonModule, LetsChatComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  isChatEnabled: boolean = false;
  title: string = 'Powering Exceptional \n Customer Journey.';
  herosConfig= HerosData.about;
}
