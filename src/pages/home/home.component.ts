import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { BookConsultationComponent } from '../../common/sharedComponents/book-consultation/book-consultation.component';
import { ExploreResourcesComponent } from '../../common/sharedComponents/explore-resources/explore-resources.component';
import { LetsChatComponent } from '../../common/sharedComponents/lets-chat/lets-chat.component';
import { HerosData } from '../../config/heros';
import { AboutComponent } from '../about/about.component';
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
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  isChatEnabled: boolean = false;
  title: string = 'Powering Exceptional Customer Journeys.';
  herosConfig = HerosData.home;

  ngOnInit(): void {
    window.scrollTo({ top: 6, behavior: 'smooth' });
  }
  bookConsult() {
    this.router.navigate(['/book-demo']);
    window.scrollTo(0, 0);
  }
  constructor(private readonly router: Router) { }
}
