import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppHeaderComponent } from '../common/app-header/app-header.component';
import { AppFooterComponent } from '../common/app-footer/app-footer.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,AppHeaderComponent,AppFooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'konnect-invictus';
}
