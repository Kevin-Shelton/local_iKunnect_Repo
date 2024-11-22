import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseCustomerComponent } from './license-customer.component';

describe('LicenseCustomerComponent', () => {
  let component: LicenseCustomerComponent;
  let fixture: ComponentFixture<LicenseCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LicenseCustomerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LicenseCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
