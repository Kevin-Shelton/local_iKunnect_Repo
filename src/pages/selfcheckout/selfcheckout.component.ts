import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { BookConsultationComponent } from '../../common/sharedComponents/book-consultation/book-consultation.component';
import { CartItemsComponent } from './components/cart-items/cart-items..component';
import { PaymentComponent } from './components/payment/payment.component';
import { PaymentService } from './services/payment.service';
import { BasicPriceDetails, CustomerLicenseInfoReq, IBundleDetails, IWholeBundleReq, PlanType, ProductDetails, ProductFeatureDetailsReq, ProductLicnesesDetailsReq, StripeCartProductDisplay } from '../../models/website-models';
import { PaymentHelperService } from './services/helper.service';
@Component({
  selector: 'app-selfcheckout',
  standalone: true,
  imports: [
    MatFormFieldModule,
    BookConsultationComponent,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    CommonModule,
    PaymentComponent,
    CartItemsComponent,
    
  ],
  templateUrl: './selfcheckout.component.html',
  styleUrl: './selfcheckout.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class SelfcheckoutComponent implements OnInit {
  title: string = 'Powering Exceptional \n Customer Journeys.';
  showCardDetails: boolean = false;
  statusText!: string;
  planType!: string;
  payLoadWholeBundle!: IWholeBundleReq;

  cartItemDetails!: StripeCartProductDisplay;
    bundlePlan!: IBundleDetails;
    planCartItems!: ProductDetails[];
    wholeBundleInfo: any;
    wholeBundleFeatures: any;
    wholeBundleLicenses: any;
    isSubscribed: number = 0;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly paymentService: PaymentService,
    private readonly paymentHelperService: PaymentHelperService
  ) {}

  ngOnInit(): void {
    this.subscribePlanDetailshange();
    this.activatedRoute?.queryParams?.subscribe(params => {
      const afterPaySessionId = params['session_id'];
      if (afterPaySessionId) {
        this.handlePaymentStatus(afterPaySessionId);
        
      }

    });
  }

  subscribePlanDetailshange() {
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
    this.paymentHelperService.currentSubscription.subscribe({
      next: res => {

        this.isSubscribed = res;
      }
    })
  }

  handleCheckout() {
    this.showCardDetails = true;
    
  }
  handleCheckoutBack() {
    this.showCardDetails = false;
  }

  // Fetches the payment intent status after payment submission
  handlePaymentStatus(sessionId: string) {
    this.paymentService.getStripeSessionStatus(sessionId).subscribe({
      next: res => {
        this.setPaymentDetails(res.status);
      },
    });
  }

  setPaymentDetails(status: string) {
    this.statusText = 'Something went wrong, please try again.';
    if (status === 'complete') this.statusText = 'Payment succeeded';
  }



  getWholeBundleInfo() {  
    let payload: IWholeBundleReq = {} as IWholeBundleReq;
    payload.productDetails = this.getDBCOlumnMapValuesLicense();   
    payload.productFeatureDetails = this.getDBCOlumnMapValuesFeatures();
   
    payload.customerLicenseInfo = this.getBundlePlanDetails();
    return payload;
  }

  saveWholeBudleInfo(clientSecret: string) {
    const sessionId = clientSecret.split('_secret');
    const wholeBundle: IWholeBundleReq = this.getWholeBundleInfo()
    if(wholeBundle) {
      wholeBundle.customerLicenseInfo.sessionId = sessionId[0];
    }
      this.paymentService.saveCustomerAndPlanDetails(wholeBundle).subscribe({
    next: res => {
      console.log('save res ::::::: ');
    },
    error: error => {
      console.log('erro is :::::::: ')
    }
   });
  }

  getDBCOlumnMapValuesLicense(): ProductLicnesesDetailsReq {
    let licenseReq: {[key: string]: string} = {};
   this.wholeBundleLicenses.forEach((row:BasicPriceDetails) => {
    licenseReq[row.dbColumnName] = this.getPlanType(row)
   });
   licenseReq['productType'] = this.bundlePlan.bundleType;
   return licenseReq as unknown as ProductLicnesesDetailsReq;
    
  }
  getDBCOlumnMapValuesFeatures() {
    let featureReq: {[key: string]: string} = {};
    this.wholeBundleFeatures.forEach((row:BasicPriceDetails) => {
      featureReq[row.dbColumnName]= this.getPlanType(row)
    });

     return featureReq as unknown as ProductFeatureDetailsReq;
   }

   getBundlePlanDetails() {
     let bundlePlanData :  CustomerLicenseInfoReq = {price: 0, quantity: 0,total_Price: 0, subscribeReceiveEmails: this.isSubscribed, sessionId: "", status: 'Pending'};
    
     const bundlePlanType = this.planCartItems.find(item => item.type === this.bundlePlan.bundleType);
   
    if(bundlePlanType) {
      bundlePlanData.price = Number(bundlePlanType.amount.value);
      bundlePlanData.quantity = bundlePlanType.quantity;
      bundlePlanData.total_Price = bundlePlanType.totalAmount.value
    }
    return bundlePlanData;
   }

   getPlanType(row:BasicPriceDetails ) {
    let planTyepValue = '';
    if(this.bundlePlan.bundleType === PlanType.TRIAL) {
      planTyepValue = row.trial.value;
    } else if(this.bundlePlan.bundleType === PlanType.START_UP) {
      planTyepValue = this.planCartItems?.length && this.planCartItems.find(cart => cart.type === row.name) ? JSON.stringify(this.planCartItems.find(cart => cart.type === row.name)?.quantity) : row.startUp.value;
    } else if(this.bundlePlan.bundleType === PlanType.GROWTH) {
      planTyepValue = this.planCartItems?.length && this.planCartItems.find(cart => cart.type === row.name) ? JSON.stringify(this.planCartItems.find(cart => cart.type === row.name)?.quantity) :  row.growth.value;
    }else if(this.bundlePlan.bundleType === PlanType.SCALE) {
      planTyepValue = this.planCartItems?.length && this.planCartItems.find(cart => cart.type === row.name) ? JSON.stringify(this.planCartItems.find(cart => cart.type === row.name)?.quantity) :  row.scale.value;
    }
    return planTyepValue;
  }

}
