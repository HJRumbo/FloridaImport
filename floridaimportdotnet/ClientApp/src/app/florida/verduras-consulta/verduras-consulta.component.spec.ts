import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerdurasConsultaComponent } from './verduras-consulta.component';

describe('VerdurasConsultaComponent', () => {
  let component: VerdurasConsultaComponent;
  let fixture: ComponentFixture<VerdurasConsultaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerdurasConsultaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerdurasConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
