import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreResourcesComponent } from './explore-resources.component';

describe('ExploreResourcesComponent', () => {
  let component: ExploreResourcesComponent;
  let fixture: ComponentFixture<ExploreResourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExploreResourcesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExploreResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
