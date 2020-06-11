import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoProveedorRegistroComponent } from './producto-proveedor-registro.component';

describe('ProductoProveedorRegistroComponent', () => {
  let component: ProductoProveedorRegistroComponent;
  let fixture: ComponentFixture<ProductoProveedorRegistroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductoProveedorRegistroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoProveedorRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
