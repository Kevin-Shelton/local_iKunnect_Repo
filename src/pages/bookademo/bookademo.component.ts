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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { REGEX_PATTERNS } from '../../config/env-config';
import { noWhitespaceValidator } from '../../core/validations/no-space.validators';
import { phoneValidator } from '../../core/validations/phone-number.validators';
import { TransformCustomerServiceComponent } from './../../common/sharedComponents/transform-customer-service/transform-customer-service.component';
import { DemoService } from './services/demo.service';
@Component({
  selector: 'app-bookademo',
  standalone: true,
  imports: [
    CommonModule,
    TransformCustomerServiceComponent,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
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
    private readonly demoService: DemoService,
    private readonly _snackBar: MatSnackBar
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
      phoneNumber: new FormControl('', [phoneValidator()]),
      businessEmail: new FormControl('', [
        Validators.required,
        Validators.pattern(REGEX_PATTERNS.EMAIL),
      ]),
      companyName: new FormControl('', [
        Validators.minLength(3),
        Validators.maxLength(40),
        noWhitespaceValidator,
      ]),
      message: new FormControl('', [
        Validators.minLength(3),
        Validators.maxLength(200),
        noWhitespaceValidator,
      ]),
      subscription: new FormControl(false, []),
    });
    window.scrollTo({ top: 6, behavior: 'smooth' });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  createADemo() {
    this.isLoading = true;
    const payLoad = this.form.getRawValue();
    this.demoService.bookADemo(payLoad).subscribe({
      next: res => {
        if (res) {
          this.isLoading = false;
          this._snackBar.open(`Successfully book a demo`, 'close', {
            duration: 8000,
            panelClass: ['blue-snackbar'],
          });
          this.form.reset();
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
    this.showMsg(error);
  }

  showMsg(error: HttpErrorResponse) {
    let errString = '';
    if (this.isJsonString(error?.error)) {
      const errObj = JSON.parse(error?.error)?.errors;
      if (errObj) {
        for (const key in errObj) {
          errString = errString + errObj[key].join('\n');
        }
      } else {
        errString = error?.error?.replace(/['"]+/g, '');
      }
    } else {
      errString = error?.error;
    }
    this._snackBar.open(`Failed to book a demo : ${errString}`, 'close', {
      duration: 8000,
      panelClass: 'errorSnack',
    });
  }

  isJsonString(str: string) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }
}
