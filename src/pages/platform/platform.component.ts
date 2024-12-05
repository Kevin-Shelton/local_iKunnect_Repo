import { Component } from '@angular/core';
import { BookConsultationComponent } from '../../common/sharedComponents/book-consultation/book-consultation.component';
import { PricingTableComponent } from '../pricing/components/pricing-table/pricing-table.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-platform',
  standalone: true,
  imports: [BookConsultationComponent, PricingTableComponent, CommonModule],
  templateUrl: './platform.component.html',
  styleUrl: './platform.component.scss',
})
export class PlatformComponent {
  title: string = 'Powering Exceptional \n Customer Journeys.';
}
