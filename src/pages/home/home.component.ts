import { Component } from '@angular/core';
import { AboutComponent } from '../about/about.component';
import { BookConsultationComponent } from '../../common/sharedComponents/book-consultation/book-consultation.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LetsChatComponent } from '../../common/sharedComponents/lets-chat/lets-chat.component';
import { CommonModule } from '@angular/common';
import { HerosData } from '../../config/heros';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ExploreResourcesComponent } from '../../common/sharedComponents/explore-resources/explore-resources.component';
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
    ExploreResourcesComponent,
    RouterLink, RouterLinkActive, RouterOutlet,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  isChatEnabled: boolean = false;
  title: string = 'Powering Exceptional Customer Journeys.';
  herosConfig = HerosData.home;
  ngOnInit(): void {
    window.scrollTo({ top: 6, behavior: 'smooth' });
  }
  constructor() {
    console.log('hero config is :::: ', this.herosConfig);
  }
}
