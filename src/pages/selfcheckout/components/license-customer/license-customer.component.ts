import { Component, OnInit } from '@angular/core';
import {
  BasicPriceDetails,
  DBColumnNames,
  IBundleDetails,
  IProductInfo,
  PlanDuration,
  PlanType,
  ProductDetails,
  StripeCartProductDisplay,
} from '../../../../models/website-models';
import { PaymentHelperService } from '../../services/helper.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { REGEX_PATTERNS } from '../../../../config/env-config';
import { phoneValidator } from '../../../../core/validations/phone-number.validators';
import { noWhitespaceValidator } from '../../../../core/validations/no-space.validators';
import { CommonModule } from '@angular/common';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-license-customer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './license-customer.component.html',
  styleUrl: './license-customer.component.scss',
})
export class LicenseCustomerComponent implements OnInit {
  cartItemDetails!: StripeCartProductDisplay;
  bundlePlan!: IBundleDetails;
  planCartItems!: ProductDetails[];
  customerForm!: FormGroup;
  isCustomerPopUpOpen: boolean = false;
  wholeBundleInfo: any;
  wholeBundleFeatures: any;
  wholeBundleLicenses: any;

  constructor(private readonly paymentHelperService: PaymentHelperService,  private readonly formBuilder: FormBuilder, private readonly paymentService:PaymentService) {}
  ngOnInit(): void {
    this.paymentHelperService.currentBundlePlanDetails.subscribe({
      next: res => {
        this.bundlePlan = res;
      },
    });
    this.paymentHelperService.currentCartItemsWithProducts.subscribe({
      next: res => {
        if(Object.keys(res).length) {        
          this.cartItemDetails = res;
          this.planCartItems =
            this.cartItemDetails[this.bundlePlan.duration][
              this.bundlePlan.bundleType
            ];
        }
      },
    });
    this.paymentHelperService.currentWholeBundleDetails.subscribe({
      next: res => {
        if(Object.keys(res).length) {        
         this.wholeBundleInfo = res;
         this.wholeBundleFeatures = this.wholeBundleInfo.features[this.bundlePlan.duration];
         this.wholeBundleLicenses = this.wholeBundleInfo.licenses[this.bundlePlan.duration];

        }
      },
    });
    this.initForm();
  }

  initForm() {
      this.customerForm = this.formBuilder.group({
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
          
          billingEmail: new FormControl('', [
            Validators.required,
            Validators.pattern(REGEX_PATTERNS.EMAIL),
          ]),
          country: new FormControl('', [
            Validators.minLength(3),
            Validators.maxLength(40),
            noWhitespaceValidator,
          ]),
        
          street: new FormControl('', [
            Validators.minLength(3),
            Validators.maxLength(40),
            noWhitespaceValidator,
          ]),
          city: new FormControl('', [
            Validators.minLength(3),
            Validators.maxLength(40),
            noWhitespaceValidator,
          ]),
          state: new FormControl('', [
            Validators.required,
          ]),
          zipCode: new FormControl('', [
            Validators.minLength(3),
            Validators.maxLength(200),
            noWhitespaceValidator,
          ]),
          isSubscribed: new FormControl(false, []),
        });
  }

  planDurationChange() {
    if (this.bundlePlan.duration === PlanDuration.MONTHLY) {
      this.bundlePlan.duration = PlanDuration.ANNUALLY;
      this.planCartItems =
        this.cartItemDetails[this.bundlePlan.duration][
          this.bundlePlan.bundleType
        ];
        this.wholeBundleFeatures = this.wholeBundleInfo.features[this.bundlePlan.duration][this.bundlePlan.bundleType];
         this.wholeBundleLicenses = this.wholeBundleInfo.licenses[this.bundlePlan.duration][this.bundlePlan.bundleType];
    } else {
      this.bundlePlan.duration = PlanDuration.MONTHLY;
      this.planCartItems =
        this.cartItemDetails[this.bundlePlan.duration][
          this.bundlePlan.bundleType

        ];
        this.wholeBundleFeatures = this.wholeBundleInfo.features[this.bundlePlan.duration][this.bundlePlan.bundleType];
        this.wholeBundleLicenses = this.wholeBundleInfo.licenses[this.bundlePlan.duration][this.bundlePlan.bundleType];
    }
  }

