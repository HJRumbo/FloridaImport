import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoEditarComponent } from './pedido-editar.component';

describe('PedidoEditarComponent', () => {
  let component: PedidoEditarComponent;
  let fixture: ComponentFixture<PedidoEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidoEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
