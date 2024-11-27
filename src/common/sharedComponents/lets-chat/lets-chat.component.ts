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
    console.log('plat form id is ::::::::::::::::::: ',isPlatformBrowser(this.platformId))
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        let element: any = document?.getElementsByClassName("zammad-chat");
        console.log('element is +++++++++++++++++++++',element)
        console.log
        if (element?.length) {
          element[0].style.display = "block";
          element[0].className = "zammad-chat chat-client"
        }
      }, 500);
    }
  }
}
