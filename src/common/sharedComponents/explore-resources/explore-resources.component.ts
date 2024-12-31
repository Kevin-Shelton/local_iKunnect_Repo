import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-explore-resources',
  standalone: true,
  imports: [],
  templateUrl: './explore-resources.component.html',
  styleUrl: './explore-resources.component.scss',
})
export class ExploreResourcesComponent {
  constructor(private readonly router: Router) {}
  viewResources() {
    this.router.navigate(['/resources']);
    window.scrollTo(0, 0);
  }
}
