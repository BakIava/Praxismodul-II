import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export enum SnackbarLevel {
  INFO = 'snackbar-info',
  SUCCESS = 'snackbar-success',
  WARN = 'snackbar-warn',
  ERROR = 'snackbar-error'
}

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  constructor(
    public snackBar: MatSnackBar,    
    private zone: NgZone
  ) { 
  }

  public open(message: string, l: string) {
    let action = 'Verstanden';
    let duration = 2000;
    this.zone.run(() => {
      this.snackBar.open(message, action, { duration, panelClass: [l] });
    });
  }
}
