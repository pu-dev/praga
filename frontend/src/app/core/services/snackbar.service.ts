import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(
    private snackbar: MatSnackBar,

    ) { }

  show(msg: string) {
    const snackbarOptions = {
      duration: 3000
    };
    this.snackbar.open(msg, "OK", snackbarOptions);    
    console.log(msg)
  }

  error(msg: string) {
    const snackbarOptions = {
      duration: 10000,
      panelClass: ['snackbar-blue']
    };
    this.snackbar.open(msg, "OK", snackbarOptions);    
  }
}
