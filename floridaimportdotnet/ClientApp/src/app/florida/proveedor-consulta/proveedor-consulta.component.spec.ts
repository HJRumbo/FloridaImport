import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorConsultaComponent } from './proveedor-consulta.component';

describe('ProveedorConsultaComponent', () => {
  let component: ProveedorConsultaComponent;
  let fixture: ComponentFixture<ProveedorConsultaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProveedorConsultaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProveedorConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
