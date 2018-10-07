import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditEventComponent } from './audit-event.component';

describe('AuditEventComponent', () => {
  let component: AuditEventComponent;
  let fixture: ComponentFixture<AuditEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
