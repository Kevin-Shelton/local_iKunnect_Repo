import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import * as AOS from 'aos';
import { RouterOutlet } from '@angular/router';
import { AppHeaderComponent } from '../common/app-header/app-header.component';
import { AppFooterComponent } from '../common/app-footer/app-footer.component';
import { isPlatformBrowser } from '@angular/common';
import { API_URL } from '../config/env-config';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AppHeaderComponent, AppFooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'konnect-invictus';
  constructor(@Inject(PLATFORM_ID) private readonly platformId: Object) {}
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId) && typeof document !== 'undefined') {
      this.loadScript()
      let element: any = document?.getElementsByClassName('zammad-chat');
      if (element?.length) {
        element[0].style.display = 'none';
      }
    }

    // AOS.init({
    //   duration: 1200, // Animation duration
    //   // once: true      // Whether animation should happen only once
    // });
  }



  loadScript() {
    const script = document.createElement('script');
    script.src = API_URL.ZAMMAD_URL;
    script.type = 'text/javascript';
    script.async = true;
       // Append the script to the body
       script.onload = () => {
        // Initialize ZammadChat after script loads
        new (window as any).ZammadChat({
          fontSize: '12px',
          chatId: 1,
          host: API_URL.ZAMMAD_WS
        });
      };
    document.body.appendChild(script);
  }

  ngAfterViewInit() {
    AOS.init({
      once: true, // Animation will happen only once
    });
  }
}
