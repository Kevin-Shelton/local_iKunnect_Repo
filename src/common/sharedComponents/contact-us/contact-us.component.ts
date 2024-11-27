import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LetsChatComponent } from '../lets-chat/lets-chat.component';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule, LetsChatComponent],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent {
  isChatEnabled: boolean = false;
}
