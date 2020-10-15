import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-alert-modal-eliminar',
  templateUrl: './alert-modal-eliminar.component.html',
  styleUrls: ['./alert-modal-eliminar.component.css']
})
export class AlertModalEliminarComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }
  @Input() title;
  @Input() message;

  aceptar() {
    this.activeModal.close('Si');

  }

  cancelar() {
    this.activeModal.close("No");
  }

  ngOnInit(): void {

  }

}
