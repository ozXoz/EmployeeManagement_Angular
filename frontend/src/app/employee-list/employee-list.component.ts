import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  selectedEmployee: Employee | null = null;
  isAdding = false;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.fetchEmployees();
  }

  fetchEmployees(): void {
    this.employeeService.getAllEmployees().subscribe((employees) => {
      this.employees = employees;
    });
  }

  editEmployee(employee: Employee): void {
    this.selectedEmployee = { ...employee };
    this.isAdding = false;
  }

  deleteEmployee(id: string): void {
    this.employeeService.deleteEmployee(id).subscribe(() => {
      this.fetchEmployees();
    });
  }

  addEmployee(): void {
    this.isAdding = true;
    this.selectedEmployee = null;
  }

  onSave(employee: Employee): void {
    if (this.selectedEmployee === null) {
      this.createEmployee(employee);
    } else {
      if (this.selectedEmployee.id) {
        this.updateEmployee(employee);
      }
    }
  }
  
  

  onCancel(): void {
    this.selectedEmployee = null;
    this.isAdding = false;
  }

  createEmployee(employee: Employee): void {
    this.employeeService.createEmployee(employee).subscribe(() => {
      this.fetchEmployees();
      this.isAdding = false;
    });
  }

  updateEmployee(employee: Employee): void {
    this.employeeService
      .updateEmployee(this.selectedEmployee!.id, employee)
      .subscribe(() => {
        this.fetchEmployees();
        this.selectedEmployee = null;
      });
  }
}
