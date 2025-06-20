import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfcheckoutComponent } from './selfcheckout.component';

describe('SelfcheckoutComponent', () => {
  let component: SelfcheckoutComponent;
  let fixture: ComponentFixture<SelfcheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelfcheckoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SelfcheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
