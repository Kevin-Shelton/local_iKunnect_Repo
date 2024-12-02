import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppHeaderComponent } from '../common/app-header/app-header.component';
import { AppFooterComponent } from '../common/app-footer/app-footer.component';
import { isPlatformBrowser } from '@angular/common';
import * as AOS from 'aos';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,AppHeaderComponent,AppFooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'konnect-invictus';
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      let element: any = document?.getElementsByClassName('zammad-chat');
      if (element?.length) {
        element[0].style.display = 'none';
      }
    }

    AOS.init({
      duration: 1200, // Animation duration
      // once: true      // Whether animation should happen only once
    });
  }
}
