import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  showMessage(message: string): void {
    this.snackBar.open(message, '', {
      duration: 1000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