   get f(): { [key: string]: AbstractControl } {
      return this.customerForm.controls;
    }

  decrementBundleQuantity(product: ProductDetails) {
    if (
      [PlanType.START_UP, PlanType.GROWTH, PlanType.SCALE].includes(
        product.type
      )
        ? product.quantity > 1
        : product.quantity > 0
    ) {
      product.quantity = product.quantity - 1;
      const total = {
        value: product.quantity * product.amount.value,
        disValue: `$${(product.quantity * product.amount.value).toFixed(2)}`,
      };
      product.totalAmount = total;
      // this.paymentHelperService.changeBundleDetails(this.bundleDetails);
    }
  }
  incrementBundleQuantity(product: ProductDetails) {
    product.quantity = product.quantity + 1;
    const total = {
      value: product.quantity * product.amount.value,
      disValue: `$${(product.quantity * product.amount.value).toFixed(2)}`,
    };
    product.totalAmount = total;

    // this.paymentHelperService.changeBundleDetails(this.bundleDetails);
  }

  getCustomerFullName() {
    return `${this.f['firstName'].value} ${this.f['lastName'].value}`;
  }

  getBillinAddress() {
    let billAdree = this.f['street'].value;
    if(this.f['city'].value)  billAdree = billAdree ? `${billAdree}, ${this.f['city'].value}`: this.f['city'].value;
    if(this.f['state'].value)  billAdree = billAdree ? `${billAdree}, ${this.f['state'].value}`: this.f['state'].value;
    return billAdree;
  }

  saveCustomerInfo() {
    let payload: {[key:string]: string} = {};
   
    this.toggleCustomerPopUp();
    
    console.log('planCartItems ::::: ',this.planCartItems)
   this.getDBCOlumnMapValuesLicense(payload);
   this.getDBCOlumnMapValuesFeatures(payload);
  payload = {...payload, ...this.formateCustomerInfo()};
   console.log('final payload is  ::::: ',payload);
   this.paymentService.saveCustomerAndPlanDetails(payload as unknown as IProductInfo).subscribe({
    next: res => {
      console.log('save res ::::::: ',res);
    },
    error: error => {
      console.log('erro is :::::::: ',error)
    }
   })
  }

  toggleCustomerPopUp() {
    this.isCustomerPopUpOpen = !this.isCustomerPopUpOpen;
  }
  getDBCOlumnMapValuesLicense(payload: {[key:string]: string}) {
   this.wholeBundleLicenses.map((row:BasicPriceDetails) => {
    payload[row.dbColumnName]= this.getPlanType(row)
   });
    
  }
  getDBCOlumnMapValuesFeatures(payload: {[key:string]: string}) {
    this.wholeBundleFeatures.map((row:BasicPriceDetails) => {
     payload[row.dbColumnName]= this.getPlanType(row)
    });
     
   }

   formateCustomerInfo() {
    const customerInfo = this.customerForm.value;
   
    customerInfo[DBColumnNames.EMAIL_ID] = customerInfo.billingEmail;
    customerInfo[DBColumnNames.SUBSCRIBE_RECEIVE_EMAILS] = customerInfo.isSubscribed;
    return customerInfo;
   
   }

  getPlanType(row:BasicPriceDetails ) {
    let planTyepValue = '';
    if(this.bundlePlan.bundleType === PlanType.TRIAL) {
      planTyepValue = row.trial;
    } else if(this.bundlePlan.bundleType === PlanType.START_UP) {
      planTyepValue = row.startUp;
    } else if(this.bundlePlan.bundleType === PlanType.GROWTH) {
      planTyepValue = row.growth;
    }else if(this.bundlePlan.bundleType === PlanType.SCALE) {
      planTyepValue = row.scale;
    }
    return planTyepValue;
  }
}
