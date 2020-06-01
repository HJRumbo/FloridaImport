import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrutasConsultaComponent } from './frutas-consulta.component';

describe('FrutasConsultaComponent', () => {
  let component: FrutasConsultaComponent;
  let fixture: ComponentFixture<FrutasConsultaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrutasConsultaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrutasConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
