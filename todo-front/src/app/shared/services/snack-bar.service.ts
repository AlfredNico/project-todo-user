import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  private readonly config: MatSnackBarConfig = {
    horizontalPosition: 'end',
    verticalPosition: 'bottom',
    duration: 3000,
  };

  constructor(private snackbar: MatSnackBar) {}

  public warn(message: string) {
    this.snackbar.open(message, 'Fermer', {
      ...this.config,
      panelClass: ['snack-bar-error'],
    });
  }

  public sucess(message: string) {
    this.snackbar.open(message, 'Fermer', {
      ...this.config,
      panelClass: ['snack-bar-success'],
    });
  }

  public info(message: string) {
    this.snackbar.open(message, 'Fermer', {
      ...this.config,
      panelClass: ['snack-bar-info'],
      duration: undefined,
    });
  }
}
