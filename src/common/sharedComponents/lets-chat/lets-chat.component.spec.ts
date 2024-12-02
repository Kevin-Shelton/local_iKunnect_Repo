import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LetsChatComponent } from './lets-chat.component';

describe('LetsTalkComponent', () => {
  let component: LetsChatComponent;
  let fixture: ComponentFixture<LetsChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LetsChatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LetsChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
