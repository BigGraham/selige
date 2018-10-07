import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyEventComponent } from './verify-event.component';

describe('VerifyEventComponent', () => {
  let component: VerifyEventComponent;
  let fixture: ComponentFixture<VerifyEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
