import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransformCustomerServiceComponent } from './transform-customer-service.component';

describe('TransformCustomerServiceComponent', () => {
  let component: TransformCustomerServiceComponent;
  let fixture: ComponentFixture<TransformCustomerServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransformCustomerServiceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TransformCustomerServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
