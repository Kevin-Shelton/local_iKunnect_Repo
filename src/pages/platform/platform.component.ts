import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookConsultationComponent } from '../../common/sharedComponents/book-consultation/book-consultation.component';
import { PricingTableComponent } from '../pricing/components/pricing-table/pricing-table.component';

@Component({
  selector: 'app-platform',
  standalone: true,
  imports: [BookConsultationComponent, PricingTableComponent, CommonModule],
  templateUrl: './platform.component.html',
  styleUrl: './platform.component.scss',
})
export class PlatformComponent {
  title: string = 'Powering Exceptional \n Customer Journeys.';
  items = [
    { src: '../../assets/images/newObj-1.png', width: '190px' },
    { src: '../../assets/images/newObj-2.png', width: '240px' },
    { src: '../../assets/images/newObj-1.png', width: '190px' },
    { src: '../../assets/images/newObj-2.png', width: '240px' },
    { src: '../../assets/images/newObj-1.png', width: '190px' },
    { src: '../../assets/images/newObj-2.png', width: '240px' },
    { src: '../../assets/images/newObj-1.png', width: '190px' },
    { src: '../../assets/images/newObj-2.png', width: '240px' },
    { src: '../../assets/images/newObj-1.png', width: '190px' },
    { src: '../../assets/images/newObj-2.png', width: '240px' },
    { src: '../../assets/images/newObj-1.png', width: '190px' },
    { src: '../../assets/images/newObj-2.png', width: '240px' },
    { src: '../../assets/images/newObj-1.png', width: '190px' },
    { src: '../../assets/images/newObj-2.png', width: '240px' },
    { src: '../../assets/images/newObj-1.png', width: '190px' },
    { src: '../../assets/images/newObj-2.png', width: '240px' },
    { src: '../../assets/images/newObj-1.png', width: '190px' },
    { src: '../../assets/images/newObj-2.png', width: '240px' },
    { src: '../../assets/images/newObj-1.png', width: '190px' },
    { src: '../../assets/images/newObj-2.png', width: '240px' },
    { src: '../../assets/images/newObj-1.png', width: '190px' },
    { src: '../../assets/images/newObj-2.png', width: '240px' },
    { src: '../../assets/images/newObj-1.png', width: '190px' },
    { src: '../../assets/images/newObj-2.png', width: '240px' },
  ];
  constructor(private readonly router: Router) {}
  bookConsult() {
    this.router.navigate(['/book-demo']);
    window.scrollTo(0, 0);
  }
}
