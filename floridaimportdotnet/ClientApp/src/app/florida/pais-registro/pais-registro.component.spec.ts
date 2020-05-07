import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaisRegistroComponent } from './pais-registro.component';

describe('PaisRegistroComponent', () => {
  let component: PaisRegistroComponent;
  let fixture: ComponentFixture<PaisRegistroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaisRegistroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaisRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
