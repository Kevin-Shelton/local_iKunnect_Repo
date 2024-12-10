import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureTabsComponent } from './feature-tabs.component';

describe('FeatureTabsComponent', () => {
  let component: FeatureTabsComponent;
  let fixture: ComponentFixture<FeatureTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureTabsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
