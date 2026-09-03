import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

private apiUrl = 'https://emp-backend-gceta7b8dxerbuem.centralindia-01.azurewebsites.net/api/employees';

  constructor(private http: HttpClient) {}

  // GET ALL EMPLOYEES
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  // GET EMPLOYEE BY ID
  getEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(
      `${this.apiUrl}/${id}`
    );
  }

  // CREATE EMPLOYEE
  createEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(
      this.apiUrl,
      employee
    );
  }

  // UPDATE EMPLOYEE
  updateEmployee(employee: Employee): Observable<void> {
    return this.http.put<void>(
      `${this.apiUrl}/${employee.id}`,
      employee
    );
  }

  // DELETE EMPLOYEE
  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );
  }
}