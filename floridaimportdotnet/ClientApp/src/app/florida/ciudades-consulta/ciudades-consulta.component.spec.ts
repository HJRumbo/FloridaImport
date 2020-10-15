import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CiudadesConsultaComponent } from './ciudades-consulta.component';

describe('CiudadesConsultaComponent', () => {
  let component: CiudadesConsultaComponent;
  let fixture: ComponentFixture<CiudadesConsultaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CiudadesConsultaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CiudadesConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
