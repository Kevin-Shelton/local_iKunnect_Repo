import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EachPostContentComponent } from './each-post-content.component';

describe('EachPostContentComponent', () => {
  let component: EachPostContentComponent;
  let fixture: ComponentFixture<EachPostContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EachPostContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EachPostContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
