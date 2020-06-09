import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesCosultaComponent } from './detalles-cosulta.component';

describe('DetallesCosultaComponent', () => {
  let component: DetallesCosultaComponent;
  let fixture: ComponentFixture<DetallesCosultaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallesCosultaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesCosultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
