import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoConsultaComponent } from './producto-consulta.component';

describe('ProductoConsultaComponent', () => {
  let component: ProductoConsultaComponent;
  let fixture: ComponentFixture<ProductoConsultaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductoConsultaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
