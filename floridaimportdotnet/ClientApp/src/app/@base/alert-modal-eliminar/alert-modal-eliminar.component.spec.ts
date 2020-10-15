import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertModalEliminarComponent } from './alert-modal-eliminar.component';

describe('AlertModalEliminarComponent', () => {
  let component: AlertModalEliminarComponent;
  let fixture: ComponentFixture<AlertModalEliminarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertModalEliminarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertModalEliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
