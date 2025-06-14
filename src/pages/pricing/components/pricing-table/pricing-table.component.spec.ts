import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { PaymentHelperService } from '../../../selfcheckout/services/helper.service';
import { PaymentService } from '../../../selfcheckout/services/payment.service';
import { PricingTableComponent } from './pricing-table.component';

describe('PricingTableComponent', () => {
  let component: PricingTableComponent;
  let fixture: ComponentFixture<PricingTableComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockPaymentHelper: jasmine.SpyObj<PaymentHelperService>;
  let mockPaymentService: jasmine.SpyObj<PaymentService>;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const paymentHelperSpy = jasmine.createSpyObj('PaymentHelperService', [
      'changeBundlePlanDetails',
      'changeCartItemsWithDurationDetails',
      'changeWholeBundleDetails'
    ]);
    const paymentServiceSpy = jasmine.createSpyObj('PaymentService', ['getProducts']);

    await TestBed.configureTestingModule({
      imports: [PricingTableComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: PaymentHelperService, useValue: paymentHelperSpy },
        { provide: PaymentService, useValue: paymentServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PricingTableComponent);
    component = fixture.componentInstance;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    mockPaymentHelper = TestBed.inject(PaymentHelperService) as jasmine.SpyObj<PaymentHelperService>;
    mockPaymentService = TestBed.inject(PaymentService) as jasmine.SpyObj<PaymentService>;

    // Mock the getProducts observable
    mockPaymentService.getProducts.and.returnValue(of([]));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.expandedGroups).toEqual({});
    expect(component.planPeriod).toBeDefined();
  });

  it('should toggle feature groups', () => {
    const groupKey = 'test-group';
    expect(component.expandedGroups[groupKey]).toBeFalsy();
    
    component.toggleFeatureGroup(groupKey);
    expect(component.expandedGroups[groupKey]).toBeTruthy();
    
    component.toggleFeatureGroup(groupKey);
    expect(component.expandedGroups[groupKey]).toBeFalsy();
  });

  it('should categorize essential features correctly', () => {
    expect(component.isEssentialFeature('Blended Inbound/Outbound')).toBeTruthy();
    expect(component.isEssentialFeature('Agent Desktop')).toBeTruthy();
    expect(component.isEssentialFeature('Random Feature')).toBeFalsy();
  });

  it('should categorize workforce features correctly', () => {
    expect(component.isWorkforceFeature('Essentials GM')).toBeTruthy();
    expect(component.isWorkforceFeature('Enterprise WFM')).toBeTruthy();
    expect(component.isWorkforceFeature('Random Feature')).toBeFalsy();
  });

  it('should categorize support features correctly', () => {
    expect(component.isSupportFeature('24/7 World Class Support')).toBeTruthy();
    expect(component.isSupportFeature('Random Feature')).toBeFalsy();
  });

  it('should call payment services when buying a plan', () => {
    component.buyPlan('StartUp');
    
    expect(mockPaymentHelper.changeBundlePlanDetails).toHaveBeenCalled();
    expect(mockPaymentHelper.changeCartItemsWithDurationDetails).toHaveBeenCalled();
    expect(mockPaymentHelper.changeWholeBundleDetails).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/self-checkout']);
  });
});

