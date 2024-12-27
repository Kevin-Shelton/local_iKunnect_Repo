import { Component, OnInit } from '@angular/core';
import { BookConsultationComponent } from '../../common/sharedComponents/book-consultation/book-consultation.component';
import { ResourcesService } from './services/resources.service';

@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [BookConsultationComponent],
  templateUrl: './resources.component.html',
  styleUrl: './resources.component.scss',
})
export class ResourcesComponent implements OnInit{
  title: string = 'Powering Exceptional Customer Journeys.';
  constructor(private readonly resourcesService: ResourcesService) {}
  ngOnInit(): void {
   this.resourcesService.getPosts().subscribe({
    next: res => {
      console.log('res posts::::::::: ',res);
    }
   })
  }
}
