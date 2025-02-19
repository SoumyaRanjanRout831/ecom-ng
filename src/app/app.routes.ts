import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CategoryComponent } from './components/manage/category/category.component';
import { CategoryFormComponent } from './components/manage/category-form/category-form.component';
import { BrandComponent } from './components/manage/brand/brand.component';
import { BrandFormComponent } from './components/manage/brand-form/brand-form.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin/categories', component: CategoryComponent },
  { path: 'admin/categories/add', component: CategoryFormComponent },
  { path: 'admin/categories/:id', component: CategoryFormComponent },
  { path: 'admin/brand', component: BrandComponent },
  { path: 'admin/brand/add', component: BrandFormComponent },
  { path: 'admin/brand/:id', component: BrandFormComponent },
];
