import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  IBundleDetails,
  PlanDuration,
  PlanType,
  ProductDetails,
  StripeCartProductDisplay,
} from '../../../../models/website-models';
import { PaymentHelperService } from '../../services/helper.service';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-cart-items',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './cart-items.component.html',
  styleUrl: './cart-items.component.scss',
})
export class CartItemsComponent implements OnInit {
  cartItemDetails!: StripeCartProductDisplay;
  bundlePlan!: IBundleDetails;
  planCartItems!: ProductDetails[];
  isChecked: boolean = true;
  customerSubForm!: FormGroup;
  isCustomerPopUpOpen: boolean = false;
  wholeBundleInfo: any;
  wholeBundleFeatures: any;
  wholeBundleLicenses: any;
  isTrialProduct: boolean = false;

  constructor(
    private readonly paymentHelperService: PaymentHelperService,
    private readonly formBuilder: FormBuilder,
    private readonly paymentService: PaymentService
  ) {}
  ngOnInit(): void {
    this.paymentHelperService.currentBundlePlanDetails.subscribe({
      next: res => {
        this.bundlePlan = res;
        this.isChecked = this.bundlePlan.duration === PlanDuration.ANNUALLY;
        this.isTrialProduct = this.bundlePlan.bundleType === PlanType.TRIAL;
      },
    });
    this.paymentHelperService.currentCartItemsWithProducts.subscribe({
      next: res => {
        if (Object.keys(res).length) {
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
        if (Object.keys(res).length) {
          this.wholeBundleInfo = res;
          this.wholeBundleFeatures =
            this.wholeBundleInfo.features[this.bundlePlan.duration];
          this.wholeBundleLicenses =
            this.wholeBundleInfo.licenses[this.bundlePlan.duration];
        }
      },
    });
    this.initForm();
    this.customerSubForm.valueChanges.subscribe((values: any) => {
      this.paymentHelperService.changeSubcription(
        values.subscribeReceiveEmails === true ? 1 : 0
      );
    });
  }

  initForm() {
    this.customerSubForm = this.formBuilder.group({
      subscribeReceiveEmails: new FormControl(false, []),
    });
  }

  planDurationChange(event: any) {
    if (event.currentTarget.checked) {
      this.bundlePlan.duration = PlanDuration.ANNUALLY;
      this.planCartItems =
        this.cartItemDetails[this.bundlePlan.duration][
          this.bundlePlan.bundleType
        ];
      this.wholeBundleFeatures =
        this.wholeBundleInfo.features[this.bundlePlan.duration][
          this.bundlePlan.bundleType
        ];
      this.wholeBundleLicenses =
        this.wholeBundleInfo.licenses[this.bundlePlan.duration][
          this.bundlePlan.bundleType
        ];
    } else {
      this.bundlePlan.duration = PlanDuration.MONTHLY;
      this.planCartItems =
        this.cartItemDetails[this.bundlePlan.duration][
          this.bundlePlan.bundleType
        ];
      this.wholeBundleFeatures =
        this.wholeBundleInfo.features[this.bundlePlan.duration][
          this.bundlePlan.bundleType
        ];
      this.wholeBundleLicenses =
        this.wholeBundleInfo.licenses[this.bundlePlan.duration][
          this.bundlePlan.bundleType
        ];
    }
    this.paymentHelperService.changeBundlePlanDetails(this.bundlePlan);
  }

  decrementBundleQuantity(product: ProductDetails) {
    if (
      [PlanType.START_UP, PlanType.GROWTH, PlanType.SCALE, PlanType.TRIAL].includes(
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
      this.paymentHelperService.changeCartItemsWithDurationDetails(
        this.cartItemDetails
      );
    }
  }
  incrementBundleQuantity(product: ProductDetails) {
    if(PlanType.TRIAL !== product.type)  {
      product.quantity = product.quantity + 1;
      const total = {
        value: product.quantity * product.amount.value,
        disValue: `$${(product.quantity * product.amount.value).toFixed(2)}`,
      };
      product.totalAmount = total;
  
      this.paymentHelperService.changeCartItemsWithDurationDetails(
        this.cartItemDetails
      );
    }
  }
}
