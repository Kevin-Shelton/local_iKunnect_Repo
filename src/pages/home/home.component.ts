import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    ReactiveFormsModule,
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
  
  // Contact form
  contactForm: FormGroup;
  
  // Language switcher
  selectedLanguage: string = 'en';
  languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
  ];

  // Collapsible capabilities
  expandedCapabilities: { [key: number]: boolean } = {};

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

  constructor(private readonly router: Router, private fb: FormBuilder) {
    // Initialize reactive form
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      company: ['', Validators.required],
      jobTitle: [''],
      message: [''],
      consent: [false, Validators.requiredTrue]
    });
  }

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
    if (this.contactForm.valid) {
      // Handle form submission logic here
      console.log('Contact form submitted:', this.contactForm.value);
      // You can integrate with your backend API here
      alert('Thank you for your interest! Our team will contact you soon.');
      this.contactForm.reset();
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.get(key)?.markAsTouched();
      });
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

  // Platform overview data using getters
  get platformTitle(): string {
    return 'Conquer complexity with one Platform for Contact Centers';
  }

  get platformSubtitle(): string {
    return 'Fragmented, complicated contact center operations are a thing of the past. The iKunnect Platform brings together multilingual AI translation, omnichannel communications, and intelligent automation in one place. Connect your teams and customers, get sharper insights, and drive serious results. All on one AI-integrated platform.';
  }

  get platformStats() {
    return [
      { value: '152+', label: 'Languages Supported' },
      { value: '99.9%', label: 'Uptime SLA' },
      { value: '40%', label: 'Faster Resolution' },
      { value: '24/7', label: 'Global Support' }
    ];
  }

  get platformCapabilities() {
    return [
      {
        number: '01',
        title: 'Agent Workspace',
        description: 'Unified omnichannel experience that empowers agents to deliver exceptional customer service across every touchpoint.',
        icon: 'bi bi-person-workspace'
      },
      {
        number: '02',
        title: 'Voice',
        description: 'Enterprise-grade cloud solution with intelligent call routing and advanced voice capabilities for seamless customer conversations.',
        icon: 'bi bi-telephone'
      },
      {
        number: '03',
        title: 'Email',
        description: 'Intelligent email management with automated routing, response suggestions, and seamless integration into your omnichannel workflow.',
        icon: 'bi bi-envelope'
      },
      {
        number: '04',
        title: 'Chat',
        description: 'Real-time messaging platform with AI-powered chatbots, proactive engagement, and seamless agent handoffs for instant customer support.',
        icon: 'bi bi-chat-dots'
      },
      {
        number: '05',
        title: '3rd Party Integration',
        description: 'Open API extensible layer with 50+ pre-built integrations to connect your existing CRM, helpdesk, and business applications seamlessly.',
        icon: 'bi bi-puzzle'
      },
      {
        number: '06',
        title: 'Ticketing System',
        description: 'Intelligent case management with automated workflows, SLA tracking, and cross-channel ticket resolution for superior customer service.',
        icon: 'bi bi-ticket-perforated'
      },
      {
        number: '07',
        title: 'Workflow and Triggers',
        description: 'Customizable business process engine that eliminates manual tasks, ensures compliance, and accelerates customer issue resolution.',
        icon: 'bi bi-gear'
      },
      {
        number: '08',
        title: 'Analytics and Dashboarding',
        description: 'Real-time performance insights and predictive analytics that optimize agent productivity and deliver actionable customer experience metrics.',
        icon: 'bi bi-graph-up'
      },
      {
        number: '09',
        title: 'Administration',
        description: 'Streamlined centralized platform management with role-based access, automated provisioning, and enterprise-grade security controls.',
        icon: 'bi bi-shield-check'
      },
      {
        number: '10',
        title: 'AI Translation',
        description: 'Embedded real-time multilingual capability with AI-powered translation that breaks language barriers and expands your global customer reach.',
        icon: 'bi bi-translate'
      },
      {
        number: '11',
        title: 'Sales and Marketing',
        description: 'Turn every interaction into a lead—built-in tools to capture, qualify, and convert. From first touch to closed deal—seamless lead and opportunity management inside your CCaaS.',
        icon: 'bi bi-graph-up-arrow'
      }
    ];
  }

  // Calculate position for circular layout
  getCapabilityPosition(index: number): string {
    const totalItems = this.platformCapabilities.length;
    const angle = (360 / totalItems) * index - 90; // Start from top
    const radius = 280; // Distance from center
    const x = Math.cos(angle * Math.PI / 180) * radius;
    const y = Math.sin(angle * Math.PI / 180) * radius;
    return `translate(${x}px, ${y}px)`;
  }

  // Toggle capability expansion
  toggleCapability(capabilityId: number) {
    this.expandedCapabilities[capabilityId] = !this.expandedCapabilities[capabilityId];
  }
}

