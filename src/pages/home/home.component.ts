import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
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

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    BookConsultationComponent,
    MatInputModule,
    MatFormFieldModule,
    LetsChatComponent,
    CommonModule,
    FormsModule,
    ExploreResourcesComponent,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  title: string = 'The Future of Global Contact Centers—Powered by AI & Real-Time Translation';
  
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

  // Contact form data
  contactFormData = {
    fullName: '',
    workEmail: '',
    phoneNumber: '',
    companyName: '',
    contactCenterSize: '',
    primaryLanguages: ''
  };

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

  // Getter methods for template bindings
  get currentLanguage() {
    return this.languages.find(lang => lang.code === this.selectedLanguage) || this.languages[0];
  }

  get currentLanguageFlag() {
    return this.currentLanguage.flag;
  }

  get currentLanguageName() {
    return this.currentLanguage.name;
  }

  // Submit contact form
  submitContactForm() {
    if (this.isValidContactForm()) {
      // Handle form submission logic here
      console.log('Contact form submitted:', this.contactFormData);
      // You can integrate with your backend API here
      alert('Thank you for your interest! Our team will contact you soon.');
      this.resetContactForm();
    }
  }

  // Validate contact form
  private isValidContactForm(): boolean {
    return !!(
      this.contactFormData.fullName &&
      this.contactFormData.workEmail &&
      this.contactFormData.phoneNumber &&
      this.contactFormData.companyName &&
      this.contactFormData.contactCenterSize
    );
  }

  // Reset contact form
  private resetContactForm() {
    this.contactFormData = {
      fullName: '',
      workEmail: '',
      phoneNumber: '',
      companyName: '',
      contactCenterSize: '',
      primaryLanguages: ''
    };
  }

  constructor(private readonly router: Router) {}
}

