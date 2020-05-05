import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonaPerfilComponent } from './persona-perfil.component';

describe('PersonaPerfilComponent', () => {
  let component: PersonaPerfilComponent;
  let fixture: ComponentFixture<PersonaPerfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonaPerfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonaPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
