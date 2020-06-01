import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HortalizasConsultaComponent } from './hortalizas-consulta.component';

describe('HortalizasConsultaComponent', () => {
  let component: HortalizasConsultaComponent;
  let fixture: ComponentFixture<HortalizasConsultaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HortalizasConsultaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HortalizasConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
