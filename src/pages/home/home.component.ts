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
  title: string = 'The Future of Global Contact Centers—Powered by AI & Real-Time Translation';
  herosConfig = HerosData.home;
  
  // Language switcher
  selectedLanguage: string = 'en';
  languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
  ];

  // Metrics data
  metrics = [
    { value: '99.9%', label: 'Uptime Guarantee', icon: 'bi-shield-check' },
    { value: '40%', label: 'Faster Resolution', icon: 'bi-speedometer2' },
    { value: '85%', label: 'First Call Resolution', icon: 'bi-check-circle' },
    { value: '24/7', label: 'Global Support', icon: 'bi-globe' }
  ];

  ngOnInit(): void {
    window.scrollTo({ top: 6, behavior: 'smooth' });
  }

  bookConsult() {
    this.router.navigate(['/book-demo']);
    window.scrollTo(0, 0);
  }

  scheduleDemo() {
    this.router.navigate(['/book-demo']);
    window.scrollTo(0, 0);
  }

  explorePlans() {
    this.router.navigate(['/pricing']);
    window.scrollTo(0, 0);
  }

  switchLanguage(languageCode: string) {
    this.selectedLanguage = languageCode;
    // Implement language switching logic here
  }

  constructor(private readonly router: Router) {}
}

