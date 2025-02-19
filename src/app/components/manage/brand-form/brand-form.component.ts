import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from '../../alert-dialog/alert-dialog.component';
import { CommonModule, Location } from '@angular/common';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { BrandService } from '../../../services/brand.service';
@Component({
  selector: 'app-brand-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './brand-form.component.html',
  styleUrl: './brand-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrandFormComponent implements OnInit {
  isEdit: boolean = false;
  buttonName!: string;
  dynamicId!: string | null;
  private brandService = inject(BrandService);
  private location = inject(Location);
  readonly dialog = inject(MatDialog);

  readonly name = new FormControl('', [
    Validators.required,
    Validators.pattern('^[A-Za-z ]+$'),
  ]);

  errorMessage = signal('');

  constructor(private route: ActivatedRoute) {
    merge(this.name.statusChanges, this.name.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.dynamicId = params.get('id');
      this.isEdit = !!this.dynamicId;
      this.buttonName = this.dynamicId ? 'Edit' : 'Add';
      if (this.dynamicId) {
        this.brandService.getBrandById(this.dynamicId).subscribe((res) => {
          this.name.setValue(res.brandNameById.name);
        });
      }
    });
  }

  onSubmit() {
    if (this.isEdit) {
      this.brandService
        .editBrand(this.dynamicId, { name: this.name.value })
        .subscribe((res) => {
          console.log(res);
        });
    } else {
      this.brandService.addBrand({ name: this.name.value }).subscribe(() => {
        const dialogRef = this.dialog.open(AlertDialogComponent);

        dialogRef.afterClosed().subscribe(() => {
          this.location.back();
        });
      });
    }
  }

  updateErrorMessage() {
    if (this.name.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else if (this.name.hasError('pattern')) {
      this.errorMessage.set('Special characters and numbers are not allowed.');
    } else {
      this.errorMessage.set('');
    }
  }
}
