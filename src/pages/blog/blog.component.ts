import { Component } from '@angular/core';
import { BookConsultationComponent } from '../../common/sharedComponents/book-consultation/book-consultation.component';
import { ExploreResourcesComponent } from '../../common/sharedComponents/explore-resources/explore-resources.component';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [BookConsultationComponent, ExploreResourcesComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
})
export class BlogComponent {
  title: string = 'Powering Exceptional \n Customer Journeys.';
}
