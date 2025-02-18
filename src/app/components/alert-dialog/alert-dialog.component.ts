import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-alert-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
  ],
  templateUrl: './alert-dialog.component.html',
  styleUrl: './alert-dialog.component.css',
})
export class AlertDialogComponent {
  readonly dialogRef = inject(MatDialogRef<AlertDialogComponent>);
  constructor(){
    console.log(this.dialogRef)
  }
}
