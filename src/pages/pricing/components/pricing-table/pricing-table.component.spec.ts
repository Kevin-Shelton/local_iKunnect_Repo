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
    expect(component.featureGroups).toBeDefined();
    expect(component.featureDefinitions).toBeDefined();
  });

  it('should toggle feature groups', () => {
    const groupKey = 'test-group';
    expect(component.expandedGroups[groupKey]).toBeFalsy();
    
    component.toggleFeatureGroup(groupKey);
    expect(component.expandedGroups[groupKey]).toBeTruthy();
    
    component.toggleFeatureGroup(groupKey);
    expect(component.expandedGroups[groupKey]).toBeFalsy();
  });

  it('should return correct button text', () => {
    expect(component.getButtonText('Trial')).toBe('Start Trial');
    expect(component.getButtonText('StartUp')).toBe('Buy Now');
    expect(component.getButtonText('Growth')).toBe('Buy Now');
    expect(component.getButtonText('Scale')).toBe('Buy Now');
  });

  it('should return correct button class', () => {
    expect(component.getButtonClass('Trial')).toBe('plan-button trial-button');
    expect(component.getButtonClass('StartUp')).toBe('plan-button startup-button');
    expect(component.getButtonClass('Growth')).toBe('plan-button growth-button');
    expect(component.getButtonClass('Scale')).toBe('plan-button scale-button');
  });

  it('should get feature definition', () => {
    const definition = component.getFeatureDefinition('Chat');
    expect(definition).toBeDefined();
    expect(definition?.name).toBe('Chat');
    expect(definition?.category).toBe('channels');
  });

  it('should get features by category', () => {
    // Mock some license types for testing
    component.licenseTypes = [
      { name: 'Agent Desktop', trial: { value: 'yes' } },
      { name: 'Voice', trial: { value: 'yes' } }
    ];
    
    const coreLicensingFeatures = component.getFeaturesByCategory('core-licensing');
    expect(coreLicensingFeatures).toBeDefined();
    expect(Array.isArray(coreLicensingFeatures)).toBeTruthy();
  });

  it('should manage feature tooltips per card', () => {
    expect(component.selectedFeatureTooltip).toEqual({});
    
    component.showFeatureTooltip('Chat', 'Trial');
    expect(component.shouldShowTooltip('Chat', 'Trial')).toBeTruthy();
    expect(component.shouldShowTooltip('Chat', 'StartUp')).toBeFalsy();
    
    component.hideFeatureTooltip('Chat', 'Trial');
    expect(component.shouldShowTooltip('Chat', 'Trial')).toBeFalsy();
  });

  it('should call payment services when buying a plan', () => {
    component.buyPlan('StartUp');
    
    expect(mockPaymentHelper.changeBundlePlanDetails).toHaveBeenCalled();
    expect(mockPaymentHelper.changeCartItemsWithDurationDetails).toHaveBeenCalled();
    expect(mockPaymentHelper.changeWholeBundleDetails).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/self-checkout']);
  });

  it('should calculate per-license costs correctly', () => {
    // Mock license data
    component.licenseTypes = [
      { name: 'Agent Desktop', startUp: { value: '5 Agent Licenses' } },
      { name: 'Supervisor Desktop', startUp: { value: '2 Supervisor Licenses' } },
      { name: 'Admin Portal', startUp: { value: '1 Admin License' } }
    ];
    
    // Mock pricing data
    component.priceDetByDuration = {
      StartUp: { value: 800, disValue: '$800' }
    };
    
    const totalLicenses = component.getTotalLicenses('StartUp');
    expect(totalLicenses).toBe(8); // 5 + 2 + 1
    
    const perLicenseCost = component.getPerLicenseCost('StartUp');
    expect(perLicenseCost).toBe('$100'); // 800 / 8
  });

  it('should return correct plan keys', () => {
    expect(component.getPlanKey('Trial')).toBe('trial');
    expect(component.getPlanKey('StartUp')).toBe('startUp');
    expect(component.getPlanKey('Growth')).toBe('growth');
    expect(component.getPlanKey('Scale')).toBe('scale');
  });

  it('should return correct per-license period text', () => {
    component.planPeriod = 'month' as any;
    expect(component.getPerLicensePeriod()).toBe('per license/month');
    
    component.planPeriod = 'year' as any;
    expect(component.getPerLicensePeriod()).toBe('per license/year');
  });

  it('should have correct feature groups configuration', () => {
    expect(component.featureGroups).toHaveSize(4);
    
    const groupIds = component.featureGroups.map(group => group.id);
    expect(groupIds).toContain('core-licensing');
    expect(groupIds).toContain('channels');
    expect(groupIds).toContain('essential-functionality');
    expect(groupIds).toContain('support');
  });

  it('should have feature definitions for all categories', () => {
    const categories = ['core-licensing', 'channels', 'essential-functionality', 'support'];
    
    categories.forEach(category => {
      const featuresInCategory = component.featureDefinitions.filter(def => def.category === category);
      expect(featuresInCategory.length).toBeGreaterThan(0);
    });
  });
});

