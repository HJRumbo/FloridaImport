import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoCosultaComponent } from './pedido-cosulta.component';

describe('PedidoCosultaComponent', () => {
  let component: PedidoCosultaComponent;
  let fixture: ComponentFixture<PedidoCosultaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidoCosultaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoCosultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
