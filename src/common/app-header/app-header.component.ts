import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

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

  closeFeatureGuide(): void {
    this.isClosed = true;
  }
  toggleNav(): void {
    this.navPanel = !this.navPanel;
  }
}
