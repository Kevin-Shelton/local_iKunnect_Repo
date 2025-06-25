import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, CommonModule],
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.scss',
})
export class AppHeaderComponent {
  isClosed: boolean = false;
  navPanel: boolean = false;

  constructor(private router: Router) {}

  closeFeatureGuide(): void {
    this.isClosed = true;
  }

  toggleNav(): void {
    this.navPanel = !this.navPanel;
  }

  bookConsult(): void {
    this.router.navigate(['/book-demo']);
    window.scrollTo(0, 0);
  }
}
