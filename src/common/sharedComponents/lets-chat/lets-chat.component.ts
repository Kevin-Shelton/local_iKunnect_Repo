import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-lets-chat',
  standalone: true,
  imports: [],
  templateUrl: './lets-chat.component.html',
  styleUrl: './lets-chat.component.scss'
})
export class LetsChatComponent {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId) && typeof document !== 'undefined') {
      setTimeout(() => {
        let element: any = document?.getElementsByClassName("zammad-chat");
        if (element?.length) {
          element[0].style.display = "block";
          element[0].className = "zammad-chat chat-client"
        }
      }, 500);
    }
  }
}
