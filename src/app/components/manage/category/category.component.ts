import { ViewChild, Component, inject } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CategoryService } from '../../../services/category.service';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent {
  displayedColumns: string[] = ['id', 'name', 'action'];
  users: any[] = [];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private categoryService = inject(CategoryService);
  private router = inject(Router)

  constructor() {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((result: any) => {

      this.users = result.categories; 
      this.dataSource.data = this.users; 
    });
  }

  navigateToAddCategory(){
     this.router.navigate(['admin/categories/add']);
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

  editCategory(id: string){
    this.router.navigate([`admin/categories/${id}`]);
  }

  deleteCategory(id: string){
    this.categoryService.deleteCategory(id).subscribe(() =>{
      this.users = this.users.filter(category => category._id !== id);
      this.dataSource.data = [...this.users];      
    })
  }
}
