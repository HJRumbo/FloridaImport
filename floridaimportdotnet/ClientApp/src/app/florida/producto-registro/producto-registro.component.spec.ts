import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoRegistroComponent } from './producto-registro.component';

describe('ProductoRegistroComponent', () => {
  let component: ProductoRegistroComponent;
  let fixture: ComponentFixture<ProductoRegistroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductoRegistroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
