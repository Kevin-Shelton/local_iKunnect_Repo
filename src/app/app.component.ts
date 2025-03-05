import { DOCUMENT, isPlatformBrowser } from '@angular/common';
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
import { API_URL } from '../config/env-config';
// import { PdfViewerModule } from 'ng2-pdf-viewer';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AppHeaderComponent, AppFooterComponent,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'konnect-invictus';
  constructor(@Inject(PLATFORM_ID) private readonly platformId: object,
  @Inject(DOCUMENT) private readonly document: Document
  ) {}
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId) && typeof this.document !== 'undefined') {
      this.loadScript();
      // eslint-disable-next-line
        const element: any = this.document?.getElementsByClassName('zammad-chat');
      console.log('element display none', element);
      if (element?.length) {
        console.log('element display in if', element);
        element[0].style.display = 'none';
      }
    }
  }

  loadScript() {
    const script = this.document.createElement('script');
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
    this.document.body.appendChild(script);
  }

  ngAfterViewInit() {
    AOS.init({
      once: true, // Animation will happen only once
    });
  }
}
