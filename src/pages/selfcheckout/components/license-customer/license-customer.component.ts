import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  BasicPriceDetails,
  CustomerLicenseInfoReq,
  DBColumnNames,
  IBundleDetails,
  ICountry,
  IState,
  IWholeBundleReq,
  PlanDuration,
  PlanType,
  ProductDetails,
  ProductFeatureDetailsReq,
  ProductLicnesesDetailsReq,
  StripeCartProductDisplay,
} from '../../../../models/website-models';
import { PaymentHelperService } from '../../services/helper.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { REGEX_PATTERNS } from '../../../../config/env-config';
import { phoneValidator } from '../../../../core/validations/phone-number.validators';
import { noWhitespaceValidator } from '../../../../core/validations/no-space.validators';
import { CommonModule } from '@angular/common';
import { PaymentService } from '../../services/payment.service';
import { Countries, States } from '../../../../config/countries-state';


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
 
  customerSubForm!: FormGroup;
  isCustomerPopUpOpen: boolean = false;
  wholeBundleInfo: any;
  wholeBundleFeatures: any;
  wholeBundleLicenses: any;
  countryList: ICountry[] = [];
  stateList: IState[] = [];

  constructor(private readonly paymentHelperService: PaymentHelperService,  private readonly formBuilder: FormBuilder, private readonly paymentService:PaymentService) {
    this.countryList = Countries;
    this.stateList = States;
  }
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
            console.log('planCartItems ::::::::::::::: ',this.planCartItems)
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
    this.customerSubForm.valueChanges.subscribe((values: any) => {
     console.log('value change :::::::::::: ',values)
       this.paymentHelperService.changeSubcription(values.subscribeReceiveEmails === true ? 1: 0);
     })
  }

  initForm() {
    this.customerSubForm = this.formBuilder.group({
      subscribeReceiveEmails: new FormControl(false, []),
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
    this.paymentHelperService.changeBundlePlanDetails(this.bundlePlan);
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
      this.paymentHelperService.changeCartItemsWithDurationDetails(this.cartItemDetails);
    }
  }
  incrementBundleQuantity(product: ProductDetails) {
    product.quantity = product.quantity + 1;
    const total = {
      value: product.quantity * product.amount.value,
      disValue: `$${(product.quantity * product.amount.value).toFixed(2)}`,
    };
    product.totalAmount = total;

    this.paymentHelperService.changeCartItemsWithDurationDetails(this.cartItemDetails);
  } 
}
