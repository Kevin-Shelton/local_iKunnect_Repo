import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookademoComponent } from './bookademo.component';

describe('BookademoComponent', () => {
  let component: BookademoComponent;
  let fixture: ComponentFixture<BookademoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookademoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookademoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
