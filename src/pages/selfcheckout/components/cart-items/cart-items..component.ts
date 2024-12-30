import { Component,  OnInit } from '@angular/core';
import {
  IBundleDetails,
  ICountry,
  IState,
  PlanDuration,
  PlanType,
  ProductDetails,
  StripeCartProductDisplay,
} from '../../../../models/website-models';
import { PaymentHelperService } from '../../services/helper.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PaymentService } from '../../services/payment.service';
import { Countries, States } from '../../../../config/countries-state';


@Component({
  selector: 'app-cart-items',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cart-items.component.html',
  styleUrl: './cart-items.component.scss',
})
export class CartItemsComponent implements OnInit {
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
