import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarUbicacionComponent } from './agregar-ubicacion.component';

describe('AgregarUbicacionComponent', () => {
  let component: AgregarUbicacionComponent;
  let fixture: ComponentFixture<AgregarUbicacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarUbicacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarUbicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
