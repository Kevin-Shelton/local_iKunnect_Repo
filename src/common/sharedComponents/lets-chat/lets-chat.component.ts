import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  Renderer2,
} from '@angular/core';

@Component({
  selector: 'app-lets-chat',
  standalone: true,
  imports: [],
  templateUrl: './lets-chat.component.html',
  styleUrl: './lets-chat.component.scss',
})
export class LetsChatComponent implements OnInit, OnDestroy {
  // interval!: NodeJS.Timeout
  private mutationObserver: MutationObserver | null = null;
  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: object,
    private readonly renderer: Renderer2
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId) && typeof document !== 'undefined') {
      setTimeout(() => {
        // eslint-disable-next-line
        const element: any = document?.getElementsByClassName('zammad-chat');
        if (element?.length) {
          element[0].style.display = 'block';
          element[0].className = 'zammad-chat chat-client';
          this.setMessage();
        }
      }, 500);
    }
  }

  setMessage() {
    this.renderer.listen('document', 'click', (event: any) => {
      const targetClasses = event?.target?.classList;
      if (
        targetClasses?.contains('zammad-chat-welcome') ||
        targetClasses?.contains('zammad-chat-header') ||
        targetClasses?.contains('zammad-chat-welcome-text')
      ) {
        this.monitorChatModal();
      }
    });
  }

  monitorChatModal() {
    const chatContainer = document.querySelector('.zammad-chat-modal');
    if (!chatContainer) return;

    this.mutationObserver = new MutationObserver(() => {
      const domElement: any = document.querySelector('.zammad-chat-modal-text');
      if (domElement && domElement.innerText.includes('colleagues are busy')) {
        domElement.innerText =
          'All our agents are currently busy, will serve you at the earliest. Please be patient or try again later.';
        this.mutationObserver?.disconnect();
      }
    });

    this.mutationObserver.observe(chatContainer, {
      childList: true,
      subtree: true,
    });
  }

  ngOnDestroy() {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
    }
  }
}
