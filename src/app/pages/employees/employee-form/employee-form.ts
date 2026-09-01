import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { EmployeeService } from '../../../services/employee';
import { Employee } from '../../../models/employee';

@Component({
  selector: 'app-employee-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.css'
})
export class EmployeeForm implements OnInit {

  employee: Employee = {
    id: 0,
    name: '',
    email: '',
    department: '',
    salary: 0
  };

  isEditMode = false;

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {

      this.isEditMode = true;

      this.employeeService.getEmployee(Number(id)).subscribe({
        next: (data) => {
          this.employee = data;
        },
        error: (error) => {
          console.error('Error loading employee:', error);
        }
      });

    }
  }

  saveEmployee(): void {

    if (this.isEditMode) {

      this.employeeService.updateEmployee(this.employee).subscribe({
        next: () => {
          this.router.navigate(['/employees']);
        },
        error: (error) => {
          console.error('Error updating employee:', error);
        }
      });

    } else {

      this.employeeService.createEmployee(this.employee).subscribe({
        next: () => {
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