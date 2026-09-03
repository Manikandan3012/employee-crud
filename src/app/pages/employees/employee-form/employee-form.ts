import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { EmployeeService } from '../../../services/employee';
import { Employee } from '../../../models/employee';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.css'
})
export class EmployeeForm implements OnInit {

  employee = signal<Employee>({
    id: 0,
    name: '',
    email: '',
    department: '',
    salary: 0
  });

  isEditMode = false;
  loading = signal<boolean>(false);

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    console.log('Route ID:', id);

    if (id) {

      this.isEditMode = true;

      const employeeId = Number(id);

      console.log('Calling GET employee:', employeeId);

      this.loading.set(true);

      this.employeeService.getEmployee(employeeId).subscribe({

        next: (data: Employee) => {

          console.log('Employee API response:', data);

          this.employee.set(data);

          console.log('Employee loaded:', this.employee());

          this.loading.set(false);
        },

        error: (error) => {

          console.error('Error loading employee:', error);

          this.loading.set(false);
        }

      });

    } else {

      this.loading.set(false);
    }
  }

  saveEmployee(): void {

    const currentEmployee = this.employee();

    console.log('Saving employee:', currentEmployee);

    if (this.isEditMode) {

      this.employeeService.updateEmployee(currentEmployee).subscribe({

        next: () => {

          console.log('Employee updated successfully');

          this.router.navigate(['/employees']);
        },

        error: (error) => {

          console.error('Error updating employee:', error);
        }

      });

    } else {

      this.employeeService.createEmployee(currentEmployee).subscribe({

        next: () => {

          console.log('Employee created successfully');

          this.router.navigate(['/employees']);
        },

        error: (error) => {

          console.error('Error creating employee:', error);
        }

      });

    }
  }

  cancel(): void {

    this.router.navigate(['/employees']);
  }
}