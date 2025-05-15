import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as AOS from 'aos';
import { AppFooterComponent } from '../common/app-footer/app-footer.component';
import { AppHeaderComponent } from '../common/app-header/app-header.component';
import { LetsChatComponent } from '../common/sharedComponents/lets-chat/lets-chat.component';
import { API_URL } from '../config/env-config';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    AppHeaderComponent,
    AppFooterComponent,
    LetsChatComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'konnect-invictus';
  isChatEnabled: boolean = false;

  constructor(@Inject(PLATFORM_ID) private readonly platformId: object) {}
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId) && typeof document !== 'undefined') {
      this.loadScript();
      const observer = new MutationObserver(() => {
        const element: any = document?.getElementsByClassName('zammad-chat');
        if (element?.length) {
          console.log('chat is enabled');
          this.isChatEnabled = true;
          observer.disconnect(); // Stop observing after iframe is found
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });
    }
  }

  loadScript() {
    const script = document.createElement('script');
    script.src = API_URL.ZAMMAD_URL;
    script.type = 'text/javascript';
    script.async = true;
    // Append the script to the body
    script.onload = () => {
      console.log('script on load');
      // Initialize ZammadChat after script loads
      // eslint-disable-next-line
      new (window as any).ZammadChat({
        fontSize: '12px',
        chatId: 1,
        host: API_URL.ZAMMAD_WS,
        show: false,
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
