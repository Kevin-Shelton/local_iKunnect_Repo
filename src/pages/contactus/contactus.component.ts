import { Component } from '@angular/core';
import {BookConsultationComponent} from '../../common/sharedComponents/book-consultation/book-consultation.component';
import {ContactUsComponent} from '../../common/sharedComponents/contact-us/contact-us.component'
import { Router } from '@angular/router';
@Component({
  selector: 'app-contactus',
  standalone: true,
  imports: [BookConsultationComponent, ContactUsComponent],
  templateUrl: './contactus.component.html',
  styleUrl: './contactus.component.scss'
})
export class ContactusComponent {
  title: string = 'Powering Exceptional \n Customer Journey.';
  constructor (private router:Router){}
  redirectFunction(evt: any){
    debugger
    this.router.navigate(['/home'])
  }
}
