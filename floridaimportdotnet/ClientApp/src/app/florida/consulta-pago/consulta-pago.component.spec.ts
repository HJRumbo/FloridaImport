import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaPagoComponent } from './consulta-pago.component';

describe('ConsultaPagoComponent', () => {
  let component: ConsultaPagoComponent;
  let fixture: ComponentFixture<ConsultaPagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaPagoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
