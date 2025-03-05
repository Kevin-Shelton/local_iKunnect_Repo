import { Component } from '@angular/core';
import { PdfReaderComponent } from '../../common/sharedComponents/pdf-reader/pdf-reader.component';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [PdfReaderComponent],
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.scss'
})
export class PrivacyComponent {

}
