import { Routes } from '@angular/router';

import { EmployeeList } from './pages/employees/employee-list/employee-list';
import { EmployeeForm } from './pages/employees/employee-form/employee-form';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'employees',
    pathMatch: 'full'
  },
  {
    path: 'employees',
    component: EmployeeList
  },
  {
    path: 'employees/add',
    component: EmployeeForm
  },
  {
    path: 'employees/edit/:id',
    component: EmployeeForm
  }
];