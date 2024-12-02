import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.scss',
})
export class AppHeaderComponent {
  isClosed: boolean = false;
  navPanel: boolean = false;

  closeFeatureGuide(): void {
    this.isClosed = true;
  }
  toggleNav(): void {
    this.navPanel = !this.navPanel;
  }
}
