import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BookConsultationComponent } from '../../common/sharedComponents/book-consultation/book-consultation.component';
import { ContactUsComponent } from '../../common/sharedComponents/contact-us/contact-us.component';
import { ExploreResourcesComponent } from '../../common/sharedComponents/explore-resources/explore-resources.component';
import { LetsChatComponent } from '../../common/sharedComponents/lets-chat/lets-chat.component';
import { HerosData } from '../../config/heros';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    ContactUsComponent,
    BookConsultationComponent,
    CommonModule,
    LetsChatComponent,
    ExploreResourcesComponent,
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  isChatEnabled: boolean = false;
  title: string = 'Powering Exceptional Customer Journeys.';
  herosConfig = HerosData.about;
}
