import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { REGEX_PATTERNS } from '../../config/env-config';
import { noWhitespaceValidator } from '../../core/validations/no-space.validators';
import { TransformCustomerServiceComponent } from './../../common/sharedComponents/transform-customer-service/transform-customer-service.component';
import { DemoService } from './services/demo.service';
@Component({
  selector: 'app-bookademo',
  standalone: true,
  imports: [
    CommonModule,
    TransformCustomerServiceComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './bookademo.component.html',
  styleUrl: './bookademo.component.scss',
})
export class BookademoComponent implements OnInit {
  headingText: string = 'HELLO WORLD'; // Your heading text
  headingArray: string[] = [];
  animationDuration: number = 0.2; // Animation duration per letter in seconds
  form!: FormGroup;
  isLoading: boolean = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly demoService: DemoService
  ) {
    // Convert the heading text into an array of characters
    this.headingArray = Array.from(this.headingText);
  }

  ngOnInit() {
    this.form = this.fb.group({
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(40),
        Validators.pattern(REGEX_PATTERNS.ALLOW_STRING_PATTERN),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(40),
        Validators.pattern(REGEX_PATTERNS.ALLOW_STRING_PATTERN),
      ]),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.pattern(REGEX_PATTERNS.EMAIL),
      ]),
      businessEmail: new FormControl('', [
        Validators.required,
        Validators.pattern(REGEX_PATTERNS.EMAIL),
      ]),
      companyName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(40),
        noWhitespaceValidator,
      ]),
      message: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(500),
        noWhitespaceValidator,
      ]),
      subscription: new FormControl('', [Validators.required]),
    });
    window.scrollTo({ top: 6, behavior: 'smooth' });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  createADemo() {
    this.isLoading = true;
    const payLoad = this.form.getRawValue();
    console.log('fdsfs', payLoad);
    this.demoService.bookADemo(payLoad).subscribe({
      next: res => {
        if (res) {
          this.isLoading = false;
        }
      },
      error: error => {
        this.handleError(error);
      },
    });
  }

  handleError(error: HttpErrorResponse): void {
    if (error?.error?.includes('Email already exist')) {
      this.f['businessEmail'].setErrors({ duplicate: true });
    }
    if (error?.error?.includes('Email address is not verified')) {
      this.f['businessEmail'].setErrors({ isVerify: true });
    }
    this.isLoading = false;
  }
}
