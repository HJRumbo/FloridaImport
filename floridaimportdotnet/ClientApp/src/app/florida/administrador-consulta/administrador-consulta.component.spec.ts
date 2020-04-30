import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorConsultaComponent } from './administrador-consulta.component';

describe('AdministradorConsultaComponent', () => {
  let component: AdministradorConsultaComponent;
  let fixture: ComponentFixture<AdministradorConsultaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministradorConsultaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministradorConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
