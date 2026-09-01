import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';

import { EmployeeService } from '../../../services/employee';
import { Employee } from '../../../models/employee';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css'
})
export class EmployeeList implements OnInit {

  employees = signal<Employee[]>([]);
  loading = signal<boolean>(true);
  errorMessage = signal<string>('');

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('EmployeeList loaded');
    this.loadEmployees();
  }

  loadEmployees(): void {

    console.log('Calling GET API...');

    this.loading.set(true);
    this.errorMessage.set('');

    this.employeeService.getEmployees().subscribe({

      next: (data: Employee[]) => {

        console.log('GET API RESPONSE:', data);
        console.log('Employee count:', data.length);

        this.employees.set(data);

        console.log(
          'Employees signal:',
          this.employees()
        );

        this.loading.set(false);
      },

      error: (error) => {

        console.error('Error loading employees:', error);

        this.loading.set(false);

        this.errorMessage.set(
          'Unable to load employees.'
        );
      }

    });
  }

  addEmployee(): void {
    this.router.navigate(['/employees/add']);
  }

  editEmployee(id: number): void {

    console.log('Editing employee:', id);

    this.router.navigate([
      '/employees/edit',
      id
    ]);
  }

  deleteEmployee(id: number): void {

    const confirmed = confirm(
      'Are you sure you want to delete this employee?'
    );

    if (!confirmed) {
      return;
    }

    console.log('Deleting employee:', id);

    this.employeeService.deleteEmployee(id).subscribe({

      next: () => {

        console.log(
          'Employee deleted successfully'
        );

        this.loadEmployees();
      },

      error: (error) => {

        console.error(
          'Error deleting employee:',
          error
        );
      }

    });
  }
}