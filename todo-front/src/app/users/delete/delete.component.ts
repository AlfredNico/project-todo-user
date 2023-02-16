import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete',
  template: `
    <div fxLayout="column">
      <h1 mat-dialog-title>Confirmation</h1>
      <div mat-dialog-content>
        <span> {{ data.message }} </span>
      </div>
      <div mat-dialog-actions align="end">
        <button mat-raised-button tabindex="-1" [mat-dialog-close]="false">
          Annuler
        </button>
        <button
          mat-raised-button
          tabindex="-1"
          color="warn"
          [mat-dialog-close]="true"
        >
          Supprimer
        </button>
      </div>
    </div>
  `,
  styles: [],
})
export class DeleteComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {}
}
