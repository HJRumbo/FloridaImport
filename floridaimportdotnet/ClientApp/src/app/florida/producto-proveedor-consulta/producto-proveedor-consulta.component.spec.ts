import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoProveedorConsultaComponent } from './producto-proveedor-consulta.component';

describe('ProductoProveedorConsultaComponent', () => {
  let component: ProductoProveedorConsultaComponent;
  let fixture: ComponentFixture<ProductoProveedorConsultaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductoProveedorConsultaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoProveedorConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
