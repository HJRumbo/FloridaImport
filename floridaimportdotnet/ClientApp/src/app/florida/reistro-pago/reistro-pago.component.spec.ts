import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReistroPagoComponent } from './reistro-pago.component';

describe('ReistroPagoComponent', () => {
  let component: ReistroPagoComponent;
  let fixture: ComponentFixture<ReistroPagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReistroPagoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReistroPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
