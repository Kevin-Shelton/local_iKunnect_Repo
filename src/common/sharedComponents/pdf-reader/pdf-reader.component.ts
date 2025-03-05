import { ChangeDetectionStrategy, Component,Inject,PLATFORM_ID  } from '@angular/core';
import {  isPlatformBrowser } from '@angular/common';
import { NgxExtendedPdfViewerModule, NgxExtendedPdfViewerService } from 'ngx-extended-pdf-viewer';
@Component({
  selector: 'app-pdf-reader',
  standalone: true,
   imports: [NgxExtendedPdfViewerModule],
    providers: [NgxExtendedPdfViewerService],
    changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './pdf-reader.component.html',
  styleUrl: './pdf-reader.component.scss'
})
export class PdfReaderComponent {
  isBrowser: boolean;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
}
