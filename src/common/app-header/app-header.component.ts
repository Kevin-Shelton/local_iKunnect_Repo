import { Component } from '@angular/core';

@Component({
  selector: 'app-app-header',
  standalone: true,
  imports: [],
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.scss'
})
export class AppHeaderComponent {
  isClosed: boolean = false;

  closeFeatureGuide(): void {
    this.isClosed = true;
  }
}
