import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorVistaComponent } from './administrador-vista.component';

describe('AdministradorRegistroComponent', () => {
  let component: AdministradorVistaComponent;
  let fixture: ComponentFixture<AdministradorVistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministradorVistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministradorVistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
