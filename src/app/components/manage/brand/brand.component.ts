import { ViewChild, Component, inject } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { BrandService } from '../../../services/brand.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-brand',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.css',
})
export class BrandComponent {
  displayedColumns: string[] = ['id', 'name', 'action'];
  users: any[] = [];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private brandService = inject(BrandService);
  private router = inject(Router);

  ngOnInit(): void {
    this.brandService.getAllBrand().subscribe((result: any) => {
      this.users = result.allBrands;
      this.dataSource.data = this.users;
    });
  }

  navigateToAddCategory() {
    this.router.navigate(['admin/brand/add']);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editCategory(id: string) {
    this.router.navigate([`admin/brand/${id}`]);
  }

  deleteCategory(id: string) {
    this.brandService.deleteBrand(id).subscribe(() => {
      this.users = this.users.filter((allBrands) => allBrands._id !== id);
      this.dataSource.data = [...this.users];
    });
  }
}
