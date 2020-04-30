import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorRegistroComponent } from './administrador-registro.component';

describe('AdministradorRegistroComponent', () => {
  let component: AdministradorRegistroComponent;
  let fixture: ComponentFixture<AdministradorRegistroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministradorRegistroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministradorRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
