import { Component } from '@angular/core';
import { AboutComponent } from '../about/about.component';
import { BookConsultationComponent } from '../../common/sharedComponents/book-consultation/book-consultation.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LetsChatComponent } from '../../common/sharedComponents/lets-chat/lets-chat.component';
import { CommonModule } from '@angular/common';
import { HerosData } from '../../config/heros';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AboutComponent,
    BookConsultationComponent,
    MatInputModule,
    MatFormFieldModule,
    LetsChatComponent,
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  isChatEnabled: boolean = false;
  title: string = 'Powering Exceptional \n Customer Journey.';
  herosConfig= HerosData.home
  constructor() {
    console.log('hero config is :::: ',this.herosConfig)
  }
}
